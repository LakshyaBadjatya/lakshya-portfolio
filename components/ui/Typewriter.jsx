'use client'

import { useEffect, useState } from 'react'

export default function Typewriter({ words, speed = 55, pause = 1800 }) {
  const [index, setIndex] = useState(0)
  const [len, setLen] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const word = words[index % words.length]

  useEffect(() => {
    if (!deleting && len === word.length) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }
    if (deleting && len === 0) {
      setDeleting(false)
      setIndex((i) => i + 1)
      return
    }
    const t = setTimeout(() => setLen((l) => l + (deleting ? -1 : 1)), deleting ? speed / 2 : speed)
    return () => clearTimeout(t)
  }, [len, deleting, word, speed, pause])

  return (
    <span aria-label={words.join(', ')}>
      {word.slice(0, len)}
      <span className="animate-pulse text-cyan">▌</span>
    </span>
  )
}
