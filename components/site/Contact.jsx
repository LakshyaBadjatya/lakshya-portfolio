import SectionHeading from './SectionHeading'
import Reveal from '@/components/motion/Reveal'
import RevealLines from '@/components/motion/RevealLines'
import { profile } from '@/content/profile'

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto flex min-h-[90vh] max-w-[1440px] flex-col justify-center px-[5vw] py-32"
    >
      <SectionHeading id="contact-title" number="04" title="Contact" />
      <RevealLines
        as="p"
        lines={['Write to me.']}
        className="mt-16 font-serif text-[length:clamp(3.5rem,11vw,10rem)] leading-[0.9] tracking-[-0.02em]"
      />
      <Reveal index={1} className="mt-10">
        <a href={`mailto:${profile.email}`} className="link text-2xl md:text-4xl">
          {profile.email}
        </a>
      </Reveal>
      <Reveal as="ul" index={2} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-base">
        {profile.links.map((l) => (
          <li key={l.href}>
            <a href={l.href} target="_blank" rel="noopener noreferrer" className="link">
              {l.label} <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
        <li>
          <a href="/Lakshya-Badjatya-CV.pdf" download className="link text-accent">
            Download CV (PDF)
          </a>
        </li>
      </Reveal>
    </section>
  )
}
