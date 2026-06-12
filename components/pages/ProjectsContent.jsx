'use client'

import StaticSky from '@/components/voyage/StaticSky'
import Reveal from '@/components/ui/Reveal'
import { profile } from '@/content/profile'

export default function ProjectsContent() {
  return (
    <>
      <StaticSky />
      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-32 md:px-10">
        <header className="mb-16 text-center">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">Mission Log</div>
            <h1 className="gradient-text mt-3 font-display text-5xl font-bold tracking-tight md:text-6xl">Projects</h1>
            <p className="mx-auto mt-4 max-w-xl text-dim">
              Every world I've built — from a first Unity game to enterprise platforms serving real businesses.
            </p>
          </Reveal>
        </header>

        <div className="space-y-10">
          {profile.projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <article className="glass rounded-3xl p-8 md:p-10" style={{ boxShadow: `0 0 0 1px ${p.accent}22` }}>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-mono text-sm text-dim">0{i + 1}</span>
                  <h2 className="font-display text-3xl font-bold md:text-4xl">{p.name}</h2>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ background: `${p.accent}1f`, color: p.accent, border: `1px solid ${p.accent}44` }}
                  >
                    {p.type}
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {p.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 leading-relaxed text-star/85">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.accent }} />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-star/80">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-5">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target={l.href.startsWith('/') ? undefined : '_blank'}
                      rel="noreferrer"
                      download={l.href.endsWith('.apk') ? '' : undefined}
                      className="rounded-full border px-5 py-2 text-sm font-semibold transition-colors"
                      style={{ borderColor: `${p.accent}55`, color: p.accent }}
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </main>
    </>
  )
}
