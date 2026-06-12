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
      <div
        className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan ${
          center ? 'justify-center' : ''
        }`}
      >
        <motion.span
          className="inline-block h-px w-8 origin-left bg-cyan/60"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
        />
        <span>{pre}</span>
        <span className="text-cyan/40">{'//'}</span>
      </div>
      <div className="overflow-hidden">
        <motion.h2
          className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl"
          initial={{ y: '105%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {title}
        </motion.h2>
      </div>
    </motion.div>
  )
}
