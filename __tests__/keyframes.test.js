import {
  FRAMES,
  HOLD,
  anchorProgress,
  blendKeyframes,
  smoothstep,
} from '@/lib/keyframes'

const frames = [
  { id: 'a', state: { x: 0, y: 0, scale: 1, amp: 0, bands: 0, terrace: 0 } },
  { id: 'b', state: { x: 1, y: 2, scale: 1, amp: 1, bands: 1, terrace: 1 } },
]
const anchors = { a: 0, b: 1 }

describe('blendKeyframes', () => {
  test('before the first anchor it returns the first state', () => {
    expect(blendKeyframes(-0.2, frames, anchors)).toEqual(frames[0].state)
  })
  test('after the last anchor it returns the last state', () => {
    expect(blendKeyframes(1.4, frames, anchors)).toEqual(frames[1].state)
  })
  test('holds the current state for the first HOLD fraction', () => {
    expect(blendKeyframes(HOLD * 0.99, frames, anchors).x).toBeCloseTo(0, 5)
  })
  test('eases to the next state after the hold', () => {
    const mid = HOLD + (1 - HOLD) / 2
    expect(blendKeyframes(mid, frames, anchors).x).toBeCloseTo(0.5, 5)
  })
  test('skips frames whose section is missing', () => {
    const three = [...frames, { id: 'c', state: { ...frames[0].state, x: 9 } }]
    expect(blendKeyframes(1, three, anchors)).toEqual(frames[1].state)
  })
  test('falls back to the first frame when no anchors are known yet', () => {
    expect(blendKeyframes(0.5, frames, {})).toEqual(frames[0].state)
  })
  test('orders by anchor position, not by table order', () => {
    expect(blendKeyframes(0, frames, { a: 1, b: 0 })).toEqual(frames[1].state)
  })
  test('the position follows the visible ball: a hidden frame does not drag it across the page', () => {
    const hidden = [{ id: 'a', state: { ...frames[0].state, scale: 0 } }, frames[1]]
    const mid = blendKeyframes(HOLD + (1 - HOLD) / 2, hidden, anchors)
    expect(mid).toMatchObject({ x: 1, y: 2, scale: expect.closeTo(0.5) })
  })
  test('with both balls hidden the position still eases evenly', () => {
    const none = frames.map((f) => ({ ...f, state: { ...f.state, scale: 0 } }))
    expect(blendKeyframes(HOLD + (1 - HOLD) / 2, none, anchors).x).toBeCloseTo(0.5)
  })
  test('with no frames placed at all the form is hidden', () => {
    expect(blendKeyframes(0.5, [], {}).scale).toBe(0)
  })
})

describe('anchorProgress', () => {
  test('a section is reached when its top is 30% down the viewport', () => {
    expect(anchorProgress(1300, 1000, 2000)).toBeCloseTo(0.5)
  })
  test('clamps, and survives pages that do not scroll', () => {
    expect(anchorProgress(100, 1000, 2000)).toBe(0)
    expect(anchorProgress(9999, 1000, 2000)).toBe(1)
    expect(anchorProgress(500, 1000, 0)).toBe(0)
  })
})

describe('frame table', () => {
  test('one frame per section, in page order', () => {
    expect(FRAMES.map((f) => f.id)).toEqual(['top', 'samlab', 'sammed', 'profile', 'cv', 'contact'])
  })
  test('holding heights stay on screen and shape weights stay within 0..1', () => {
    for (const f of FRAMES) {
      expect(Math.abs(f.y)).toBeLessThanOrEqual(0.9)
      for (const k of ['bands', 'terrace']) {
        expect(f[k]).toBeGreaterThanOrEqual(0)
        expect(f[k]).toBeLessThanOrEqual(1)
      }
    }
  })
  test('SamLab gets the banded shape and Sammed the faceted one', () => {
    const byId = Object.fromEntries(FRAMES.map((f) => [f.id, f]))
    expect(byId.samlab.bands).toBe(1)
    expect(byId.sammed.terrace).toBe(1)
  })
  test('smoothstep is clamped', () => {
    expect(smoothstep(-1)).toBe(0)
    expect(smoothstep(2)).toBe(1)
    expect(smoothstep(0.5)).toBe(0.5)
  })
})
