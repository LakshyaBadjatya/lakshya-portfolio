'use client'

import Chapter from './Chapter'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { profile } from '@/content/profile'

export default function FlightPath() {
  return (
    <Chapter id="flightpath">
      <SectionLabel pre="Chapter 02 · Flight Path" title="The Journey So Far" />
      <div className="relative ml-2 border-l border-cyan/20 pl-8 md:ml-10 md:pl-12">
        {profile.timeline.map((event, i) => {
          const isGoal = i === profile.timeline.length - 1
          return (
            <Reveal key={event.year} delay={i * 0.08} className="relative mb-12 last:mb-0">
              <span
                className={`absolute -left-[41px] top-1 h-4 w-4 rounded-full md:-left-[57px] ${
                  isGoal ? 'bg-magenta shadow-[0_0_18px_#f472b6]' : 'bg-cyan shadow-[0_0_12px_#6ee7ff]'
                }`}
              />
              <div className={`font-mono text-sm font-semibold ${isGoal ? 'text-magenta' : 'text-cyan'}`}>
                {event.year}
                {isGoal && (
                  <span className="ml-3 rounded-full border border-magenta/40 bg-magenta/10 px-2 py-0.5 text-[10px] uppercase tracking-widest">
                    destination
                  </span>
                )}
              </div>
              <h3 className="mt-1 font-display text-2xl font-bold">{event.label}</h3>
              <p className="mt-2 max-w-xl leading-relaxed text-dim">{event.desc}</p>
            </Reveal>
          )
        })}
      </div>
    </Chapter>
  )
}
