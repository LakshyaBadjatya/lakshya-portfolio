'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { glowTexture } from '@/lib/glow'
import { scrollState } from '@/lib/scroll'

const COUNT = 26

/** Light-speed streaks that fade in with scroll velocity (warp on fast travel). */
export default function WarpStreaks() {
  const group = useRef()
  const tex = useMemo(() => glowTexture(), [])
  const intensity = useRef(0)

  const streaks = useMemo(() => {
    let seed = 99
    const rand = () => {
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }
    return Array.from({ length: COUNT }, () => {
      const x = (rand() - 0.5) * 34
      const y = (rand() - 0.5) * 20
      return { x, y, z: -9 - rand() * 18, len: 2.5 + rand() * 5, rot: Math.atan2(x, -y) }
    })
  }, [])

  useFrame((state, dt) => {
    if (!group.current) return
    const target = Math.min(1, Math.max(0, (Math.abs(scrollState.velocity) - 12) / 35))
    const k = 1 - Math.exp(-6 * Math.min(dt, 0.1))
    intensity.current += (target - intensity.current) * k
    // Ride along with the camera so streaks always cross the lens.
    group.current.position.copy(state.camera.position)
    group.current.quaternion.copy(state.camera.quaternion)
    group.current.children.forEach((s, i) => {
      const st = streaks[i]
      s.visible = intensity.current > 0.02
      s.material.opacity = intensity.current * 0.5
      s.scale.set(0.12, st.len * (0.5 + intensity.current), 1)
    })
  })

  return (
    <group ref={group}>
      {streaks.map((s, i) => (
        <sprite key={i} position={[s.x, s.y, s.z]} visible={false}>
          <spriteMaterial
            map={tex}
            color="#9fdcff"
            transparent
            opacity={0}
            depthWrite={false}
            rotation={s.rot}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  )
}
