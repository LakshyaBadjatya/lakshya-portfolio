'use client'

import { motion } from 'framer-motion'
import Chapter from './Chapter'
import SectionLabel from '@/components/ui/SectionLabel'
import TiltCard from '@/components/ui/TiltCard'
import { profile } from '@/content/profile'

export default function Worlds() {
  return (
    <Chapter id="worlds">
      <SectionLabel pre="Chapter 03 · Worlds" title="Projects I've Shipped" />
      <div className="flex flex-col gap-[14vh]">
        {profile.projects.map((p, i) => (
          <motion.article
            key={p.id}
            id={`project-${p.id}`}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className={`w-full max-w-xl ${i % 2 ? 'self-end' : 'self-start'}`}
          >
            <TiltCard
              className="glass-deep group rounded-3xl p-7 transition-shadow duration-300 md:p-9"
              style={{ boxShadow: `0 24px 80px rgba(0,0,0,0.45), 0 0 0 1px ${p.accent}22` }}
            >
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-xs text-dim">0{i + 1}</span>
              <span
                className="rounded-full px-3 py-0.5 text-[11px] font-semibold"
                style={{ background: `${p.accent}1f`, color: p.accent, border: `1px solid ${p.accent}44` }}
              >
                {p.type}
              </span>
            </div>
            <h3 className="font-display text-3xl font-bold md:text-4xl">{p.name}</h3>
            <p className="mt-3 leading-relaxed text-dim">{p.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-star/80">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-5">
              {p.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.href.startsWith('/') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="text-sm font-semibold transition-colors hover:underline"
                  style={{ color: p.accent }}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
            </TiltCard>
          </motion.article>
        ))}
      </div>
    </Chapter>
  )
}
