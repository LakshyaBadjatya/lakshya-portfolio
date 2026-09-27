// Scroll choreography for the 3D form. A frame is fully reached when its section's
// top edge sits 30% down the viewport. Between frames the form holds still for the
// first HOLD fraction of the distance, then eases into the next frame.
export const HOLD = 0.55

// x, y: viewport fractions (-1..1). scale: radius as a fraction of half the viewport
// height. amp: surface noise. bands, terrace: shape weights (0..1).
export const FRAMES_WIDE = [
  { id: 'top', state: { x: 0.42, y: 0.0, scale: 0.55, amp: 0.12, bands: 0, terrace: 0 } },
  { id: 'samlab', state: { x: -0.55, y: -0.05, scale: 0.5, amp: 0.1, bands: 1, terrace: 0 } },
  { id: 'sammed', state: { x: 0.55, y: -0.02, scale: 0.5, amp: 0.16, bands: 0, terrace: 1 } },
  { id: 'profile', state: { x: 0.82, y: 0.6, scale: 0.2, amp: 0.12, bands: 0, terrace: 0 } },
  { id: 'cv', state: { x: -0.86, y: 0.64, scale: 0.16, amp: 0.1, bands: 0, terrace: 0 } },
  { id: 'contact', state: { x: 0.45, y: 0.02, scale: 0.42, amp: 0.12, bands: 0, terrace: 0 } },
]

export const FRAMES_NARROW = [
  { id: 'top', state: { x: 0.0, y: 0.46, scale: 0.3, amp: 0.12, bands: 0, terrace: 0 } },
  { id: 'samlab', state: { x: 0.5, y: 0.66, scale: 0.26, amp: 0.1, bands: 1, terrace: 0 } },
  { id: 'sammed', state: { x: -0.5, y: 0.66, scale: 0.26, amp: 0.16, bands: 0, terrace: 1 } },
  { id: 'profile', state: { x: 0.72, y: 0.78, scale: 0.14, amp: 0.12, bands: 0, terrace: 0 } },
  { id: 'cv', state: { x: -0.74, y: 0.8, scale: 0.12, amp: 0.1, bands: 0, terrace: 0 } },
  { id: 'contact', state: { x: 0.5, y: 0.62, scale: 0.24, amp: 0.12, bands: 0, terrace: 0 } },
]

export const clamp01 = (t) => Math.min(1, Math.max(0, t))

export const smoothstep = (t) => {
  const c = clamp01(t)
  return c * c * (3 - 2 * c)
}

const KEYS = ['x', 'y', 'scale', 'amp', 'bands', 'terrace']

/**
 * Blend frame states for a scroll progress (0..1).
 * `anchors` maps frame id -> progress at which that frame is fully reached. Frames
 * whose section isn't on the page (no anchor) are skipped.
 */
export function blendKeyframes(progress, frames, anchors, hold = HOLD) {
  const placed = frames
    .filter((f) => Number.isFinite(anchors[f.id]))
    .map((f) => ({ at: anchors[f.id], state: f.state }))
    .sort((a, b) => a.at - b.at)
  if (placed.length === 0) return { ...frames[0].state }
  if (progress <= placed[0].at) return { ...placed[0].state }
  const last = placed[placed.length - 1]
  if (progress >= last.at) return { ...last.state }
  let i = 0
  while (progress >= placed[i + 1].at) i += 1
  const a = placed[i]
  const b = placed[i + 1]
  const span = b.at - a.at
  const t = span > 0 ? (progress - a.at) / span : 1
  const e = smoothstep((t - hold) / (1 - hold))
  const out = {}
  for (const k of KEYS) out[k] = a.state[k] + (b.state[k] - a.state[k]) * e
  return out
}

/** Scroll progress (0..1) at which a section's top edge sits 30% down the viewport. */
export function anchorProgress(sectionTop, viewportHeight, scrollRange) {
  if (scrollRange <= 0) return 0
  return clamp01((sectionTop - viewportHeight * 0.3) / scrollRange)
}
