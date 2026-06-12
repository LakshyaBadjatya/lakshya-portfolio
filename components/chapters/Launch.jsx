'use client'

import { motion } from 'framer-motion'
import Chapter from './Chapter'
import Typewriter from '@/components/ui/Typewriter'
import { profile } from '@/content/profile'

export default function Launch() {
  return (
    <Chapter id="launch" className="items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-5 py-1.5 font-mono text-xs text-cyan"
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
        {profile.statusBadge}
      </motion.div>

      <h1
        aria-label={profile.name}
        className="gradient-text font-display text-6xl font-bold leading-[1.02] tracking-tight md:text-8xl lg:text-9xl"
      >
        {profile.name.split(' ').map((word, w) => (
          <span key={word} className="block" aria-hidden>
            {word.split('').map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 60, rotateX: -55 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.35 + (w * 8 + i) * 0.04,
                  duration: 0.7,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                {ch}
              </motion.span>
            ))}
          </span>
        ))}
      </h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-6 h-7 font-mono text-base text-dim md:text-lg"
      >
        <Typewriter words={profile.roles} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="mt-6 max-w-xl text-base leading-relaxed text-dim md:text-lg"
      >
        {profile.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-dim/70">scroll to begin the voyage</div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto mt-3 text-cyan"
        >
          ↓
        </motion.div>
      </motion.div>
    </Chapter>
  )
}
