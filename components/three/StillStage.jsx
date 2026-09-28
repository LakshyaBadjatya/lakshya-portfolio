'use client'

import dynamic from 'next/dynamic'
import { FRAMES, HERO_FILL } from '@/lib/keyframes'

const FormCanvas = dynamic(() => import('./FormCanvas'), { ssr: false })
const { amp, bands, terrace } = FRAMES[0]
const POSE = { x: 0, y: 0, scale: HERO_FILL, amp, bands, terrace }

function markReady() {
  window.__formReady = true
}

/** The form in its hero pose, centred on a transparent page, for `npm run assets`. */
export default function StillStage() {
  return (
    <div id="still" style={{ position: 'fixed', inset: 0 }}>
      <FormCanvas tier={2} pose={POSE} onReady={markReady} />
    </div>
  )
}
