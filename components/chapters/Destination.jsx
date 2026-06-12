'use client'

import Chapter from './Chapter'
import CountUp from '@/components/ui/CountUp'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { profile } from '@/content/profile'

export default function Destination() {
  return (
    <Chapter id="destination" className="items-center text-center">
      <SectionLabel center pre="Chapter 05 · Destination" title="Where This Voyage Leads" />
      <Reveal className="max-w-2xl">
        <p className="text-lg leading-relaxed text-star/90 md:text-xl">{profile.vision}</p>
      </Reveal>
      <Reveal delay={0.15} className="mt-14 w-full">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
          {profile.stats.map((s) => (
            <div key={s.label} className="glass-deep rounded-2xl px-4 py-6">
              <CountUp value={s.value} className="gradient-text font-display text-4xl font-bold" />
              <div className="mt-2 text-xs leading-snug text-dim">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </Chapter>
  )
}
