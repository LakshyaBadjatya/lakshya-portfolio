'use client'

import { EffectComposer, Bloom, Vignette, ChromaticAberration, Noise } from '@react-three/postprocessing'

export default function Effects({ tier }) {
  if (tier < 2) return null
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.8} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur />
      <ChromaticAberration offset={[0.0012, 0.0008]} />
      <Noise opacity={0.05} />
      <Vignette eskil={false} offset={0.18} darkness={0.85} />
    </EffectComposer>
  )
}
