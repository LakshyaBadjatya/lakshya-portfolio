'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { posOf } from '@/lib/chapters'
import { glowTexture } from '@/lib/glow'

export default function DestinationPlanet() {
  const planet = useRef()
  const moon = useRef()
  const tex = useMemo(() => glowTexture(), [])
  const center = posOf('destination', 0, -2, -30)

  useFrame((state, dt) => {
    if (planet.current) planet.current.rotation.y += dt * 0.05
    if (moon.current) {
      const t = state.clock.elapsedTime * 0.4
      moon.current.position.set(Math.cos(t) * 11, Math.sin(t * 0.7) * 2, Math.sin(t) * 11)
    }
  })

  return (
    <group position={center}>
      <sprite scale={[46, 46, 1]}>
        <spriteMaterial map={tex} color="#a78bfa" transparent opacity={0.45} depthWrite={false} />
      </sprite>
      <mesh ref={planet}>
        <sphereGeometry args={[7, 56, 56]} />
        <meshStandardMaterial color="#2a1457" emissive="#7c3aed" emissiveIntensity={0.6} roughness={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[10.5, 0.18, 8, 100]} />
        <meshStandardMaterial color="#6ee7ff" emissive="#6ee7ff" emissiveIntensity={1.2} transparent opacity={0.8} />
      </mesh>
      <mesh ref={moon}>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshStandardMaterial color="#e8ecff" emissive="#bfe9ff" emissiveIntensity={1.4} />
      </mesh>
      <pointLight position={[16, 10, 16]} intensity={320} color="#a78bfa" />
    </group>
  )
}
