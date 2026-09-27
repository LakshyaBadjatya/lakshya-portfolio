'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createFormMaterial } from './formMaterial'
import { FRAMES_NARROW, FRAMES_WIDE, blendKeyframes } from '@/lib/keyframes'

const damp = (rate, dt) => 1 - Math.exp(-rate * Math.min(dt, 0.1))

// A soft, warm radial shadow drawn once to a canvas. It lives inside the form's group,
// so it follows the form wherever the scroll choreography moves it.
function makeShadowTexture() {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(59, 53, 44, 0.42)')
  g.addColorStop(0.45, 'rgba(59, 53, 44, 0.16)')
  g.addColorStop(1, 'rgba(59, 53, 44, 0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

/**
 * The sculpted object. Every frame it reads the scroll position, blends the section
 * keyframes and eases toward them. With `pose` (the /still capture) it holds that pose.
 */
export default function Form({ tier, anchors, onFirstFrame, pose }) {
  const group = useRef()
  const mesh = useRef()
  const started = useRef(false)
  const pointer = useRef({ x: 0, y: 0 })
  const { material, uniforms } = useMemo(() => createFormMaterial(), [])
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, tier === 2 ? 57 : 28), [tier])

  useEffect(() => () => geometry.dispose(), [geometry])
  useEffect(() => () => material.dispose(), [material])
  const shadow = useMemo(() => makeShadowTexture(), [])
  useEffect(() => () => shadow.dispose(), [shadow])

  useEffect(() => {
    const move = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  useFrame((state, dt) => {
    const g = group.current
    const m = mesh.current
    if (!g || !m) return
    const range = document.documentElement.scrollHeight - window.innerHeight
    const progress = range > 0 ? window.scrollY / range : 0
    const aspect = state.size.width / state.size.height
    const s = pose ?? blendKeyframes(progress, aspect < 1 ? FRAMES_NARROW : FRAMES_WIDE, anchors.current)
    const halfH = Math.tan(THREE.MathUtils.degToRad(state.camera.fov / 2)) * state.camera.position.z
    const halfW = halfH * aspect
    // Snap on the first frame so the live form lines up with the still image it replaces.
    const k = started.current ? damp(5, dt) : 1
    g.position.x += (s.x * halfW - g.position.x) * k
    g.position.y += (s.y * halfH - g.position.y) * k
    g.scale.setScalar(g.scale.x + (s.scale * halfH - g.scale.x) * k)
    uniforms.uAmp.value += (s.amp - uniforms.uAmp.value) * k
    uniforms.uBands.value += (s.bands - uniforms.uBands.value) * k
    uniforms.uTerrace.value += (s.terrace - uniforms.uTerrace.value) * k
    if (!pose) {
      uniforms.uTime.value = state.clock.elapsedTime
      m.rotation.y += dt * 0.08
      const kp = damp(3, dt)
      m.rotation.x += (pointer.current.y * 0.25 - m.rotation.x) * kp
      m.rotation.z += (-pointer.current.x * 0.15 - m.rotation.z) * kp
    }
    if (!started.current) {
      started.current = true
      onFirstFrame?.()
    }
  })

  return (
    <group ref={group} scale={0.001}>
      <mesh ref={mesh} geometry={geometry} material={material} />
      <mesh position={[0, -1.16, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={-1}>
        <planeGeometry args={[2.3, 2.3]} />
        <meshBasicMaterial map={shadow} transparent depthWrite={false} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
