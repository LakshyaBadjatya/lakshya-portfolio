'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import StaticSky from '@/components/voyage/StaticSky'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { profile } from '@/content/profile'

export default function AboutContent() {
  const [quotes, setQuotes] = useState([])

  useEffect(() => {
    fetch('/quotes.txt')
      .then((r) => r.text())
      .then((text) => {
        const lines = text.split('\n').filter(Boolean)
        setQuotes(
          lines.map((line) => {
            const [quote, author] = line.split('|')
            return { quote: quote.trim(), author: author?.trim() }
          }),
        )
      })
      .catch(() => {})
  }, [])

  return (
    <>
      <StaticSky />
      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-32 md:px-10">
        <header className="mb-16 flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
          <Reveal>
            <Image
              src="/img/profile-photo.webp"
              alt="Lakshya Badjatya"
              width={180}
              height={180}
              className="rounded-3xl ring-1 ring-white/15"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="gradient-text font-display text-5xl font-bold tracking-tight md:text-6xl">About Me</h1>
            <h2 className="mt-3 font-display text-lg font-semibold text-cyan/90 md:text-xl">
              Lakshya Badjatya — CTO at Sammed Technosol
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-dim">{profile.about.lead}</p>
          </Reveal>
        </header>

        <section className="mb-20 grid gap-5 sm:grid-cols-2">
          {profile.about.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.07} className={i === profile.about.cards.length - 1 ? 'sm:col-span-2' : ''}>
              <article className="glass h-full rounded-2xl p-7">
                <div className="text-3xl">{card.emoji}</div>
                <h3 className="mt-4 font-display text-xl font-bold">{card.title}</h3>
                <p className="mt-2 leading-relaxed text-dim">{card.text}</p>
              </article>
            </Reveal>
          ))}
        </section>

        <section className="mb-20">
          <SectionLabel pre="My Path" title="Journey" />
          <div className="relative ml-2 border-l border-cyan/20 pl-8">
            {profile.timeline.map((event, i) => (
              <Reveal key={event.year} delay={i * 0.06} className="relative mb-10 last:mb-0">
                <span className="absolute -left-[41px] top-1 h-3.5 w-3.5 rounded-full bg-cyan shadow-[0_0_12px_#6ee7ff]" />
                <div className="font-mono text-sm font-semibold text-cyan">{event.year}</div>
                <h3 className="mt-1 font-display text-xl font-bold">{event.label}</h3>
                <p className="mt-1 max-w-xl text-dim">{event.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <SectionLabel pre="Current Trajectory" title="Now" />
          <Reveal>
            <div className="glass rounded-3xl p-7 md:p-8">
              <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
                updated {profile.now.updated}
              </div>
              <ul className="space-y-4">
                {profile.now.items.map((n) => (
                  <li key={n.text} className="flex items-start gap-3">
                    <span className="text-xl">{n.icon}</span>
                    <span className="leading-relaxed text-star/90">{n.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {quotes.length > 0 && (
          <Reveal>
            <section className="glass rounded-3xl p-10 text-center">
              <h3 className="font-display text-2xl font-bold">✨ Personal Favorite Quotes</h3>
              <div className="mt-8 space-y-7">
                {quotes.map((q, i) => (
                  <blockquote key={i} className="text-lg italic leading-relaxed text-star/90">
                    "{q.quote}"
                    <footer className="mt-2 text-sm not-italic text-dim">— {q.author}</footer>
                  </blockquote>
                ))}
              </div>
            </section>
          </Reveal>
        )}
      </main>
    </>
  )
}
