'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SNOISE, SUN_DIR } from '@/lib/glsl'
import { Atmosphere } from './TerrainPlanet'

const VERT = /* glsl */ `
varying vec3 vDir;
varying vec3 vNormalW;
varying vec3 vPosW;
void main() {
  vDir = normalize(position);
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vPosW = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const FRAG = /* glsl */ `
uniform vec3 uC0;
uniform vec3 uC1;
uniform vec3 uC2;
uniform float uSeed;
uniform float uBands;
uniform float uTime;
uniform vec3 uSunDir;
uniform vec3 uAtmo;
varying vec3 vDir;
varying vec3 vNormalW;
varying vec3 vPosW;
${SNOISE}

void main() {
  // Turbulent latitude bands, slowly churning.
  float warp = fbm(vDir * 2.2 + uSeed + vec3(uTime * 0.01, 0.0, 0.0)) * 0.4;
  float band = sin((vDir.y + warp) * uBands) * 0.5 + 0.5;
  vec3 col = mix(uC0, uC1, band);
  float storms = fbm(vDir * 5.5 - uSeed + vec3(0.0, uTime * 0.006, 0.0));
  col = mix(col, uC2, smoothstep(0.45, 0.95, storms) * 0.45);
  // Darkened poles.
  col *= 1.0 - smoothstep(0.55, 0.95, abs(vDir.y)) * 0.35;

  vec3 sun = normalize(uSunDir);
  float diff = max(dot(vNormalW, sun), 0.0);
  float light = 0.2 + 1.0 * diff;
  vec3 viewDir = normalize(cameraPosition - vPosW);
  float fres = pow(1.0 - max(dot(viewDir, vNormalW), 0.0), 2.4);
  vec3 c = col * light + uAtmo * fres * (0.25 + 0.6 * diff);
  gl_FragColor = vec4(c, 1.0);
}
`

/** Banded gas giant with churning storm bands. */
export default function GasGiant({
  radius = 3.4,
  seed = 4,
  bands = 9.0,
  palette = ['#0e4a6e', '#27aede', '#d8f4ff'],
  atmosphere = '#7fe3ff',
  spin = 0.05,
  segments = 64,
}) {
  const mesh = useRef()
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: {
          uC0: { value: new THREE.Color(palette[0]) },
          uC1: { value: new THREE.Color(palette[1]) },
          uC2: { value: new THREE.Color(palette[2]) },
          uSeed: { value: seed },
          uBands: { value: bands },
          uTime: { value: 0 },
          uSunDir: { value: new THREE.Vector3(...SUN_DIR) },
          uAtmo: { value: new THREE.Color(atmosphere) },
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [seed, bands, atmosphere],
  )

  useFrame((state, dt) => {
    if (mesh.current) mesh.current.rotation.y += dt * spin
    material.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <group>
      <mesh ref={mesh} material={material}>
        <sphereGeometry args={[radius, segments, segments]} />
      </mesh>
      <Atmosphere radius={radius} color={atmosphere} scale={1.16} />
    </group>
  )
}
