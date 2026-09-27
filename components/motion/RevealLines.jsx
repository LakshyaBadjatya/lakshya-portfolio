'use client'

import { useReveal } from './Reveal'

/** Display text revealed line by line from behind a mask. `lines` are the visual lines; screen readers read them as written. */
export default function RevealLines({ as: Tag = 'h2', lines, className = '' }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} data-reveal-lines="" className={className}>
      {lines.map((line, i) => (
        <span key={line} className="reveal-line">
          <span style={{ '--i': i }}>{line}</span>
        </span>
      ))}
    </Tag>
  )
}
