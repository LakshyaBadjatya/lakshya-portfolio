'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

const NAV_OFFSET = -72

/**
 * Smooth scrolling for the home page. In-page links glide to their target and then
 * move keyboard focus there. With reduced motion, the browser's own scrolling is kept.
 */
export default function LenisProvider({ children }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const lenis = new Lenis({ lerp: 0.1, autoRaf: true })
    const onClick = (event) => {
      const link = event.target.closest?.('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href').slice(1)
      const target = id ? document.getElementById(id) : null
      if (!target) return
      event.preventDefault()
      lenis.scrollTo(target, {
        offset: id === 'top' ? 0 : NAV_OFFSET,
        duration: 1.2,
        onComplete: () => {
          if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
          target.focus({ preventScroll: true })
          window.history.replaceState(null, '', `#${id}`)
        },
      })
    }
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
      lenis.destroy()
    }
  }, [])
  return children
}
