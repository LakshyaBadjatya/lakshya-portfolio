'use client'

import Image from 'next/image'

/**
 * A holographic screenshot panel inside a project card. Shows the cover shot with
 * an accent glow, scan-grid and sweeping highlight (see .holo-shot in globals.css).
 * Clicking it opens the full gallery in a lightbox.
 */
export default function HoloShot({ media, accent, onOpen, label = 'Open screenshot gallery', priority = false }) {
  if (!media || media.length === 0) return null
  const cover = media[0]
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={label}
      className="holo-shot group block w-full"
      style={{ '--accent': accent, aspectRatio: `${cover.w} / ${cover.h}` }}
    >
      <Image
        src={cover.src}
        alt={cover.alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 720px"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />
      <span className="holo-tint" />
      <span
        className="pointer-events-none absolute right-3 top-3 z-[4] rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold backdrop-blur"
        style={{ borderColor: `${accent}66`, color: accent, background: 'rgba(5,6,15,0.55)' }}
      >
        ⤢ {media.length} {media.length === 1 ? 'shot' : 'shots'}
      </span>
    </button>
  )
}
