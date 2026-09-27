'use client'

import { useEffect, useRef } from 'react'
import { measureLayout } from '@/lib/layout'

/** Section anchors and the page's scroll range, re-measured when layout changes (never per frame). */
export default function useAnchors(ids) {
  const layout = useRef({ anchors: {}, range: 0 })
  useEffect(() => {
    const measure = () => {
      const tops = {}
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el) tops[id] = el.getBoundingClientRect().top + window.scrollY
      }
      layout.current = measureLayout({
        ids,
        tops,
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
