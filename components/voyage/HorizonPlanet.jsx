'use client'

import { posOf } from '@/lib/chapters'
import TerrainPlanet from './TerrainPlanet'

/** The home world below the launch pad — an ocean planet with drifting clouds. */
export default function HorizonPlanet({ tier = 2 }) {
  return (
    <group position={posOf('launch', 0, -17, -34)}>
      <TerrainPlanet
        radius={13}
        amplitude={0.045}
        frequency={2.1}
        seed={3.7}
        sea={0.04}
        palette={['#06203f', '#0f4d7a', '#2f7a52', '#d8e4e4']}
        atmosphere="#6ee7ff"
        atmosphereScale={1.14}
        spin={0.015}
        segments={tier === 2 ? 128 : 72}
        clouds={tier === 2}
      />
    </group>
  )
}
