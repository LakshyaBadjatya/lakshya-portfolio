'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { flareTexture } from '@/lib/glow'

const COUNT = 22
const TEMPS = ['#ffffff', '#bcd6ff', '#ffd9a0', '#9fdcff', '#ffc4e0']

/** A handful of hero stars that actually radiate — flare spikes + twinkle. */
export default function BrightStars() {
  const refs = useRef([])
  const tex = useMemo(() => flareTexture(), [])

  const stars = useMemo(() => {
    let seed = 7
    const rand = () => {
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }
    return Array.from({ length: COUNT }, (_, i) => {
      // Keep them clear of the central flight corridor.
      const side = i % 2 ? 1 : -1
      return {
        pos: [side * (24 + rand() * 95), (rand() - 0.5) * 110, 20 - rand() * 480],
        scale: 1.6 + rand() * 3.4,
        color: TEMPS[i % TEMPS.length],
        speed: 0.6 + rand() * 1.8,
        phase: rand() * Math.PI * 2,
        rot: rand() * 0.6 - 0.3,
      }
    })
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    stars.forEach((s, i) => {
      const spr = refs.current[i]
      if (!spr) return
      spr.material.opacity = 0.55 + 0.35 * Math.sin(t * s.speed + s.phase)
    })
  })

  return stars.map((s, i) => (
    <sprite key={i} ref={(el) => (refs.current[i] = el)} position={s.pos} scale={[s.scale, s.scale, 1]}>
      <spriteMaterial
        map={tex}
        color={s.color}
        transparent
        opacity={0.8}
        rotation={s.rot}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  ))
}
