'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { posOf } from '@/lib/chapters'
import { profile } from '@/content/profile'

function Ring({ radius, tilt, speed, color, dots }) {
  const ref = useRef()
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * speed
  })
  return (
    <group rotation={[tilt, 0.3, 0]}>
      <mesh>
        <torusGeometry args={[radius, 0.03, 8, 96]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} transparent opacity={0.5} />
      </mesh>
      <group ref={ref}>
        {Array.from({ length: dots }, (_, i) => {
          const a = (i / dots) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]}>
              <sphereGeometry args={[0.18, 12, 12]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.2} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

export default function SkillRings() {
  return (
    <group position={posOf('systems', 0, 0, -24)}>
      {profile.skills.map((s, i) => (
        <Ring
          key={s.category}
          radius={4 + i * 2.1}
          tilt={Math.PI / 2.4 + i * 0.12}
          speed={(i % 2 ? -1 : 1) * (0.25 - i * 0.025)}
          color={s.color}
          dots={s.tags.length}
        />
      ))}
      <mesh>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshStandardMaterial color="#e8ecff" emissive="#9bb8ff" emissiveIntensity={1.6} />
      </mesh>
    </group>
  )
}
