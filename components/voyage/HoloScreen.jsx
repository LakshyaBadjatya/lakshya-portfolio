'use client'

import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard, Float, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { scrollState } from '@/lib/scroll'
import { chapterPresence } from '@/lib/chapters'

/**
 * A holographic screenshot panel that floats beside a project's planet.
 * The screenshot is the texture; an emissive accent frame, a sweeping scanline,
 * and a soft backglow give it the hologram look — the emissive parts bloom under
 * the tier-2 post FX. Click flies the camera to that project's card.
 */
export default function HoloScreen({ src, accent, position, scale = 1, tier = 2, onClick }) {
  const tex = useTexture(src)
  const group = useRef()
  const scan = useRef()
  const [hovered, setHovered] = useState(false)

  // Fixed WIDTH for every tile (consistent across projects); height follows the
  // screenshot's real aspect ratio so nothing is stretched.
  const { w, h } = useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace
    const img = tex.image
    const ratio = img && img.height ? img.width / img.height : 1.6
    const W = 4.8
    return { w: W, h: W / ratio }
  }, [tex])

  const pad = 0.14

  useFrame((state, dt) => {
    if (group.current) {
      // Gate to the Worlds chapter so the panel never shows over other sections.
      const pres = chapterPresence(scrollState.progress, 'worlds')
      group.current.visible = pres > 0.005
      const target = scale * pres * (hovered ? 1.08 : 1)
      const k = 1 - Math.exp(-8 * Math.min(dt, 0.1))
      const s = group.current.scale.x + (target - group.current.scale.x) * k
      group.current.scale.setScalar(s)
    }
    if (scan.current) {
      // scanline sweeps bottom → top on a loop
      const y = ((state.clock.elapsedTime * 0.55) % 1) * h - h / 2
      scan.current.position.y = y
    }
  })

  return (
    <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.6} position={position}>
      {/* Billboard keeps the panel facing the camera so it always reads as a screen. */}
      <Billboard>
      <group
        ref={group}
        scale={0.0001}
        onClick={(e) => {
          e.stopPropagation()
          onClick && onClick()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          if (typeof document !== 'undefined') document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          if (typeof document !== 'undefined') document.body.style.cursor = ''
        }}
      >
        {/* soft accent backglow */}
        {tier === 2 && (
          <mesh position={[0, 0, -0.06]} scale={[w + pad * 5, h + pad * 5, 1]}>
            <planeGeometry />
            <meshBasicMaterial
              color={accent}
              transparent
              opacity={0.16}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        )}
        {/* emissive frame — the exposed margin glows around the screenshot */}
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[w + pad, h + pad]} />
          <meshBasicMaterial color={accent} toneMapped={false} />
        </mesh>
        {/* the screenshot itself */}
        <mesh>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial map={tex} toneMapped={false} />
        </mesh>
        {/* sweeping scanline */}
        {tier === 2 && (
          <mesh ref={scan} position={[0, 0, 0.01]}>
            <planeGeometry args={[w, 0.055]} />
            <meshBasicMaterial
              color={accent}
              transparent
              opacity={0.5}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        )}
      </group>
      </Billboard>
    </Float>
  )
}
