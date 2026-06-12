import { SEGMENTS, cameraTarget, localProgress, posOf, zOf } from '@/lib/chapters'

describe('chapter geometry', () => {
  test('7 chapters with contiguous scroll ranges', () => {
    expect(SEGMENTS).toHaveLength(7)
    expect(SEGMENTS[0].start).toBe(0)
    expect(SEGMENTS.at(-1).end).toBeCloseTo(1)
    for (let i = 1; i < SEGMENTS.length; i++) {
      expect(SEGMENTS[i].start).toBeCloseTo(SEGMENTS[i - 1].end)
    }
  })

  test('camera flies forward (z decreases monotonically)', () => {
    let last = Infinity
    for (let p = 0; p <= 1.001; p += 0.05) {
      const { pos } = cameraTarget(Math.min(p, 1))
      expect(pos[2]).toBeLessThanOrEqual(last + 1e-6)
      last = pos[2]
    }
  })

  test('camera starts at launch and ends at transmission', () => {
    expect(cameraTarget(0).pos[2]).toBeCloseTo(16)
    expect(cameraTarget(1).pos[2]).toBeCloseTo(zOf('transmission') + 16, 0)
  })

  test('localProgress maps a chapter to 0..1', () => {
    const seg = SEGMENTS.find((s) => s.id === 'worlds')
    expect(localProgress(seg.start, 'worlds')).toBeCloseTo(0)
    expect(localProgress(seg.end, 'worlds')).toBeCloseTo(1)
    expect(localProgress(0, 'worlds')).toBe(0)
    expect(localProgress(1, 'worlds')).toBe(1)
  })

  test('posOf offsets from the chapter waypoint', () => {
    const [x, y, z] = posOf('pilot', 1, 2, -3)
    const seg = SEGMENTS.find((s) => s.id === 'pilot')
    expect([x, y, z]).toEqual([seg.x + 1, seg.y + 2, seg.z - 3])
  })
})
