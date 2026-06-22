'use client'

import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Fullscreen holographic gallery for a project's screenshots.
 * Render conditionally from a parent: {active && <Lightbox project={active} onClose={…} />}
 * Keyboard: ← / → navigate, Esc closes. Click the backdrop to close.
 */
export default function Lightbox({ project, onClose }) {
  const media = project?.media ?? []
  const accent = project?.accent ?? '#6ee7ff'
  const [i, setI] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const next = useCallback(() => setI((v) => (v + 1) % media.length), [media.length])
  const prev = useCallback(() => setI((v) => (v - 1 + media.length) % media.length), [media.length])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [next, prev, onClose])

  if (!mounted || !project || media.length === 0) return null
  const shot = media[i]

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[120] flex flex-col bg-black/85 backdrop-blur-md"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} screenshots`}
      >
        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 md:px-8" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent, boxShadow: `0 0 12px ${accent}` }} />
            <h2 className="font-display text-lg font-bold md:text-xl">{project.name}</h2>
            <span className="font-mono text-xs text-dim">
              {i + 1} / {media.length}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="rounded-full border border-white/15 px-4 py-1.5 text-sm font-semibold text-star/90 transition-colors hover:bg-white/10"
          >
            Close ✕
          </button>
        </div>

        {/* stage */}
        <div className="relative flex flex-1 items-center justify-center px-4 pb-2 md:px-16" onClick={(e) => e.stopPropagation()}>
          {media.length > 1 && (
            <button
              type="button"
              onClick={prev}
              aria-label="Previous screenshot"
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 px-3 py-3 text-xl leading-none text-star/90 transition-colors hover:bg-white/10 md:left-5"
            >
              ‹
            </button>
          )}

          <motion.div
            key={shot.src}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="holo-shot relative max-h-[78vh] w-full max-w-5xl"
            style={{ '--accent': accent, aspectRatio: `${shot.w} / ${shot.h}` }}
          >
            <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-contain" priority />
            <span className="holo-tint" />
          </motion.div>

          {media.length > 1 && (
            <button
              type="button"
              onClick={next}
              aria-label="Next screenshot"
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 px-3 py-3 text-xl leading-none text-star/90 transition-colors hover:bg-white/10 md:right-5"
            >
              ›
            </button>
          )}
        </div>

        {/* caption + thumbnails */}
        <div className="px-5 pb-6 pt-2 md:px-8" onClick={(e) => e.stopPropagation()}>
          <p className="mx-auto mb-3 max-w-3xl text-center text-sm text-dim">{shot.alt}</p>
          {media.length > 1 && (
            <div className="flex justify-center gap-3">
              {media.map((m, j) => (
                <button
                  key={m.src}
                  type="button"
                  onClick={() => setI(j)}
                  aria-label={`Go to screenshot ${j + 1}`}
                  className="relative h-12 w-20 overflow-hidden rounded-md border transition-all"
                  style={{
                    borderColor: j === i ? accent : 'rgba(255,255,255,0.15)',
                    opacity: j === i ? 1 : 0.55,
                  }}
                >
                  <Image src={m.src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}
