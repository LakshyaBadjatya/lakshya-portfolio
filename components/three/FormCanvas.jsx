'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import Form from './Form'
import useAnchors from './useAnchors'

const SECTIONS = ['top', 'samlab', 'sammed', 'profile', 'cv', 'contact']

function forgetLiveForm() {
  document.documentElement.removeAttribute('data-form')
}

export default function FormCanvas({ tier, onReady, pose }) {
  const anchors = useAnchors(SECTIONS)
  return (
    <Canvas
      flat
      dpr={tier === 2 ? [1, 2] : 1}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ fov: 35, near: 0.1, far: 50, position: [0, 0, 8] }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', forgetLiveForm)}
    >
      <ambientLight intensity={0.3} />
      <hemisphereLight args={['#fffaf0', '#e9e1d2', 0.9]} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#fff6ea" />
      <directionalLight position={[-5, -2, 3]} intensity={0.5} color="#dfe6ff" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[0, 3, 4]} scale={[6, 2, 1]} />
        <Lightformer
          form="rect"
          intensity={0.8}
          position={[-4, 0, 2]}
          rotation-y={Math.PI / 2}
          scale={[4, 4, 1]}
          color="#f4ead8"
        />
        <Lightformer form="ring" intensity={0.6} position={[3, -2, 3]} scale={2} color="#e8eeff" />
      </Environment>
      <Form tier={tier} anchors={anchors} onFirstFrame={onReady} pose={pose} />
    </Canvas>
  )
}
