'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { posOf } from '@/lib/chapters'
import { glowTexture } from '@/lib/glow'

export default function HorizonPlanet() {
  const ref = useRef()
  const tex = useMemo(() => glowTexture(), [])
  const position = posOf('launch', 0, -17, -34)

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02
  })

  return (
    <group position={position}>
      <sprite scale={[42, 42, 1]}>
        <spriteMaterial map={tex} color="#3b5bd9" transparent opacity={0.5} depthWrite={false} />
      </sprite>
      <mesh ref={ref}>
        <sphereGeometry args={[13, 48, 48]} />
        <meshStandardMaterial color="#0d1440" emissive="#27408f" emissiveIntensity={0.35} roughness={0.85} />
      </mesh>
      <pointLight position={[18, 14, 14]} intensity={140} color="#6ee7ff" />
    </group>
  )
}
