// Shared geometry between the DOM sections and the 3D scene.
// Each chapter gets a scroll weight (relative screen-heights of DOM content)
// and a camera waypoint. Chapters sit every SPACING units along -Z.
const SPACING = 70

export const CHAPTERS = [
  { id: 'launch', weight: 1.0, x: 0, y: 0 },
  { id: 'pilot', weight: 1.3, x: 9, y: 2 },
  { id: 'flightpath', weight: 1.6, x: -8, y: 4 },
  { id: 'worlds', weight: 2.6, x: 7, y: -2 },
  { id: 'systems', weight: 1.3, x: -7, y: 3 },
  { id: 'destination', weight: 1.1, x: 0, y: 1 },
  { id: 'transmission', weight: 1.0, x: 0, y: 0 },
]

const total = CHAPTERS.reduce((sum, c) => sum + c.weight, 0)

let acc = 0
export const SEGMENTS = CHAPTERS.map((c, index) => {
  const start = acc / total
  acc += c.weight
  return { ...c, index, start, end: acc / total, z: -index * SPACING }
})

function seg(id) {
  const s = SEGMENTS.find((c) => c.id === id)
  if (!s) throw new Error(`unknown chapter: ${id}`)
  return s
}

export function zOf(id) {
  return seg(id).z
}

export function posOf(id, dx = 0, dy = 0, dz = 0) {
  const s = seg(id)
  return [s.x + dx, s.y + dy, s.z + dz]
}

/** 0..1 progress within one chapter's scroll range (clamped). */
export function localProgress(progress, id) {
  const s = seg(id)
  const span = s.end - s.start
  return span === 0 ? 0 : Math.min(1, Math.max(0, (progress - s.start) / span))
}

const smooth = (t) => t * t * (3 - 2 * t)

/**
 * Camera position + look target for a global scroll progress 0..1.
 * Note: `look` snaps to the next waypoint at segment boundaries by design —
 * callers must smooth the look direction between frames (the CameraRig lerps it).
 */
export function cameraTarget(progress) {
  const p = Math.min(Math.max(progress, 0), 1)
  const s =
    SEGMENTS.find((c) => p >= c.start && p < c.end) ?? SEGMENTS[SEGMENTS.length - 1]
  const next = SEGMENTS[Math.min(s.index + 1, SEGMENTS.length - 1)]
  const t = s.end === s.start ? 0 : (p - s.start) / (s.end - s.start)
  const e = smooth(t)
  return {
    pos: [
      s.x + (next.x - s.x) * e,
      s.y + (next.y - s.y) * e,
      s.z + (next.z - s.z) * e + 16,
    ],
    look: [next.x, next.y, next.z - 10],
  }
}
