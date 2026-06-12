'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/** Counts a stat like "7+", "100%", "2–3h" up from zero when scrolled into view. */
export default function CountUp({ value, duration = 1.4, className = '' }) {
  const match = /^(\d+)(.*)$/.exec(value)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView || !match) return
    const target = parseInt(match[1], 10)
    const t0 = performance.now()
    let raf
    const step = (t) => {
      const k = Math.min(1, (t - t0) / (duration * 1000))
      setN(Math.round(target * (1 - Math.pow(1 - k, 3))))
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  if (!match) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }
  return (
    <span ref={ref} className={className}>
      {n}
      {match[2]}
    </span>
  )
}
