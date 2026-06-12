'use client'

import { SEGMENTS } from '@/lib/chapters'

export default function Chapter({ id, className = '', children }) {
  const seg = SEGMENTS.find((s) => s.id === id)
  return (
    <section
      id={id}
      style={{ minHeight: `${seg.weight * 100}vh` }}
      className={`relative mx-auto flex w-full max-w-6xl flex-col justify-center px-6 py-24 md:px-12 ${className}`}
    >
      {children}
    </section>
  )
}
