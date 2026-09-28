// Scroll choreography for the 3D form. A frame is fully reached when its section's
// top edge sits 30% down the viewport. Between frames the form holds still for the
// first HOLD fraction of the distance, then eases into the next frame.
export const HOLD = 0.55

// One frame per section. Where the form sits and how big it is comes from the section's
// layout slot (lib/placement.js); a frame sets the holding height y (-1 bottom .. 1 top,
// used by slots taller than the viewport), the surface noise amp and the shape weights.
export const FRAMES = [
  { id: 'top', y: 0, amp: 0.075, bands: 0, terrace: 0 },
  { id: 'samlab', y: -0.05, amp: 0.04, bands: 1, terrace: 0 },
  { id: 'sammed', y: -0.02, amp: 0.075, bands: 0, terrace: 1 },
  { id: 'profile', y: -0.25, amp: 0.075, bands: 0, terrace: 0 },
  { id: 'cv', y: 0, amp: 0.07, bands: 0, terrace: 0 },
  { id: 'contact', y: 0.02, amp: 0.075, bands: 0, terrace: 0 },
]

/** The hero's form fills 55% of its square box, the same framing as /form-still.png. */
export const HERO_FILL = 0.55

export const clamp01 = (t) => Math.min(1, Math.max(0, t))

export const smoothstep = (t) => {
  const c = clamp01(t)
  return c * c * (3 - 2 * c)
}

const KEYS = ['x', 'y', 'scale', 'amp', 'bands', 'terrace']
const HIDDEN = { x: 0, y: 0, scale: 0, amp: 0, bands: 0, terrace: 0 }

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
  if (placed.length === 0) return { ...(frames[0]?.state ?? HIDDEN) }
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
  // The position follows whichever ball is visible, so a frame that has shrunk away
  // off-screen doesn't drag the form across the text between the two.
  const wa = (1 - e) * a.state.scale
  const wb = e * b.state.scale
  if (wa + wb > 0) {
    out.x = (wa * a.state.x + wb * b.state.x) / (wa + wb)
    out.y = (wa * a.state.y + wb * b.state.y) / (wa + wb)
  }
  return out
}

/** Scroll progress (0..1) at which a section's top edge sits 30% down the viewport. */
export function anchorProgress(sectionTop, viewportHeight, scrollRange) {
  if (scrollRange <= 0) return 0
  return clamp01((sectionTop - viewportHeight * 0.3) / scrollRange)
}
