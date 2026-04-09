import Head from "next/head"
import Link from "next/link"
import { m } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import Hero from '../components/sections/index/hero'
import About from '../components/sections/index/about'
import Technical from '../components/sections/index/technical'
import FeaturedProjects from '../components/sections/projects/featured'

import Section from '../components/structure/section'
import Container from '../components/structure/container'

import Color from '../components/utils/page.colors.util'
import colors from '../content/index/_colors.json'

import button from '../styles/blocks/button.module.scss'

function ResumeCTA() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <Section>
      <Container spacing={['verticalXXXLrg']}>
        <div ref={ref} style={{ textAlign: 'center' }}>
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ marginBottom: '16px' }}
          >
            <span style={{
              fontFamily: 'var(--font-accent)',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--secondary)',
            }}>
              Want to know more?
            </span>
          </m.div>

          <m.h2
            className="gradient-text"
            initial={{ opacity: 0, y: 30, clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={inView ? { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' } : {}}
            transition={{ duration: 0.75, ease: [0.25, 0.4, 0.25, 1], delay: 0.1 }}
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              marginBottom: '16px',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 6s ease infinite',
            }}
          >
            Check Out My Resume
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              maxWidth: '500px',
              margin: '0 auto 32px',
              fontSize: '1rem',
              lineHeight: 1.7,
              color: 'var(--primary-dim)',
            }}
          >
            7+ production apps shipped across web, mobile &amp; desktop.
            Explore my skills, projects, and journey.
          </m.p>

          <Link href="/resume" style={{ textDecoration: 'none' }}>
            <m.button
              className={`button ${button.primary}`}
              whileHover={{ scale: 1.07, y: -4 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              style={{ fontSize: '1.05rem', padding: '0.85rem 2.8rem' }}
            >
              View My Resume
            </m.button>
          </Link>
        </div>
      </Container>
    </Section>
  )
}

export default function HomePage() {
  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>Lakshya Badjatya | Student Portfolio & Developer</title>
        <meta
          name="description"
          content="Lakshya Badjatya is a Class 12 PCM student showcasing projects, skills, and learning in computer science, web development, and game development."
        />
        <meta name="author" content="Lakshya Badjatya" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Lakshya Badjatya | Student Portfolio" />
        <meta
          property="og:description"
          content="Student portfolio showcasing projects, skills, and learning journey in computer science."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sukhma.in" />
        <meta property="og:image" content="https://sukhma.in/og-image.png" />

        {/* Social Profile Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Lakshya Badjatya",
              "url": "https://sukhma.in",
              "sameAs": [
                "https://github.com/LakshyaBadjatya",
                "https://www.linkedin.com/in/lakshya-badjatya-a12a77399/",
                "https://dev.to/lakshyabadjatya",
                "https://medium.com/@lakshyabadjatya"
              ]
            })
          }}
        />
      </Head>

      {/* Page Content */}
      <Color colors={colors} />
      <Hero />
      <FeaturedProjects />
      <About />
      <Technical />
      <ResumeCTA />
    </>
  )
}
