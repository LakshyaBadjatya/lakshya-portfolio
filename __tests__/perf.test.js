import { detectTier } from '@/lib/perf'

// All inputs injected so tests run in node without window/navigator.
const base = { reducedMotion: false, webgl: true, nav: { hardwareConcurrency: 8 }, width: 1440 }

describe('detectTier', () => {
  test('tier 0 when user prefers reduced motion', () => {
    expect(detectTier({ ...base, reducedMotion: true })).toBe(0)
  })
  test('tier 0 when WebGL is unavailable', () => {
    expect(detectTier({ ...base, webgl: false })).toBe(0)
  })
  test('tier 1 on narrow (mobile) viewports', () => {
    expect(detectTier({ ...base, width: 390 })).toBe(1)
  })
  test('tier 1 on weak hardware', () => {
    expect(detectTier({ ...base, nav: { hardwareConcurrency: 4 } })).toBe(1)
    expect(detectTier({ ...base, nav: { hardwareConcurrency: 8, deviceMemory: 4 } })).toBe(1)
  })
  test('tier 2 on capable desktops', () => {
    expect(detectTier(base)).toBe(2)
  })
})
