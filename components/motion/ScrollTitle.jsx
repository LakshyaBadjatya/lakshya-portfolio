'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import usePrefersReducedMotion from './usePrefersReducedMotion'

/** A project title that grows slightly and drifts while its chapter scrolls past. */
export default function ScrollTitle({ children, className = '' }) {
  const ref = useRef(null)
  const still = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.9, 1, 1.02])
  const x = useTransform(scrollYProgress, [0, 1], ['-2%', '2%'])
  return (
    <motion.h3
      ref={ref}
      className={className}
      style={still ? undefined : { scale, x, transformOrigin: 'left center' }}
    >
      {children}
    </motion.h3>
  )
}
