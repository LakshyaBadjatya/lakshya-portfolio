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
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.z = Math.sin(t * 0.05) * 0.1
    // Slow "breathing" so the gas never reads as a static texture.
    group.current.children.forEach((sprite, i) => {
      const base = puffs[i]?.opacity ?? 0.1
      sprite.material.opacity = base * (0.8 + 0.25 * Math.sin(t * 0.4 + i * 1.7))
    })
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
