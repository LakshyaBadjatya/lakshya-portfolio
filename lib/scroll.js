'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { prefersReducedMotion } from '@/lib/perf'

// Mutated every scroll frame; read inside useFrame without re-renders.
export const scrollState = { progress: 0, velocity: 0 }

export function LenisProvider({ children }) {
  useEffect(() => {
    if (prefersReducedMotion()) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        scrollState.progress = max > 0 ? window.scrollY / max : 0
      }
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    lenis.on('scroll', ({ progress, velocity }) => {
      scrollState.progress = progress
      scrollState.velocity = velocity
    })
    let raf = requestAnimationFrame(function frame(time) {
      lenis.raf(time)
      raf = requestAnimationFrame(frame)
    })
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return children
}
