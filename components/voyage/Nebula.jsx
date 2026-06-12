'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { glowTexture } from '@/lib/glow'

const HUES = ['#6ee7ff', '#a78bfa', '#f472b6', '#4c6ef5']

export default function Nebula({ center, count = 8, spread = 38, baseScale = 30 }) {
  const group = useRef()
  const tex = useMemo(() => glowTexture(), [])
  const puffs = useMemo(() => {
    let seed = Math.abs(Math.round(center[2])) + 7
    const rand = () => {
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }
    return Array.from({ length: count }, (_, i) => ({
      pos: [(rand() - 0.5) * spread, (rand() - 0.5) * spread * 0.5, (rand() - 0.5) * spread],
      scale: baseScale * (0.6 + rand() * 1.2),
      color: HUES[i % HUES.length],
      opacity: 0.08 + rand() * 0.1,
    }))
  }, [center, count, spread, baseScale])

  useFrame((state) => {
    if (group.current) group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
  })

  return (
    <group ref={group} position={center}>
      {puffs.map((p, i) => (
        <sprite key={i} position={p.pos} scale={[p.scale, p.scale, 1]}>
          <spriteMaterial map={tex} color={p.color} transparent opacity={p.opacity} depthWrite={false} />
        </sprite>
      ))}
    </group>
  )
}
