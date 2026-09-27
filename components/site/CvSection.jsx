import SectionHeading from './SectionHeading'
import Reveal from '@/components/motion/Reveal'
import { profile } from '@/content/profile'

function Row({ label, index, children }) {
  return (
    <Reveal index={index} className="grid grid-cols-4 gap-x-6 gap-y-4 border-t border-rule py-10 md:grid-cols-12">
      <h3 className="col-span-4 text-sm uppercase tracking-[0.18em] text-ink-2 md:col-span-3">{label}</h3>
      <div className="col-span-4 md:col-span-9">{children}</div>
    </Reveal>
  )
}

export default function CvSection() {
  return (
    <section id="cv" aria-labelledby="cv-title" className="mx-auto max-w-[1440px] px-[5vw] py-32">
      <SectionHeading id="cv-title" number="03" title="CV" />
      <div className="mt-12 border-b border-rule">
        <Row label="Experience" index={0}>
          {profile.experience.map((e) => (
            <div key={e.role}>
              <p className="font-serif text-3xl leading-tight md:text-4xl">{e.role}</p>
              <p className="mt-2 text-lg">
                <a href={e.orgHref} target="_blank" rel="noopener noreferrer" className="link">
                  {e.org}
                </a>
                <span className="text-ink-2">
                  {' '}
                  · {e.place} · {e.period}
                </span>
              </p>
              <ul className="mt-5 space-y-2 text-ink-2">
                {e.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </Row>
        <Row label="Education" index={1}>
          {profile.education.map((e) => (
            <div key={e.school}>
              <p className="font-serif text-3xl leading-tight md:text-4xl">{e.school}</p>
              <p className="mt-2 text-lg text-ink-2">
                {e.detail} · {e.place} · {e.period}
              </p>
            </div>
          ))}
        </Row>
        <Row label="Certificates" index={2}>
          <ul className="space-y-6">
            {profile.certificates.map((c) => (
              <li key={c.title} className="grid gap-1 md:grid-cols-[1fr_auto] md:gap-8">
                <div>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="link text-lg">
                    {c.title} <span aria-hidden="true">↗</span>
                  </a>
                  <p className="text-ink-2">
                    {c.issuer} · {c.detail}
                  </p>
                </div>
                <p className="text-ink-2 md:text-right">{c.date}</p>
              </li>
            ))}
          </ul>
        </Row>
        <Row label="Skills" index={3}>
          <ul className="flex flex-wrap gap-3">
            {profile.skills.map((s) => (
              <li key={s} className="rounded-full border border-rule px-4 py-1.5">
                {s}
              </li>
            ))}
          </ul>
        </Row>
        <Row label="Languages" index={4}>
          <ul className="space-y-2 text-lg">
            {profile.languages.map((l) => (
              <li key={l.name}>
                {l.name} <span className="text-ink-2">· {l.level}</span>
              </li>
            ))}
          </ul>
        </Row>
      </div>
      <Reveal className="mt-12">
        <a
          href="/Lakshya-Badjatya-CV.pdf"
          download
          className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-paper transition-colors hover:bg-accent"
        >
          Download CV <span className="text-paper/70">PDF · 1 page</span>
        </a>
      </Reveal>
    </section>
  )
}
