'use client'

import { motion } from 'framer-motion'

export default function SectionLabel({ pre, title, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${center ? 'text-center' : ''}`}
    >
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">{pre}</div>
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
    </motion.div>
  )
}
