'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LOG = [
  '> boot voyage.os --pilot lakshya',
  '[0.002] first_computer.init(2020) .......... OK',
  '[0.045] curiosity.level = MAX',
  "[1.203] unity.learn('C#') .................. OK   // flappy bird takes flight",
  "[2.019] web.stack(['html','css','js']) ..... OK",
  '[2.481] flutter.ship(apps=7) ............... OK   // sambhav · samtechy',
  '[3.141] pcm.study() + ielts.prepare() ...... IN PROGRESS',
  "[4.000] target.lock('CS abroad', 2027) ..... ARMED",
  '[∞] mission: build things that matter.',
  '> _',
]

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

/** Hidden captain's log — open with ` (backtick) or the Konami code. */
export default function EasterEgg() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState(0)
  const buffer = useRef([])

  useEffect(() => {
    // A breadcrumb for the curious.
    // eslint-disable-next-line no-console
    console.log(
      "%c🛰 VOYAGE.OS — curious? press ` (backtick) for the captain's log",
      'color:#6ee7ff;font-family:monospace;font-size:12px',
    )
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea')) return
      if (e.key === '`') {
        setOpen((o) => !o)
        return
      }
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      buffer.current = [...buffer.current, e.key].slice(-KONAMI.length)
      if (KONAMI.every((k, i) => buffer.current[i] === k)) setOpen(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!open) {
      setLines(0)
      return
    }
    if (lines >= LOG.length) return
    const t = setTimeout(() => setLines((l) => l + 1), lines === 0 ? 150 : 240)
    return () => clearTimeout(t)
  }, [open, lines])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="no-print fixed inset-0 z-[95] flex items-center justify-center bg-void/80 p-6 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.96, y: 14 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 14 }}
            className="glass-deep w-full max-w-xl rounded-2xl p-6 font-mono text-[13px] leading-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 text-[10px] uppercase tracking-[0.3em]">
              <span className="text-cyan">voyage.os — captain&apos;s log</span>
              <span className="text-dim">esc to close</span>
            </div>
            {LOG.slice(0, lines).map((line, i) => (
              <div key={i} className={line.startsWith('>') ? 'text-cyan' : 'text-[#86efac]'}>
                {line}
              </div>
            ))}
            {lines < LOG.length && <span className="animate-pulse text-[#86efac]">▌</span>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
