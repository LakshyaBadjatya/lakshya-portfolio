import { measureLayout } from '@/lib/layout'

describe('measureLayout', () => {
  const base = { ids: ['top', 'work', 'cv'], scrollHeight: 3000, viewportHeight: 1000 }

  test('the scroll range is the page height minus one viewport', () => {
    expect(measureLayout({ ...base, tops: { top: 0, work: 1300, cv: 2300 } }).range).toBe(2000)
  })

  test('top anchors at 0; other sections when their top is 30% down the viewport', () => {
    const { anchors } = measureLayout({ ...base, tops: { top: 0, work: 1300, cv: 2300 } })
    expect(anchors).toEqual({ top: 0, work: 0.5, cv: 1 })
  })

  test('sections missing from the page are left out', () => {
    const { anchors } = measureLayout({ ...base, tops: { top: 0, work: 1300 } })
    expect(anchors).toEqual({ top: 0, work: 0.5 })
  })

  test('a page shorter than the viewport has no range and anchors at 0', () => {
    const r = measureLayout({ ids: ['top', 'work'], tops: { top: 0, work: 400 }, scrollHeight: 800, viewportHeight: 1000 })
    expect(r.range).toBe(0)
    expect(r.anchors).toEqual({ top: 0, work: 0 })
  })

  test('slots and the nav bar edge pass through, and the result is marked measured', () => {
    const slots = { top: { x: 0, y: 0, w: 900, h: 900, fill: 0.55 } }
    const r = measureLayout({ ...base, tops: { top: 0 }, slots, navBottom: 65 })
    expect(r).toMatchObject({ slots, navBottom: 65, measured: true })
  })
})
