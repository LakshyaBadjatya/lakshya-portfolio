import Reveal from '@/components/motion/Reveal'

export default function SectionHeading({ id, number, title, slot, slotClassName = '' }) {
  const heading = (
    <Reveal className="flex items-baseline gap-6 border-t border-rule pt-5">
      <span className="text-sm tabular-nums text-ink-2">{number}</span>
      <h2 id={id} className="text-sm uppercase tracking-[0.18em]">
        {title}
      </h2>
    </Reveal>
  )
  if (!slot) return heading
  return (
    <div className="relative">
      {heading}
      {/* The form's room: a small square resting on the rule's right end (outside the
          Reveal, so its entrance transform can't skew the measurement). */}
      <div
        data-form-slot={slot}
        aria-hidden="true"
        className={`absolute bottom-full right-0 mb-4 size-14 md:size-16 ${slotClassName}`}
      />
    </div>
  )
}
