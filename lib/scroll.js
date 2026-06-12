'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { MotionConfig } from 'framer-motion'
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
    // Lenis emits the instance itself; progress is a getter, velocity a field.
    lenis.on('scroll', (l) => {
      scrollState.progress = l.progress
      scrollState.velocity = l.velocity
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

  // reducedMotion="user" makes every framer-motion animation respect the OS setting.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
