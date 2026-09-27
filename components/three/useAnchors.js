'use client'

import { useEffect, useRef } from 'react'
import { anchorProgress } from '@/lib/keyframes'

/** Where each section sits in the scroll range. Re-measured whenever layout changes. */
export default function useAnchors(ids) {
  const anchors = useRef({})
  useEffect(() => {
    const measure = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight
      const next = {}
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        next[id] = id === 'top' ? 0 : anchorProgress(top, window.innerHeight, range)
      }
      anchors.current = next
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
  return anchors
}
