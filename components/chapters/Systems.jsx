'use client'

import Chapter from './Chapter'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { profile } from '@/content/profile'

export default function Systems() {
  return (
    <Chapter id="systems">
      <SectionLabel pre="Chapter 04 · Systems" title="Technical Arsenal" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((skill, i) => (
          <Reveal key={skill.category} delay={i * 0.08}>
            <article className="glass-deep h-full rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: skill.color, boxShadow: `0 0 10px ${skill.color}` }} />
                <h3 className="font-display text-base font-bold" style={{ color: skill.color }}>
                  {skill.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md px-2.5 py-1 font-mono text-xs"
                    style={{ background: `${skill.color}14`, color: skill.color, border: `1px solid ${skill.color}30` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Chapter>
  )
}
