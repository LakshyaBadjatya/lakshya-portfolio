import Reveal from '@/components/motion/Reveal'
import ScrollTitle from '@/components/motion/ScrollTitle'

export default function WorkChapter({ item, total, align }) {
  const right = align === 'right'
  return (
    <article
      id={item.id}
      aria-labelledby={`${item.id}-title`}
      className="relative grid min-h-[110vh] grid-cols-4 content-center gap-x-6 py-24 md:grid-cols-12"
    >
      {/* The form's room: the free columns beside the text, full height so the form holds
          still while the chapter scrolls past; on small screens a square above the chapter. */}
      <div
        data-form-slot={item.id}
        aria-hidden="true"
        className={`col-span-4 mx-auto mb-12 aspect-square w-[min(62vw,20rem)] md:absolute md:inset-0 md:col-span-5 md:mx-0 md:mb-0 md:aspect-auto md:w-auto md:[--form-fill:0.86] ${right ? 'md:col-start-1' : 'md:col-start-8'}`}
      />
      <div className={`col-span-4 md:col-span-7 ${right ? 'md:col-start-6' : ''}`}>
        <Reveal className="mb-6 flex items-baseline gap-4 text-sm text-ink-2">
          <span className="tabular-nums">
            {item.number} / {String(total).padStart(2, '0')}
          </span>
          <span>{item.meta}</span>
        </Reveal>
        <ScrollTitle className="font-serif text-[length:clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-[-0.02em]">
          <span id={`${item.id}-title`}>{item.name}</span>
        </ScrollTitle>
        <Reveal as="p" index={1} className="mt-6 max-w-xl font-serif text-2xl italic leading-snug md:text-3xl">
          {item.tagline}
        </Reveal>
        <ul className="mt-10 max-w-xl space-y-4 border-t border-rule pt-6">
          {item.lines.map((line, i) => (
            <Reveal as="li" key={line} index={i + 2} className="flex gap-4 text-base leading-relaxed md:text-lg">
              <span aria-hidden="true" className="shrink-0 text-accent">—</span>
              <span>{line}</span>
            </Reveal>
          ))}
        </ul>
        <Reveal index={item.lines.length + 2} className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-base">
          {item.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link text-accent">
              {l.label} <span className="text-ink-2">· {l.note}</span> <span aria-hidden="true">↗</span>
            </a>
          ))}
        </Reveal>
      </div>
    </article>
  )
}
