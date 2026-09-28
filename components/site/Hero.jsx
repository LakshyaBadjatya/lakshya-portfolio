import { getImageProps } from 'next/image'
import { profile } from '@/content/profile'
import { HERO_FILL } from '@/lib/keyframes'

// The still only shows on wide landscape screens (md:landscape below), so only they
// request it. Everywhere else the <img> keeps a transparent pixel and fetches nothing.
const LANDSCAPE = '(min-width: 48rem) and (orientation: landscape)'
const PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

export default function Hero() {
  const {
    props: { srcSet, sizes, ...still },
  } = getImageProps({ src: '/form-still.png', alt: '', fill: true, sizes: '100vh', loading: 'eager', fetchPriority: 'high' })

  return (
    <section id="top" aria-label="Introduction" className="relative w-full overflow-hidden">
      <div
        aria-hidden="true"
        className="form-still pointer-events-none absolute top-0 hidden aspect-square h-screen md:landscape:block"
        style={{ left: 'calc(71vw - 50vh)' }}
      >
        <picture>
          <source media={LANDSCAPE} srcSet={srcSet} sizes={sizes} />
          <img {...still} src={PIXEL} alt="" />
        </picture>
      </div>
      {/* The form's room on wide screens: the still's column, reaching past the hero so the
          form holds still while the name scrolls away. */}
      <div
        data-form-slot="top"
        aria-hidden="true"
        className="pointer-events-none absolute top-0 hidden h-[150vh] w-[100vh] md:landscape:block"
        style={{ left: 'calc(71vw - 50vh)', '--form-fill': HERO_FILL }}
      />
      <div className="relative mx-auto grid min-h-[100svh] max-w-[1440px] grid-cols-4 grid-rows-[1fr_auto] content-end gap-x-6 px-[5vw] pb-24 pt-28 md:grid-cols-12 md:landscape:grid-rows-none md:landscape:content-center md:landscape:pb-16">
        {/* Elsewhere: the free space above the name. */}
        <div data-form-slot="top" aria-hidden="true" className="col-span-4 [--form-fill:0.72] md:col-span-12 md:landscape:hidden" />
        <div className="col-span-4 row-start-2 md:col-span-7 md:landscape:row-start-auto">
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
