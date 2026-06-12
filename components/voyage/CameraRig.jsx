'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from '@/lib/scroll'
import { cameraTarget } from '@/lib/chapters'

export default function CameraRig({ mouse }) {
  const lookRef = useRef(new THREE.Vector3(0, 0, -60))
  const posTmp = useRef(new THREE.Vector3())
  const lookTmp = useRef(new THREE.Vector3())

  useFrame((state, dt) => {
    const { pos, look } = cameraTarget(scrollState.progress)
    const k = 1 - Math.exp(-4.5 * Math.min(dt, 0.1))
    const t = state.clock.elapsedTime
    posTmp.current.set(
      pos[0] + mouse.current.x * 1.6 + Math.sin(t * 0.23) * 0.45,
      pos[1] - mouse.current.y * 1.2 + Math.cos(t * 0.31) * 0.3,
      pos[2],
    )
    state.camera.position.lerp(posTmp.current, k)
    lookTmp.current.set(look[0] + mouse.current.x * 2, look[1] - mouse.current.y * 1.5, look[2])
    lookRef.current.lerp(lookTmp.current, k)
    state.camera.lookAt(lookRef.current)

    // Warp FOV kick: fast travel widens the lens for a sense of speed.
    const speed = Math.min(1, Math.abs(scrollState.velocity) / 45)
    const targetFov = 60 + speed * 14
    state.camera.fov += (targetFov - state.camera.fov) * k
    state.camera.updateProjectionMatrix()
  })

  return null
}
