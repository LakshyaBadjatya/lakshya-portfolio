'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { scrollState } from '@/lib/scroll'
import { localProgress, posOf } from '@/lib/chapters'
import { glowTexture } from '@/lib/glow'
import { profile } from '@/content/profile'

export default function Constellation() {
  const tex = useMemo(() => glowTexture(), [])
  const nodeRefs = useRef([])
  const origin = posOf('flightpath', -12, -6, -22)

  const nodes = useMemo(
    () =>
      profile.timeline.map((_, i) => [
        origin[0] + i * 6,
        origin[1] + i * 3 + (i % 2) * 1.2,
        origin[2] - i * 5,
      ]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useFrame((state) => {
    const p = localProgress(scrollState.progress, 'flightpath')
    nodes.forEach((_, i) => {
      const node = nodeRefs.current[i]
      if (!node) return
      const lit = Math.min(1, Math.max(0, p * (nodes.length + 1) - i))
      const isGoal = i === nodes.length - 1
      const pulse = isGoal ? 1 + Math.sin(state.clock.elapsedTime * 2.4) * 0.18 : 1
      const s = (1.2 + lit * 2.6) * pulse * (isGoal ? 1.5 : 1)
      node.scale.set(s, s, 1)
      node.material.opacity = 0.15 + lit * 0.85
    })
  })

  return (
    <group>
      <Line points={nodes} color="#6ee7ff" transparent opacity={0.28} lineWidth={1} />
      {nodes.map((pos, i) => (
        <sprite key={i} position={pos} ref={(el) => (nodeRefs.current[i] = el)}>
          <spriteMaterial
            map={tex}
            color={i === nodes.length - 1 ? '#f472b6' : '#bfe9ff'}
            transparent
            opacity={0.2}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  )
}
