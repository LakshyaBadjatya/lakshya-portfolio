'use client'

import StaticSky from '@/components/voyage/StaticSky'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { profile } from '@/content/profile'

function InfoCard({ icon, title, children }) {
  return (
    <article className="glass rounded-2xl p-6">
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-3 font-display text-lg font-bold">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-dim">{children}</div>
    </article>
  )
}

export default function ResumeContent() {
  return (
    <>
      <StaticSky />
      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-32 md:px-10 print:max-w-none print:px-0 print:pt-4">
        <header className="mb-12 text-center">
          <Reveal>
            <h1 className="gradient-text font-display text-5xl font-bold tracking-tight md:text-6xl">
              {profile.name}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-dim print:text-black">
              Class 12 PCM student from Kota, India with a passion for building production-grade applications.
              Aspiring to study Computer Science internationally, Fall 2027.
            </p>
            <div className="no-print mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="/Lakshya_Badjatya_Resume.pdf"
                download
                className="rounded-full bg-cyan px-6 py-2 font-mono text-sm font-semibold text-void transition-shadow hover:shadow-[0_0_24px_#6ee7ff55]"
              >
                Download PDF ↓
              </a>
              <button
                onClick={() => window.print()}
                className="rounded-full border border-cyan/40 bg-cyan/10 px-6 py-2 font-mono text-sm text-cyan transition-colors hover:bg-cyan/20"
              >
                Print
              </button>
            </div>
          </Reveal>
        </header>

        <section className="mb-14 grid gap-5 md:grid-cols-3">
          <Reveal>
            <InfoCard icon="📩" title="Contact">
              <strong>Email:</strong> {profile.email}<br />
              <strong>Phone:</strong> {profile.phone}<br />
              <strong>Location:</strong> {profile.location}<br />
              <strong>Website:</strong> {profile.site}
            </InfoCard>
          </Reveal>
          <Reveal delay={0.07}>
            <InfoCard icon="🎯" title="Objective">{profile.objective}</InfoCard>
          </Reveal>
          <Reveal delay={0.14}>
            <InfoCard icon="🎓" title="Education">
              <strong>{profile.education.title}</strong><br />
              {profile.education.detail}<br />
              {profile.education.extra}
            </InfoCard>
          </Reveal>
        </section>

        <section className="mb-14">
          <SectionLabel pre="Expertise" title="Technical Skills" />
          <div className="grid gap-5 sm:grid-cols-2">
            {profile.skills.map((skill, i) => (
              <Reveal key={skill.category} delay={i * 0.05}>
                <article className="glass rounded-2xl p-6">
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: skill.color, boxShadow: `0 0 8px ${skill.color}` }} />
                    <h3 className="font-display font-bold" style={{ color: skill.color }}>{skill.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map((tag) => (
                      <span key={tag} className="rounded-md px-2 py-0.5 font-mono text-xs" style={{ background: `${skill.color}14`, color: skill.color, border: `1px solid ${skill.color}30` }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionLabel pre="Featured Work" title="Projects" />
          <div className="space-y-6">
            {profile.projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <article className="glass rounded-2xl p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                    <span className="rounded-full px-3 py-0.5 text-xs font-semibold" style={{ background: `${p.accent}1f`, color: p.accent, border: `1px solid ${p.accent}44` }}>
                      {p.type}
                    </span>
                  </div>
                  <div className="mt-1 font-mono text-xs text-dim">{p.stack.join(' · ')}</div>
                  <ul className="mt-4 space-y-2">
                    {p.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed text-star/85">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-dim" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionLabel pre="My Path" title="Timeline" />
          <div className="relative ml-2 border-l border-cyan/20 pl-8">
            {profile.timeline.map((event, i) => (
              <Reveal key={event.year} delay={i * 0.04} className="relative mb-8 last:mb-0">
                <span className="absolute -left-[37px] top-1 h-3 w-3 rounded-full bg-cyan shadow-[0_0_10px_#6ee7ff]" />
                <div className="font-mono text-sm font-semibold text-cyan">{event.year}</div>
                <h3 className="font-display text-lg font-bold">{event.label}</h3>
                <p className="text-sm text-dim">{event.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section>
          <SectionLabel pre="Beyond Code" title="Activities & Interests" />
          <div className="grid gap-5 md:grid-cols-3">
            {profile.extras.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.06}>
                <InfoCard icon={e.icon} title={e.title}>{e.text}</InfoCard>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
