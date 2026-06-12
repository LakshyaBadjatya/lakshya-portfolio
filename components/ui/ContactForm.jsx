'use client'

import { useState } from 'react'
import { profile } from '@/content/profile'

const inputClass =
  'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-star placeholder:text-dim/60 outline-none transition-colors focus:border-cyan/50 focus:bg-white/[0.07]'

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (data.company) return // honeypot
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('send failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="py-6 text-center">
        <div className="font-display text-xl font-bold text-cyan">Transmission received ✓</div>
        <p className="mt-2 text-sm text-dim">Thanks — I&apos;ll reply as soon as I can.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className={inputClass} />
        <input name="email" type="email" required placeholder="Your email" className={inputClass} />
      </div>
      <textarea name="message" required rows={4} placeholder="Your message…" className={inputClass} />
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-full border border-cyan/40 bg-cyan/10 px-7 py-2.5 font-mono text-sm text-cyan transition-colors hover:bg-cyan/20 disabled:opacity-50"
        >
          {status === 'sending' ? 'Transmitting…' : 'Send transmission'}
        </button>
        {status === 'error' && (
          <span className="text-sm text-magenta">
            Transmission failed — email me at{' '}
            <a href={`mailto:${profile.email}`} className="underline">
              {profile.email}
            </a>
          </span>
        )}
      </div>
    </form>
  )
}
