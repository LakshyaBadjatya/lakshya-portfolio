'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { posOf } from '@/lib/chapters'
import { scrollState } from '@/lib/scroll'
import { sound } from '@/lib/sound'
import { profile } from '@/content/profile'

function Ringed({ accent }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[3.2, 40, 40]} />
        <meshStandardMaterial color="#101638" emissive={accent} emissiveIntensity={0.5} roughness={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[5.2, 0.14, 8, 80]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.4} />
      </mesh>
    </group>
  )
}

function Smooth({ accent }) {
  return (
    <mesh>
      <sphereGeometry args={[3.4, 48, 48]} />
      <meshStandardMaterial color="#161030" emissive={accent} emissiveIntensity={0.55} roughness={0.4} metalness={0.3} />
    </mesh>
  )
}

function LowPoly({ accent }) {
  return (
    <mesh>
      <icosahedronGeometry args={[3.2, 0]} />
      <meshStandardMaterial color="#1c1408" emissive={accent} emissiveIntensity={0.5} flatShading roughness={0.8} />
    </mesh>
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

const FORMS = { sambhav: Ringed, samtechy: Smooth, flappy: LowPoly, portfolio: Wire }
const OFFSETS = [
  [-10, 1, 4],
  [11, -2, -14],
  [-15, 5, -34], // kept wide of the camera path so the fly-by never clips the lens
  [10, 0, -50],
]

/** One clickable project body: hover to glow-grow, click to fly to its card. */
function WorldBody({ project, position, scale }) {
  const inner = useRef()
  const hovered = useRef(false)
  const Form = FORMS[project.id]

  useFrame((_, dt) => {
    if (!inner.current) return
    const target = hovered.current ? 1.18 : 1
    const k = 1 - Math.exp(-8 * Math.min(dt, 0.1))
    const s = inner.current.scale.x + (target - inner.current.scale.x) * k
    inner.current.scale.setScalar(s)
  })

  const fly = (e) => {
    e.stopPropagation()
    sound.blip(660)
    const el = document.getElementById(`project-${project.id}`)
    if (!el) return
    if (scrollState.lenis) scrollState.lenis.scrollTo(el, { offset: -100, duration: 1.4 })
    else el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
      <group position={position} scale={scale}>
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
        const [ox, oy, oz] = OFFSETS[i]
        return <WorldBody key={p.id} project={p} position={posOf('worlds', ox, oy, oz + dz)} scale={scale} />
      })}
    </group>
  )
}
