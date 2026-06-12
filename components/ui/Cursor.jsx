'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { prefersReducedMotion } from '@/lib/perf'

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hot, setHot] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 250, damping: 22 })
  const ry = useSpring(y, { stiffness: 250, damping: 22 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || prefersReducedMotion()) return
    setEnabled(true)
    document.documentElement.classList.add('cursor-active')
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHot(!!(e.target?.closest?.('a, button, [data-hot]')))
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.classList.remove('cursor-active')
    }
  }, [x, y])

  if (!enabled) return null
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan"
        style={{ x, y }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/50"
        style={{ x: rx, y: ry }}
        animate={{ width: hot ? 44 : 28, height: hot ? 44 : 28, opacity: hot ? 0.9 : 0.5 }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
