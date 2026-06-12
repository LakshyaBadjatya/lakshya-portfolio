'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Starfield({ count = 4000, size = 0.5, color = '#cfd8ff', spin = 0.004, depth = 540 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    let seed = count // deterministic per-layer
    const rand = () => {
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 260
      arr[i * 3 + 1] = (rand() - 0.5) * 150
      arr[i * 3 + 2] = 40 - rand() * depth
    }
    return arr
  }, [count, depth])

  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * spin
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation
        color={color}
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
