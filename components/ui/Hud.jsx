'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { scrollState } from '@/lib/scroll'
import { SEGMENTS } from '@/lib/chapters'

const LABELS = {
  launch: 'Launch',
  pilot: 'The Pilot',
  flightpath: 'Flight Path',
  worlds: 'Worlds',
  systems: 'Systems',
  destination: 'Destination',
  transmission: 'Transmission',
}

/** Cockpit overlay for the homepage: top progress bar, chapter rail, telemetry readout. */
export default function Hud() {
  const [active, setActive] = useState(0)
  const [pct, setPct] = useState(0)
  const barRef = useRef(null)
  const velRef = useRef(null)

  useEffect(() => {
    let raf
    const tick = () => {
      const p = scrollState.progress
      const seg = SEGMENTS.find((s) => p >= s.start && p < s.end) ?? SEGMENTS[SEGMENTS.length - 1]
      setActive(seg.index)
      setPct(Math.round(p * 100))
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
      if (velRef.current) {
        const v = Math.min(99.9, Math.abs(scrollState.velocity) * 6)
        velRef.current.textContent = v.toFixed(1).padStart(4, '0')
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="no-print">
      {/* Top progress bar */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-white/5">
        <div
          ref={barRef}
          className="h-full origin-left bg-gradient-to-r from-cyan via-violet to-magenta"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Chapter rail */}
      <motion.nav
        aria-label="Chapters"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 md:flex"
      >
        {SEGMENTS.map((s) => {
          const isActive = s.index === active
          return (
            <button
              key={s.id}
              onClick={() => jump(s.id)}
              aria-label={`Go to ${LABELS[s.id]}`}
              aria-current={isActive ? 'true' : undefined}
              className="group flex cursor-pointer items-center gap-3"
            >
              <span
                className={`whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive ? 'text-cyan opacity-100' : 'translate-x-2 text-dim opacity-0 group-hover:translate-x-0 group-hover:opacity-70'
                }`}
              >
                {LABELS[s.id]}
              </span>
              <span
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? 'h-2.5 w-2.5 bg-cyan shadow-[0_0_12px_#6ee7ff]'
                    : 'h-1.5 w-1.5 bg-white/25 group-hover:bg-white/60'
                }`}
              />
            </button>
          )
        })}
      </motion.nav>

      {/* Telemetry readout */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.8 }}
        className="glass-deep fixed bottom-5 left-5 z-40 hidden select-none rounded-lg px-4 py-2.5 font-mono text-[10px] leading-relaxed tracking-[0.15em] text-cyan/80 md:block"
        aria-hidden
      >
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
          CH 0{active + 1} <span className="text-cyan/40">//</span> {LABELS[SEGMENTS[active].id].toUpperCase()}
        </div>
        <div className="mt-0.5 text-dim">
          PROGRESS {String(pct).padStart(3, '0')}% · VEL <span ref={velRef}>00.0</span>
        </div>
      </motion.div>
    </div>
  )
}
