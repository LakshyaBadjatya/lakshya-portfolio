'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { posOf } from '@/lib/chapters'
import TerrainPlanet from './TerrainPlanet'

/** The goal world — a violet alien planet with a ring and an orbiting rocky moon. */
export default function DestinationPlanet({ tier = 2 }) {
  const moon = useRef()
  const center = posOf('destination', 0, -2, -30)

  useFrame((state) => {
    if (moon.current) {
      const t = state.clock.elapsedTime * 0.4
      moon.current.position.set(Math.cos(t) * 11, Math.sin(t * 0.7) * 2, Math.sin(t) * 11)
    }
  })

  return (
    <group position={center}>
      <TerrainPlanet
        radius={7}
        amplitude={0.06}
        frequency={2.6}
        seed={9.2}
        sea={-0.05}
        palette={['#13082b', '#2d1460', '#6d28d9', '#f0e2ff']}
        atmosphere="#a78bfa"
        atmosphereScale={1.17}
        spin={0.04}
        segments={tier === 2 ? 112 : 64}
      />
      <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[10.5, 0.18, 8, 100]} />
        <meshStandardMaterial color="#6ee7ff" emissive="#6ee7ff" emissiveIntensity={1.2} transparent opacity={0.8} />
      </mesh>
      <group ref={moon}>
        <TerrainPlanet
          radius={0.9}
          amplitude={0.12}
          frequency={3.4}
          seed={5.5}
          sea={-2}
          palette={['#3a3a45', '#55555f', '#8a8a96', '#d8d8e0']}
          atmosphere="#bfe9ff"
          halo={false}
          spin={0.3}
          segments={32}
        />
      </group>
      <pointLight position={[16, 10, 16]} intensity={320} color="#a78bfa" />
    </group>
  )
}
