'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei'
import CameraRig from './CameraRig'
import Starfield from './Starfield'
import Effects from './Effects'
import HorizonPlanet from './HorizonPlanet'
import Nebula from './Nebula'
import Constellation from './Constellation'
import BrightStars from './BrightStars'
import ProjectWorlds from './ProjectWorlds'
import ShootingStars from './ShootingStars'
import WarpStreaks from './WarpStreaks'
import { SUN_DIR } from '@/lib/glsl'
import SkillRings from './SkillRings'
import DestinationPlanet from './DestinationPlanet'
import { posOf } from '@/lib/chapters'

export default function Scene({ tier }) {
  const mouse = useRef({ x: 0, y: 0 })
  const [degraded, setDegraded] = useState(false)

  useEffect(() => {
    const move = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <Canvas
      dpr={degraded || tier < 2 ? 1 : [1, 2]}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      camera={{ fov: 60, near: 0.1, far: 700, position: [0, 0, 16] }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <color attach="background" args={['#050510']} />
      <fog attach="fog" args={['#050510', 70, 340]} />
      <ambientLight intensity={0.25} />
      {/* The system's sun — matches the planets' shader light direction. */}
      <directionalLight position={[SUN_DIR[0] * 100, SUN_DIR[1] * 100, SUN_DIR[2] * 100]} intensity={2.2} color="#fff4e0" />
      <PerformanceMonitor onDecline={() => setDegraded(true)}>
        <CameraRig mouse={mouse} />
        <Starfield count={tier === 2 ? 5000 : 1800} size={0.45} color="#cfd8ff" />
        <Starfield count={tier === 2 ? 900 : 300} size={1.1} color="#6ee7ff" spin={-0.002} />
        <BrightStars />
        {/* Chapter set dressing */}
        <HorizonPlanet tier={tier} />
        <Nebula center={posOf('pilot', 0, 0, -18)} />
        <Constellation />
        <ProjectWorlds tier={tier} />
        <SkillRings />
        <ShootingStars />
        <WarpStreaks />
        <DestinationPlanet tier={tier} />
        <Nebula center={posOf('destination', 0, 6, -10)} count={6} />
        <Effects tier={tier} />
      </PerformanceMonitor>
      <AdaptiveDpr pixelated />
    </Canvas>
  )
}
