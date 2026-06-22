'use client'

import { Suspense, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { posOf, chapterPresence } from '@/lib/chapters'
import { scrollState } from '@/lib/scroll'
import { sound } from '@/lib/sound'
import { profile } from '@/content/profile'
import TerrainPlanet from './TerrainPlanet'
import GasGiant from './GasGiant'
import HoloScreen from './HoloScreen'

/** Scroll-fly the page to a project's card (shared by the planet + its holo-screen). */
function flyToProject(id) {
  sound.blip(660)
  const el = typeof document !== 'undefined' ? document.getElementById(`project-${id}`) : null
  if (!el) return
  if (scrollState.lenis) scrollState.lenis.scrollTo(el, { offset: -100, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function Ringed() {
  return (
    <group>
      <TerrainPlanet
        radius={3.2}
        amplitude={0.07}
        frequency={2.8}
        seed={6.1}
        sea={-0.02}
        palette={['#150d33', '#2a2160', '#5b4a9a', '#d9ccff']}
        atmosphere="#a78bfa"
        atmosphereScale={1.15}
        spin={0.06}
        segments={72}
      />
      <mesh rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[5.2, 0.14, 8, 80]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={1.4} />
      </mesh>
    </group>
  )
}

function Smooth() {
  return (
    <GasGiant
      radius={3.4}
      seed={4.4}
      bands={9.0}
      palette={['#0e4a6e', '#27aede', '#d8f4ff']}
      atmosphere="#7fe3ff"
      spin={0.07}
      segments={64}
    />
  )
}

function LowPoly() {
  // A cratered desert rock — Lakshya's first world.
  return (
    <TerrainPlanet
      radius={3.1}
      amplitude={0.11}
      frequency={3.1}
      seed={1.9}
      sea={-2}
      palette={['#2a1a06', '#553311', '#8a5a1f', '#f0c060']}
      atmosphere="#f59e0b"
      atmosphereScale={1.1}
      spin={0.08}
      segments={56}
    />
  )
}

function Wire({ accent }) {
  return (
    <mesh>
      <torusKnotGeometry args={[2.4, 0.7, 90, 12]} />
      <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.9} wireframe />
    </mesh>
  )
}

// Available planet shapes, keyed by a project's `form` field (decoupled from ids,
// so adding a project is data-only). Unknown/missing forms fall back to Wire.
const FORMS = { ringed: Ringed, gas: Smooth, lowpoly: LowPoly, wire: Wire }
const OFFSETS = [
  [-10, 1, 4],
  [11, -2, -14],
  [-15, 5, -34], // kept wide of the camera path so the fly-by never clips the lens
  [10, 0, -50],
]
// Each holo-screen sits on the inner flank of its planet — pulled toward the
// camera path and lifted up so it stays in frame and reads as a floating screen
// (the planets are deliberately kept wide, so the screens must sit inboard).
const HOLO_OFFSETS = [
  [-4, 3, 8],
  [5, 2, -10],
  [-8, 6, -30],
  [4, 3, -46],
]

/** One clickable project body: hover to glow-grow, click to fly to its card.
 *  Scales in/out with the Worlds chapter so it never shows over other sections. */
function WorldBody({ project, position, scale }) {
  const outer = useRef()
  const inner = useRef()
  const hovered = useRef(false)
  const Form = FORMS[project.form] ?? Wire

  useFrame((_, dt) => {
    if (!inner.current || !outer.current) return
    // Gate visibility to the Worlds chapter (no bleed into the timeline / skills).
    const pres = chapterPresence(scrollState.progress, 'worlds')
    outer.current.visible = pres > 0.005
    outer.current.scale.setScalar(scale * pres)
    const target = hovered.current ? 1.18 : 1
    const k = 1 - Math.exp(-8 * Math.min(dt, 0.1))
    const s = inner.current.scale.x + (target - inner.current.scale.x) * k
    inner.current.scale.setScalar(s)
  })

  const fly = (e) => {
    e.stopPropagation()
    flyToProject(project.id)
  }

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
      <group ref={outer} position={position} scale={0.0001}>
        <group
          ref={inner}
          onClick={fly}
          onPointerOver={(e) => {
            e.stopPropagation()
            hovered.current = true
          }}
          onPointerOut={() => {
            hovered.current = false
          }}
        >
          <Form accent={project.accent} />
        </group>
      </group>
    </Float>
  )
}

export default function ProjectWorlds({ tier = 2 }) {
  // On phones the narrow FOV pulls the bodies toward the center of the frame,
  // colliding with card text — shrink and push them deeper.
  const scale = tier === 1 ? 0.6 : 1
  const dz = tier === 1 ? -8 : 0
  return (
    <group>
      <pointLight position={posOf('worlds', 0, 18, -20)} intensity={400} color="#ffffff" />
      {profile.projects.map((p, i) => {
        const [ox, oy, oz] = OFFSETS[i % OFFSETS.length]
        const [hx, hy, hz] = HOLO_OFFSETS[i % HOLO_OFFSETS.length]
        return (
          <group key={p.id}>
            <WorldBody project={p} position={posOf('worlds', ox, oy, oz + dz)} scale={scale} />
            {p.cover && (
              <Suspense fallback={null}>
                <HoloScreen
                  src={p.cover}
                  accent={p.accent}
                  position={posOf('worlds', hx, hy, hz + dz)}
                  scale={scale * (tier === 1 ? 0.72 : 0.95)}
                  tier={tier}
                  onClick={() => flyToProject(p.id)}
                />
              </Suspense>
            )}
          </group>
        )
      })}
    </group>
  )
}
