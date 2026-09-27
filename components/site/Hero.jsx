import Image from 'next/image'
import { profile } from '@/content/profile'

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative w-full overflow-hidden">
      <div
        aria-hidden="true"
        className="form-still pointer-events-none absolute top-0 hidden aspect-square h-screen md:landscape:block"
        style={{ left: 'calc(71vw - 50vh)' }}
      >
        <Image src="/form-still.png" alt="" fill sizes="100vh" preload />
      </div>
      <div className="relative mx-auto grid min-h-[100svh] max-w-[1440px] grid-cols-4 content-end gap-x-6 px-[5vw] pb-24 pt-28 md:grid-cols-12 md:landscape:content-center md:landscape:pb-16">
        <div className="col-span-4 md:col-span-7">
          <p className="intro-fade mb-6 text-sm uppercase tracking-[0.18em] text-ink-2" style={{ '--i': 0 }}>
            {profile.location}
          </p>
          <h1
            aria-label={profile.name}
            className="font-serif text-[length:clamp(4rem,13vw,11.5rem)] leading-[0.88] tracking-[-0.02em]"
          >
            {profile.nameLines.map((line, i) => (
              <span key={line} aria-hidden="true" className="intro-line">
                <span style={{ '--i': i }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="intro-fade mt-8 text-lg md:text-xl" style={{ '--i': 2 }}>
            {profile.role}
          </p>
          <p className="intro-fade mt-2 max-w-md text-lg text-ink-2 md:text-xl" style={{ '--i': 3 }}>
            {profile.headline}
          </p>
        </div>
        <a
          href="#work"
          className="intro-fade link absolute bottom-8 left-[5vw] text-sm text-ink-2"
          style={{ '--i': 5 }}
        >
          Scroll to work <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  )
}
