import Image from 'next/image'
import SectionHeading from './SectionHeading'
import Reveal from '@/components/motion/Reveal'
import RevealLines from '@/components/motion/RevealLines'
import { profile } from '@/content/profile'

export default function Profile() {
  return (
    <section id="profile" aria-labelledby="profile-title" className="mx-auto max-w-[1440px] px-[5vw] py-32">
      <SectionHeading id="profile-title" number="02" title="Profile" slot="profile" slotClassName="xl:hidden" />
      <div className="mt-16 grid grid-cols-4 gap-x-6 gap-y-12 md:grid-cols-12">
        <Reveal className="col-span-4 md:col-span-4">
          <div className="relative aspect-[2/3] w-full max-w-sm overflow-hidden bg-paper-2">
            <Image
              src={profile.portrait.src}
              alt={profile.portrait.alt}
              fill
              sizes="(min-width: 768px) 30vw, 90vw"
              className="object-cover object-top"
            />
          </div>
        </Reveal>
        <div className="col-span-4 md:col-span-7 md:col-start-6 xl:flex xl:gap-6">
          <div className="xl:w-[36rem] xl:shrink-0">
            <RevealLines
              as="blockquote"
              lines={profile.quote}
              className="font-serif text-[length:clamp(2.2rem,4.6vw,4.2rem)] leading-[1.02] tracking-[-0.01em]"
            />
            <Reveal as="p" index={1} className="mt-10 max-w-xl text-lg leading-relaxed text-ink-2">
              {profile.about}
            </Reveal>
          </div>
          {/* The form's room on wide screens: beside the text, reaching into the page margin. */}
          <div
            data-form-slot="profile"
            aria-hidden="true"
            className="hidden [--form-fill:0.83] xl:-mr-[5vw] xl:block xl:min-w-0 xl:flex-1"
          />
        </div>
      </div>
    </section>
  )
}
