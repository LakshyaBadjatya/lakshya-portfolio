import * as THREE from 'three'

// 3D simplex noise. Ashima Arts / Stefan Gustavson, MIT licence (github.com/ashima/webgl-noise),
// 2022 revision: radius 0.5 / scale 105, which removes the 0.6-radius discontinuities.
const NOISE = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`

// Surface shape. Base: a calm noise pebble. uBands rings it with soft horizontal ribs
// (layered). uTerrace morphs it into a bevelled dodecahedron (built, structured).
// Every profile is smooth, so no hard step can alias against the mesh.
const SHAPE = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uFreq;
uniform float uBands;
uniform float uTerrace;
${NOISE}
const float PHI = 1.618034;
// Radius of a dodecahedron along unit direction d: inradius / (smooth) max over its six
// face axes. The log-sum-exp soft max rounds the edges into bevels.
float dodecaRadius(vec3 d) {
  const float k = 20.0;
  float s = exp(k * abs(dot(d, normalize(vec3(0.0, 1.0, PHI)))))
          + exp(k * abs(dot(d, normalize(vec3(0.0, 1.0, -PHI)))))
          + exp(k * abs(dot(d, normalize(vec3(1.0, PHI, 0.0)))))
          + exp(k * abs(dot(d, normalize(vec3(1.0, -PHI, 0.0)))))
          + exp(k * abs(dot(d, normalize(vec3(PHI, 0.0, 1.0)))))
          + exp(k * abs(dot(d, normalize(vec3(-PHI, 0.0, 1.0)))));
  return 0.84 / (log(s) / k);
}
float formShape(vec3 p) {
  float n = snoise(p * uFreq + vec3(0.0, uTime * 0.12, 0.0));
  float d = n * uAmp;
  d += cos(p.y * 20.0) * 0.045 * uBands;
  return mix(d, dodecaRadius(p) - 1.0, uTerrace);
}
vec3 formDisplace(vec3 p) {
  vec3 dir = normalize(p);
  return dir + dir * formShape(dir);
}
`

// Recompute the normal from two displaced neighbours, so lighting follows the new surface.
const NORMAL_CHUNK = /* glsl */ `
vec3 formN = normalize(position);
vec3 formT = normalize(abs(formN.y) > 0.99 ? cross(formN, vec3(1.0, 0.0, 0.0)) : cross(formN, vec3(0.0, 1.0, 0.0)));
vec3 formB = normalize(cross(formN, formT));
vec3 formP = formDisplace(position);
vec3 formPT = formDisplace(position + formT * 0.01);
vec3 formPB = formDisplace(position + formB * 0.01);
vec3 formCross = cross(formPT - formP, formPB - formP);
vec3 objectNormal = length(formCross) > 1e-8 ? normalize(formCross) : formN;
#ifdef USE_TANGENT
  vec3 objectTangent = vec3(tangent.xyz);
#endif
`

/** Porcelain-like material whose unit-sphere geometry is sculpted in the vertex shader. */
export function createFormMaterial() {
  const uniforms = {
    uTime: { value: 0 },
    uAmp: { value: 0.12 },
    uFreq: { value: 0.9 },
    uBands: { value: 0 },
    uTerrace: { value: 0 },
  }
  const material = new THREE.MeshPhysicalMaterial({
    color: '#e9e4da',
    roughness: 0.46,
    metalness: 0,
    clearcoat: 0.35,
    clearcoatRoughness: 0.5,
    sheen: 0.35,
    sheenRoughness: 0.8,
    sheenColor: new THREE.Color('#ffffff'),
  })
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms)
    shader.vertexShader = shader.vertexShader
      .replace('void main() {', `${SHAPE}\nvoid main() {`)
      .replace('#include <beginnormal_vertex>', NORMAL_CHUNK)
      .replace('#include <begin_vertex>', '#include <begin_vertex>\ntransformed = formP;')
  }
  material.customProgramCacheKey = () => 'lb-form-v1'
  return { material, uniforms }
}
