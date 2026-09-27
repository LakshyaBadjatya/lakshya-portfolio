import Reveal from '@/components/motion/Reveal'

export default function SectionHeading({ id, number, title }) {
  return (
    <Reveal className="flex items-baseline gap-6 border-t border-rule pt-5">
      <span className="text-sm tabular-nums text-ink-2">{number}</span>
      <h2 id={id} className="text-sm uppercase tracking-[0.18em]">
        {title}
      </h2>
    </Reveal>
  )
}
