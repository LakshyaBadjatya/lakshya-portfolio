'use client'

import { useLayoutEffect, useRef } from 'react'

/**
 * Server HTML is always visible. After hydration, a block that starts below the
 * fold is switched to data-state="pending" (hidden by CSS) and revealed once it
 * scrolls into view. Blocks already on screen, reduced-motion visitors and crawlers
 * with tall viewports never see the hidden state.
 */
export function useReveal() {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return undefined
    el.dataset.state = 'pending'
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.dataset.state = 'in'
        io.disconnect()
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

export default function Reveal({ as: Tag = 'div', index = 0, className = '', style, children, ...rest }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} data-reveal="" className={className} style={{ '--i': index, ...style }} {...rest}>
      {children}
    </Tag>
  )
}
