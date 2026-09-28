'use client'

import { useEffect, useRef } from 'react'
import { measureLayout } from '@/lib/layout'

/** The first visible element marked data-form-slot="id", in document pixels. */
function readSlot(id) {
  for (const el of document.querySelectorAll(`[data-form-slot="${id}"]`)) {
    const b = el.getBoundingClientRect()
    if (b.width > 0 && b.height > 0) {
      const fill = parseFloat(getComputedStyle(el).getPropertyValue('--form-fill'))
      return { x: b.left, y: b.top + window.scrollY, w: b.width, h: b.height, fill: fill > 0 ? fill : undefined }
    }
  }
  return undefined
}

/**
 * Section anchors, the form's slots, the nav bar's bottom edge and the page's scroll
 * range, re-measured when layout changes (never per frame).
 */
export default function useFormLayout(ids) {
  const layout = useRef({ anchors: {}, range: 0, slots: {}, navBottom: 0, measured: false })
  useEffect(() => {
    const measure = () => {
      const tops = {}
      const slots = {}
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el) tops[id] = el.getBoundingClientRect().top + window.scrollY
        const slot = readSlot(id)
        if (slot) slots[id] = slot
      }
      layout.current = measureLayout({
        ids,
        tops,
        slots,
        navBottom: document.querySelector('header')?.getBoundingClientRect().bottom ?? 0,
        scrollHeight: document.documentElement.scrollHeight,
        viewportHeight: window.innerHeight,
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [ids])
  return layout
}
