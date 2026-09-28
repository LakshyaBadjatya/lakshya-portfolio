import { anchorProgress } from '@/lib/keyframes'

/**
 * The page's scroll range and each section's anchor progress, from measured
 * section tops (absolute, in px), plus the form's slots and the nav bar's bottom
 * edge as measured. Pure, so it can be measured on layout changes instead of on
 * every animation frame.
 */
export function measureLayout({ ids, tops, slots = {}, navBottom = 0, scrollHeight, viewportHeight }) {
  const range = Math.max(0, scrollHeight - viewportHeight)
  const anchors = {}
  for (const id of ids) {
    if (!Number.isFinite(tops[id])) continue
    anchors[id] = id === 'top' ? 0 : anchorProgress(tops[id], viewportHeight, range)
  }
  return { anchors, range, slots, navBottom, measured: true }
}
