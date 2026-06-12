'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/** Brief boot splash that covers the canvas while the 3D bundle loads. */
export default function BootOverlay() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="no-print fixed inset-0 z-[90] flex items-center justify-center bg-void"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
          aria-hidden
        >
          <div className="text-center font-mono">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1] }}
              transition={{ duration: 0.9, times: [0, 0.4, 1] }}
              className="text-[11px] uppercase tracking-[0.45em] text-cyan"
            >
              Initializing voyage
            </motion.div>
            <div className="mx-auto mt-5 h-px w-52 overflow-hidden rounded bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan to-violet"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.05, ease: 'easeInOut' }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-[9px] uppercase tracking-[0.3em] text-dim"
            >
              systems online
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
