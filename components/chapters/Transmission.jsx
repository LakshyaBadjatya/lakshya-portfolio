'use client'

import Link from 'next/link'
import Chapter from './Chapter'
import Reveal from '@/components/ui/Reveal'
import Magnetic from '@/components/ui/Magnetic'
import { profile } from '@/content/profile'

export default function Transmission() {
  return (
    <Chapter id="transmission" className="items-center text-center">
      <Reveal>
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">Final Chapter · Transmission</div>
        <h2 className="gradient-text mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
          Open a channel
        </h2>
        <p className="mx-auto mt-6 max-w-lg leading-relaxed text-dim">
          Whether you're an admissions officer, a fellow builder, or just curious — my inbox is open.
        </p>
      </Reveal>
      <Reveal delay={0.15} className="mt-10 flex flex-col items-center gap-6">
        <Magnetic>
          <a
            href={`mailto:${profile.email}?subject=Hello%20Lakshya`}
            className="inline-block rounded-full bg-cyan px-10 py-4 font-display text-lg font-bold text-void transition-shadow hover:shadow-[0_0_40px_#6ee7ff66]"
          >
            {profile.email}
          </a>
        </Magnetic>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-sm">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-dim transition-colors hover:text-cyan">
              {s.label} ↗
            </a>
          ))}
          <Link href="/resume" className="text-dim transition-colors hover:text-cyan">
            Resume →
          </Link>
        </div>
      </Reveal>
    </Chapter>
  )
}
