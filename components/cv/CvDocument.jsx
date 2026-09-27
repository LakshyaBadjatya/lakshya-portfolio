import Image from 'next/image'

const bare = (href) => href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
const absolute = (href, base) => (href.startsWith('/') ? `${base}${href}` : href)

function Block({ title, children }) {
  return (
    <section className="break-inside-avoid">
      <h2 className="mb-2.5 border-b border-rule pb-1 text-[7.5pt] font-semibold uppercase tracking-[0.2em] text-accent">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Joined({ items }) {
  return items.map((item, i) => (
    <span key={item.href}>
      {i > 0 && ' · '}
      <a href={item.href}>{item.text}</a>
    </span>
  ))
}

/** One-page A4 CV built from the same profile as the website. */
export default function CvDocument({ profile: p }) {
  const featured = p.work.filter((w) => w.id === 'samlab')
  return (
    <article className="cv-page bg-white text-ink">
      <header className="flex items-start justify-between gap-8 border-b border-ink pb-5">
        <div>
          <h1 className="font-serif text-[40pt] leading-[0.95] tracking-[-0.01em]">{p.name}</h1>
          <p className="mt-2 text-[12pt]">{p.role}</p>
          <p className="mt-3 text-[8.5pt] text-ink-2">
            {p.location} ·{' '}
            <Joined
              items={[
                { href: `mailto:${p.email}`, text: p.email },
                { href: p.url, text: bare(p.url) },
              ]}
            />
          </p>
          <p className="mt-1 text-[8.5pt] text-ink-2">
            <Joined items={p.links.map((l) => ({ href: l.href, text: bare(l.href) }))} />
          </p>
        </div>
        <div className="relative h-[36mm] w-[24mm] shrink-0 overflow-hidden bg-paper">
          <Image src={p.portrait.src} alt="" fill sizes="192px" className="object-cover object-top" preload />
        </div>
      </header>

      <div className="mt-6 grid grid-cols-[1fr_58mm] gap-x-9">
        <div className="space-y-6">
          <Block title="Profile">
            <p>{p.about}</p>
          </Block>
          <Block title="Experience">
            {p.experience.map((e) => (
              <div key={e.role}>
                <p className="flex justify-between gap-4">
                  <span className="font-semibold">
                    {e.role} · {e.org}
                  </span>
                  <span className="shrink-0 text-ink-2">{e.period}</span>
                </p>
                <p className="text-ink-2">{e.place}</p>
                <ul className="mt-1.5 list-disc space-y-0.5 pl-4">
                  {e.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Block>
          <Block title="Selected work">
            {featured.map((w) => (
              <div key={w.id}>
                <p className="flex justify-between gap-4">
                  <span className="font-semibold">{w.name}</span>
                  <span className="shrink-0 text-ink-2">
                    <Joined items={w.links.map((l) => ({ href: l.href, text: l.label }))} />
                  </span>
                </p>
                <p className="italic">{w.tagline}</p>
                <ul className="mt-1.5 list-disc space-y-0.5 pl-4">
                  {w.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Block>
        </div>
        <aside className="space-y-6">
          <Block title="Education">
            {p.education.map((e) => (
              <div key={e.school}>
                <p className="font-semibold">{e.school}</p>
                <p className="text-ink-2">{e.detail}</p>
                <p className="text-ink-2">
                  {e.place} · {e.period}
                </p>
              </div>
            ))}
          </Block>
          <Block title="Certificates">
            <ul className="space-y-2">
              {p.certificates.map((c) => (
                <li key={c.title}>
                  <a href={absolute(c.href, p.url)} className="font-semibold">
                    {c.title}
                  </a>
                  <p className="text-ink-2">
                    {c.issuer} · {c.date}
                  </p>
                  <p className="text-ink-2">{c.detail}</p>
                </li>
              ))}
            </ul>
          </Block>
          <Block title="Skills">
            <ul className="space-y-0.5">
              {p.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Block>
          <Block title="Languages">
            <ul className="space-y-0.5">
              {p.languages.map((l) => (
                <li key={l.name}>
                  {l.name} <span className="text-ink-2">· {l.level}</span>
                </li>
              ))}
            </ul>
          </Block>
        </aside>
      </div>
    </article>
  )
}
