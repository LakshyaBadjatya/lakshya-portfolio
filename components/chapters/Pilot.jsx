'use client'

import Chapter from './Chapter'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { profile } from '@/content/profile'

export default function Pilot() {
  return (
    <Chapter id="pilot">
      <SectionLabel pre="Chapter 01 · The Pilot" title="Mission Briefing" />
      <Reveal className="mb-12 max-w-2xl">
        <p className="text-lg leading-relaxed text-star/90 md:text-xl">{profile.story.intro}</p>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {profile.story.panels.map((panel, i) => (
          <Reveal key={panel.code} delay={i * 0.12}>
            <article className="glass-deep relative h-full rounded-2xl p-6">
              <div className="absolute left-4 top-0 h-px w-10 bg-cyan/60" />
              <div className="mb-4 font-mono text-[11px] tracking-[0.25em] text-cyan/80">{panel.code}</div>
              <h3 className="font-display text-xl font-bold">{panel.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-dim">{panel.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Chapter>
  )
}
