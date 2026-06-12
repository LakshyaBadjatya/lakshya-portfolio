'use client'

import { Float } from '@react-three/drei'
import { posOf } from '@/lib/chapters'
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
  [-11, 3, -32],
  [10, 0, -50],
]

export default function ProjectWorlds() {
  return (
    <group>
      <pointLight position={posOf('worlds', 0, 18, -20)} intensity={400} color="#ffffff" />
      {profile.projects.map((p, i) => {
        const Form = FORMS[p.id]
        return (
          <Float key={p.id} speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
            <group position={posOf('worlds', ...OFFSETS[i])}>
              <Form accent={p.accent} />
            </group>
          </Float>
        )
      })}
    </group>
  )
}
