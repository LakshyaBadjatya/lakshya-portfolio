import { useState, useEffect, useMemo } from 'react'
import { m } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'

import Section from '../../structure/section'
import Container from '../../structure/container'

import space from '../../utils/spacing.util'
import Icon from '../../utils/icon.util'
import { useMouseParallax } from '../../utils/MouseEffects'

import HeroBg from '../../blocks/hero.bg/bg-color-1'

import hero from '../../../styles/sections/index/hero.module.scss'
import button from '../../../styles/blocks/button.module.scss'

import content from '../../../content/index/hero.json'

/* ─── Floating Particles ──────────────────────────────── */
function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: `${8 + ((i * 5.4 + i * i * 0.8) % 82)}%`,
      y: `${5 + ((i * 11.7 + i * 2.1) % 85)}%`,
      size: 1.5 + (i % 3) * 1.3,
      duration: 5 + (i % 7) * 1.5,
      delay: (i % 6) * 0.65,
    })), []
  )

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {particles.map(p => (
        <m.div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'var(--secondary)',
            boxShadow: `0 0 ${p.size * 4}px var(--secondary)`,
          }}
          animate={{
            y: [0, -28, 0],
            opacity: [0.08, 0.5, 0.08],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Split Text ──────────────────────────────────────── */
function AnimatedText({ text, className, delay = 0 }) {
  const chars = text.split('')
  return (
    <m.span
      className={className}
      style={{ display: 'inline-block', perspective: '600px' }}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.038, delayChildren: delay } } }}
    >
      {chars.map((char, i) => (
        <m.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}
          variants={{
            hidden: { opacity: 0, y: 45, rotateX: -70, transformOrigin: '50% 0%' },
            visible: {
              opacity: 1, y: 0, rotateX: 0,
              transition: { duration: 0.55, ease: [0.25, 0.4, 0.25, 1] },
            },
          }}
        >
          {char}
        </m.span>
      ))}
    </m.span>
  )
}

export default function Hero() {

  const [typingStatus, setTypingStatus] = useState('Initializing')
  const [isMobile, setIsMobile] = useState(false)
  const parallax = useMouseParallax(15)

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    }
  }, [])

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + i * 0.15, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
    }),
  }

  return (
    <Section classProp={`${hero.section}`}>
      <Container spacing={'VerticalXXXL'}>

        {/* Typing animation */}
        <m.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
          {!isMobile ? (
            <TypeAnimation
              className={`${hero.preHeader}`}
              sequence={[
                content.intro.startDelay,
                () => { setTypingStatus('typing') },
                content.intro.start,
                () => { setTypingStatus('typed') },
                content.intro.deleteDelay,
                () => { setTypingStatus('deleting') },
                content.intro.end,
                () => { setTypingStatus('deleted') },
                content.intro.restartDelay,
              ]}
              speed={content.intro.speed}
              deletionSpeed={content.intro.deletionSpeed}
              wrapper={content.intro.wrapper}
              repeat={Infinity}
            />
          ) : (
            <div className={hero.preHeader}>{content.intro.start}</div>
          )}
        </m.div>

        <section>
          {/* Letter-by-letter animated name */}
          <h1 className={hero.header}>
            <AnimatedText text={content.header.name} delay={0.75} />
          </h1>

          <m.h1
            className={`${hero.header} ${hero.primaryDim}`}
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            {content.header.usp}
          </m.h1>
        </section>

        <m.section custom={4} initial="hidden" animate="visible" variants={fadeUp}>
          <p className={`${hero.primaryBright} subtitle ${space(['verticalLrg'])}`}>
            {content.paragraph}
          </p>
        </m.section>

        <m.section
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className={hero.buttons}
        >
          <m.button
            className={`button ${button.primary}`}
            onClick={() => window.location = 'mailto:lakshyabadjatya@gmail.com'}
            whileHover={{ scale: 1.07, y: -4, boxShadow: '0 12px 32px rgba(127,234,255,0.35)' }}
            whileTap={{ scale: 0.96 }}
          >
            {content.buttons.primary.title}
          </m.button>

          <m.button
            className={`button ${button.secondary} leaveSite`}
            onClick={() =>
              window.open('https://www.linkedin.com/in/lakshya-badjatya/', '_blank')
            }
            whileHover={{ scale: 1.07, y: -4 }}
            whileTap={{ scale: 0.96 }}
          >
            {content.buttons.secondary.title}
          </m.button>
        </m.section>

      </Container>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Background with mouse parallax */}
      <m.div style={{ x: parallax.x, y: parallax.y }} className={hero.heroBgParallax}>
        <HeroBg theme="bg-color-1" />
      </m.div>

      {/* Scroll indicator */}
      <m.div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          translateX: '-50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ delay: 2.8, duration: 0.8 }}
      >
        <m.div
          style={{
            width: '26px',
            height: '42px',
            borderRadius: '13px',
            border: '2px solid var(--primary-dim)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '7px',
          }}
        >
          <m.div
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '4px',
              height: '8px',
              borderRadius: '2px',
              background: 'var(--primary-dim)',
            }}
          />
        </m.div>
      </m.div>

    </Section>
  )
}
