'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SNOISE, SUN_DIR } from '@/lib/glsl'

const VERT = /* glsl */ `
uniform float uRadius;
uniform float uAmp;
uniform float uFreq;
uniform float uSeed;
uniform float uSea;
varying float vElev;
varying vec3 vNormalW;
varying vec3 vPosW;
${SNOISE}

vec3 surface(vec3 dir) {
  float e = max(fbm(dir * uFreq + uSeed), uSea);
  return dir * (uRadius + e * uAmp);
}

void main() {
  vec3 dir = normalize(position);
  float elev = fbm(dir * uFreq + uSeed);
  vec3 displaced = dir * (uRadius + max(elev, uSea) * uAmp);

  // Finite-difference normal so mountains catch the light correctly.
  vec3 tangent = normalize(cross(dir, vec3(0.0, 1.0, 0.0)) + vec3(0.0001));
  vec3 bitangent = normalize(cross(dir, tangent));
  float eps = 0.06;
  vec3 pT = surface(normalize(dir + tangent * eps));
  vec3 pB = surface(normalize(dir + bitangent * eps));
  vec3 newNormal = normalize(cross(pT - displaced, pB - displaced));
  if (dot(newNormal, dir) < 0.0) newNormal = -newNormal;

  vElev = elev;
  vNormalW = normalize(mat3(modelMatrix) * newNormal);
  vPosW = (modelMatrix * vec4(displaced, 1.0)).xyz;
  gl_Position = projectionMatrix * viewMatrix * vec4(vPosW, 1.0);
}
`

const FRAG = /* glsl */ `
uniform vec3 uC0; // deep water / lowest rock
uniform vec3 uC1; // shallow water / lowland
uniform vec3 uC2; // land / highland
uniform vec3 uC3; // peaks
uniform float uSea;
uniform vec3 uSunDir;
uniform vec3 uAtmo;
varying float vElev;
varying vec3 vNormalW;
varying vec3 vPosW;

void main() {
  vec3 col;
  if (vElev <= uSea + 0.002) {
    float depth = clamp((uSea - vElev) * 5.0, 0.0, 1.0);
    col = mix(uC1, uC0, depth);
  } else {
    float t = clamp((vElev - uSea) * 2.0, 0.0, 1.0);
    col = mix(uC1, uC2, smoothstep(0.0, 0.5, t));
    col = mix(col, uC3, smoothstep(0.5, 1.0, t));
  }

  vec3 sun = normalize(uSunDir);
  float diff = max(dot(vNormalW, sun), 0.0);
  // Specular glint on water only.
  vec3 viewDir = normalize(cameraPosition - vPosW);
  float spec = 0.0;
  if (vElev <= uSea + 0.002) {
    vec3 h = normalize(sun + viewDir);
    spec = pow(max(dot(vNormalW, h), 0.0), 48.0) * 0.6;
  }
  float light = 0.07 + 0.95 * diff;
  float fres = pow(1.0 - max(dot(viewDir, vNormalW), 0.0), 2.6);
  vec3 c = col * light + vec3(spec) * diff + uAtmo * fres * (0.2 + 0.6 * diff);
  gl_FragColor = vec4(c, 1.0);
}
`

const ATMO_VERT = /* glsl */ `
varying vec3 vNormalV;
varying vec3 vNormalW;
void main() {
  vNormalV = normalize(normalMatrix * normal);
  vNormalW = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const ATMO_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uPower;
uniform vec3 uSunDir;
varying vec3 vNormalV;
varying vec3 vNormalW;
void main() {
  float rim = pow(clamp(0.72 - dot(vNormalV, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), uPower);
  // The glow belongs to the day side — fade it into the planet's night.
  float day = 0.18 + 0.85 * max(dot(vNormalW, normalize(uSunDir)), 0.0);
  gl_FragColor = vec4(uColor, 1.0) * rim * day * 0.85;
}
`

const CLOUD_VERT = /* glsl */ `
varying vec3 vDir;
varying vec3 vNormalW;
void main() {
  vDir = normalize(position);
  vNormalW = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const CLOUD_FRAG = /* glsl */ `
uniform float uTime;
uniform float uSeed;
uniform vec3 uSunDir;
varying vec3 vDir;
varying vec3 vNormalW;
${SNOISE}
void main() {
  float c = fbm(vDir * 3.0 + vec3(uTime * 0.012, 0.0, uTime * 0.008) + uSeed);
  float alpha = smoothstep(0.12, 0.7, c);
  float diff = max(dot(vNormalW, normalize(uSunDir)), 0.0);
  vec3 col = vec3(0.95, 0.98, 1.0) * (0.15 + 0.95 * diff);
  gl_FragColor = vec4(col, alpha * 0.55);
}
`

export function Atmosphere({ radius, color, scale = 1.12, power = 3.4 }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: ATMO_VERT,
        fragmentShader: ATMO_FRAG,
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uPower: { value: power },
          uSunDir: { value: new THREE.Vector3(...SUN_DIR) },
        },
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      }),
    [color, power],
  )
  return (
    <mesh scale={scale} material={material}>
      <sphereGeometry args={[radius, 48, 48]} />
    </mesh>
  )
}

/**
 * Procedurally-shaded planet with real displaced terrain.
 * palette: [deepWater, shallow/lowland, land, peaks]; sea < -1 disables oceans.
 */
export default function TerrainPlanet({
  radius = 3,
  amplitude = 0.05, // fraction of radius
  frequency = 2.4,
  seed = 0,
  sea = 0.02,
  palette = ['#06203f', '#0f4d7a', '#3c7a4f', '#cfd8d8'],
  atmosphere = '#6ee7ff',
  atmosphereScale = 1.18,
  spin = 0.02,
  segments = 96,
  clouds = false,
  halo = true,
}) {
  const mesh = useRef()
  const cloudMat = useRef()

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: {
          uRadius: { value: radius },
          uAmp: { value: radius * amplitude },
          uFreq: { value: frequency },
          uSeed: { value: seed },
          uSea: { value: sea },
          uC0: { value: new THREE.Color(palette[0]) },
          uC1: { value: new THREE.Color(palette[1]) },
          uC2: { value: new THREE.Color(palette[2]) },
          uC3: { value: new THREE.Color(palette[3]) },
          uSunDir: { value: new THREE.Vector3(...SUN_DIR) },
          uAtmo: { value: new THREE.Color(atmosphere) },
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [radius, amplitude, frequency, seed, sea, atmosphere],
  )

  const cloudMaterial = useMemo(() => {
    if (!clouds) return null
    return new THREE.ShaderMaterial({
      vertexShader: CLOUD_VERT,
      fragmentShader: CLOUD_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uSeed: { value: seed + 11 },
        uSunDir: { value: new THREE.Vector3(...SUN_DIR) },
      },
      transparent: true,
      depthWrite: false,
    })
  }, [clouds, seed])

  useFrame((state, dt) => {
    if (mesh.current) mesh.current.rotation.y += dt * spin
    if (cloudMaterial) cloudMaterial.uniforms.uTime.value = state.clock.elapsedTime
    if (cloudMat.current) cloudMat.current.rotation.y += dt * spin * 1.35
  })

  return (
    <group>
      <mesh ref={mesh} material={material}>
        <sphereGeometry args={[radius, segments, segments]} />
      </mesh>
      {clouds && cloudMaterial && (
        <mesh ref={cloudMat} scale={1.035} material={cloudMaterial}>
          <sphereGeometry args={[radius, 48, 48]} />
        </mesh>
      )}
      {halo && <Atmosphere radius={radius} color={atmosphere} scale={atmosphereScale} />}
    </group>
  )
}
