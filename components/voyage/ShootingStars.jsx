'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { glowTexture } from '@/lib/glow'

const METEORS = [
  { period: 7.0, offset: 0.0, y: 26, z: -90, speed: 150 },
  { period: 11.5, offset: 4.2, y: -4, z: -180, speed: 190 },
  { period: 16.0, offset: 9.1, y: 14, z: -300, speed: 230 },
]

const FLIGHT = 1.1 // seconds a streak is visible

/** Occasional meteor streaks across the deep background. */
export default function ShootingStars() {
  const refs = useRef([])
  const tex = useMemo(() => glowTexture(), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    METEORS.forEach((m, i) => {
      const s = refs.current[i]
      if (!s) return
      const local = (t + m.offset) % m.period
      const life = local / FLIGHT
      if (life > 1) {
        s.visible = false
        return
      }
      s.visible = true
      s.position.set(-110 + life * m.speed, m.y - life * 26, m.z)
      s.material.opacity = Math.sin(life * Math.PI) * 0.85
    })
  })

  return METEORS.map((m, i) => (
    <sprite key={i} ref={(el) => (refs.current[i] = el)} scale={[9, 0.4, 1]} visible={false}>
      <spriteMaterial
        map={tex}
        color="#bfe9ff"
        transparent
        opacity={0}
        depthWrite={false}
        rotation={-0.24}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  ))
}
