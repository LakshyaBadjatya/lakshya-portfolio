import { DEFAULT_FILL, placeFrames, resolveFrame } from '@/lib/placement'

const view = { width: 1000, height: 800, navBottom: 64 }
const frame = { y: 0, amp: 0.05, bands: 1, terrace: 0 }
const tall = { x: 100, y: 0, w: 400, h: 2000, fill: 0.5 }
const compact = { x: 0, y: 1000, w: 300, h: 300, fill: 0.8 }
const at = (scrollY) => ({ ...view, scrollY })

describe('resolveFrame', () => {
  test('the ball is centred across its slot and sized by its short side', () => {
    const s = resolveFrame(frame, tall, at(0))
    expect(s.x).toBeCloseTo(-0.4) // centre 300px of 1000
    expect(s.scale).toBeCloseTo(0.25) // radius 100px of a 400px half-height
  })

  test('a slot taller than the viewport holds the ball still at the frame height', () => {
    expect(resolveFrame(frame, tall, at(0)).y).toBeCloseTo(0)
    expect(resolveFrame(frame, tall, at(500)).y).toBeCloseTo(0)
    expect(resolveFrame({ ...frame, y: 0.5 }, tall, at(500)).y).toBeCloseTo(0.5)
  })

  test('the held ball leaves with the end of its slot, and arrives with its start', () => {
    expect(resolveFrame(frame, tall, at(1700)).y).toBeCloseTo(0.5) // slot ends at 300px: centre 200px
    const entering = resolveFrame(frame, { ...tall, y: 600 }, at(0))
    expect(entering.y).toBeCloseTo(-0.75) // slot starts at 600px: centre 700px
  })

  test('a slot shorter than the viewport carries the ball, centred in it', () => {
    expect(resolveFrame(frame, compact, at(700))).toMatchObject({ y: expect.closeTo(-0.125), scale: expect.closeTo(0.3) })
    expect(resolveFrame(frame, compact, at(800)).y).toBeCloseTo(0.125)
  })

  test('the ball shrinks rather than slide under the nav bar', () => {
    expect(resolveFrame(frame, compact, at(1050)).scale).toBeCloseTo(28 / 400) // centre 100px: 28px to spare
    expect(resolveFrame(frame, compact, at(1150)).scale).toBe(0) // centre behind the nav
  })

  test('and rather than run off the bottom edge', () => {
    expect(resolveFrame(frame, compact, at(400)).scale).toBeCloseTo(42 / 400) // centre 750px of 800
    expect(resolveFrame(frame, compact, at(0)).scale).toBe(0) // still below the fold
  })

  test('fill defaults to DEFAULT_FILL of the short side', () => {
    const { fill, ...noFill } = compact
    expect(fill).toBe(0.8)
    expect(resolveFrame(frame, noFill, at(700)).scale).toBeCloseTo((DEFAULT_FILL * 150) / 400)
  })

  test('shape weights come from the frame', () => {
    expect(resolveFrame(frame, tall, at(0))).toMatchObject({ amp: 0.05, bands: 1, terrace: 0 })
  })
})

describe('placeFrames', () => {
  test('frames without a slot on the page are left out', () => {
    const frames = [{ id: 'a', ...frame }, { id: 'b', ...frame }]
    expect(placeFrames(frames, { b: tall }, at(0)).map((f) => f.id)).toEqual(['b'])
  })
})
