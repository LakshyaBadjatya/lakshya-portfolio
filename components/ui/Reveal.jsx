'use client'

import { motion } from 'framer-motion'

export default function Reveal({ children, delay = 0, y = 40, className = '', once = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-12%' }}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
