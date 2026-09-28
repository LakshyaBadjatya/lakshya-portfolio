// Where the 3D form rests. The page layout decides: every section reserves an empty
// "slot" (an element marked data-form-slot) and the form sits inside it, sized to fit.
// A slot at least one viewport tall holds the form still on screen while the section
// scrolls past; a shorter slot carries the form with it.

/** Share of the slot's short side the form's diameter fills, unless the slot sets --form-fill. */
export const DEFAULT_FILL = 0.9

/** Pixels kept clear between the form and the nav bar or the bottom edge. */
export const EDGE = 8

/**
 * Resolve one frame against its slot for the current scroll position.
 * frame: { y, amp, bands, terrace } where y is the holding height (-1 bottom .. 1 top).
 * slot: { x, y, w, h, fill? } in document pixels (y is the slot's top edge).
 * view: { width, height, scrollY, navBottom } in pixels.
 * Returns the frame state: x, y in viewport units (-1..1), scale = radius / half the height.
 */
export function resolveFrame(frame, slot, view) {
  const { width, height, scrollY, navBottom = 0 } = view
  const r = ((slot.fill ?? DEFAULT_FILL) * Math.min(slot.w, slot.h)) / 2
  const top = slot.y - scrollY
  const want = slot.h >= height ? ((1 - frame.y) / 2) * height : top + slot.h / 2
  const cy = Math.min(Math.max(want, top + r), top + slot.h - r)
  // Shrink rather than slide under the nav bar or off the bottom edge.
  const fit = Math.max(0, Math.min(r, cy - navBottom - EDGE, height - cy - EDGE))
  return {
    x: ((slot.x + slot.w / 2) / width) * 2 - 1,
    y: 1 - (cy / height) * 2,
    scale: fit / (height / 2),
    amp: frame.amp,
    bands: frame.bands,
    terrace: frame.terrace,
  }
}

/** The frames whose slot is on the page, resolved for this scroll position. */
export function placeFrames(frames, slots, view) {
  return frames.filter((f) => slots[f.id]).map((f) => ({ id: f.id, state: resolveFrame(f, slots[f.id], view) }))
}
