import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { m, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
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

/* ─── Mouse Tracker Hook ─────────────────────────── */
function useMousePosition() {
  const x = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const y = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0)
  const smoothX = useSpring(x, { damping: 20, stiffness: 150 })
  const smoothY = useSpring(y, { damping: 20, stiffness: 150 })

  useEffect(() => {
    const handler = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [x, y])

  return { x, y, smoothX, smoothY }
}

/* ─── Aurora Spotlight — follows mouse ───────────── */
function AuroraSpotlight({ mouseX, mouseY }) {
  const bg = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(800px circle at ${x}px ${y}px, rgba(0,255,204,0.14), rgba(168,85,247,0.07) 40%, transparent 70%)`
  )

  return (
    <m.div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        background: bg,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    />
  )
}

/* ─── Mouse Glow Orb — soft trailing glow ────────── */
function MouseGlowOrb({ mouseX, mouseY }) {
  const glowX = useSpring(mouseX, { damping: 40, stiffness: 80 })
  const glowY = useSpring(mouseY, { damping: 40, stiffness: 80 })

  return (
    <m.div
      style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,204,0.18) 0%, rgba(168,85,247,0.1) 40%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 1,
        x: glowX,
        y: glowY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.3 }}
    />
  )
}

/* ─── Interactive Particles — react to mouse ─────── */
function InteractiveParticles({ mouseX, mouseY }) {
  const sectionRef = useRef(null)
  const particles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      baseX: 5 + ((i * 3.7 + i * i * 0.5) % 90),
      baseY: 5 + ((i * 7.3 + i * 1.9) % 88),
      size: 1.5 + (i % 4) * 1.2,
      duration: 4 + (i % 8) * 1.2,
      delay: (i % 7) * 0.4,
      reactStrength: 30 + (i % 5) * 15,
    })), []
  )

  return (
    <div ref={sectionRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 2 }}>
      {particles.map(p => (
        <ReactiveParticle key={p.id} particle={p} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  )
}

function ReactiveParticle({ particle, mouseX, mouseY }) {
  const ref = useRef(null)
  const offsetX = useMotionValue(0)
  const offsetY = useMotionValue(0)
  const springX = useSpring(offsetX, { damping: 25, stiffness: 120 })
  const springY = useSpring(offsetY, { damping: 25, stiffness: 120 })

  useEffect(() => {
    const unsubX = mouseX.on('change', (mx) => {
      if (!ref.current) return
      const rect = ref.current.parentElement?.getBoundingClientRect()
      if (!rect) return
      const px = rect.left + (particle.baseX / 100) * rect.width
      const dx = px - mx
      const dist = Math.abs(dx)
      if (dist < 200) {
        const force = ((200 - dist) / 200) * particle.reactStrength
        offsetX.set(dx > 0 ? force : -force)
      } else {
        offsetX.set(0)
      }
    })

    const unsubY = mouseY.on('change', (my) => {
      if (!ref.current) return
      const rect = ref.current.parentElement?.getBoundingClientRect()
      if (!rect) return
      const py = rect.top + (particle.baseY / 100) * rect.height
      const dy = py - my
      const dist = Math.abs(dy)
      if (dist < 200) {
        const force = ((200 - dist) / 200) * particle.reactStrength
        offsetY.set(dy > 0 ? force : -force)
      } else {
        offsetY.set(0)
      }
    })

    return () => { unsubX(); unsubY() }
  }, [mouseX, mouseY, offsetX, offsetY, particle])

  return (
    <m.div
      ref={ref}
      style={{
        position: 'absolute',
        left: `${particle.baseX}%`,
        top: `${particle.baseY}%`,
        width: particle.size,
        height: particle.size,
        borderRadius: '50%',
        background: 'var(--secondary)',
        boxShadow: `0 0 ${particle.size * 6}px var(--secondary)`,
        x: springX,
        y: springY,
      }}
      animate={{
        opacity: [0.08, 0.6, 0.08],
        scale: [1, 1.6, 1],
      }}
      transition={{
        duration: particle.duration,
        delay: particle.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

/* ─── Floating Orbs — mouse parallax each ────────── */
function FloatingOrbs({ mouseX, mouseY }) {
  const orbs = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: `${15 + i * 18}%`,
      y: `${20 + ((i * 17) % 60)}%`,
      size: 140 + i * 70,
      duration: 8 + i * 2,
      delay: i * 0.8,
      color: i % 2 === 0 ? 'var(--secondary)' : 'var(--secondary-bright)',
      parallaxFactor: 0.02 + i * 0.01,
    })), []
  )

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {orbs.map(o => (
        <MouseParallaxOrb key={o.id} orb={o} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  )
}

function MouseParallaxOrb({ orb, mouseX, mouseY }) {
  const ox = useTransform(mouseX, (v) => (v - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * orb.parallaxFactor)
  const oy = useTransform(mouseY, (v) => (v - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * orb.parallaxFactor)
  const sx = useSpring(ox, { damping: 30, stiffness: 60 })
  const sy = useSpring(oy, { damping: 30, stiffness: 60 })

  return (
    <m.div
      style={{
        position: 'absolute',
        left: orb.x,
        top: orb.y,
        width: orb.size,
        height: orb.size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
        opacity: 0,
        filter: 'blur(60px)',
        x: sx,
        y: sy,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.06, 0.18, 0.06],
      }}
      transition={{
        duration: orb.duration,
        delay: orb.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

/* ─── Mouse-Reactive Grid Lines ──────────────────── */
function GridLines({ mouseX, mouseY }) {
  const maskImage = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, black 10%, transparent 70%)`
  )

  return (
    <m.div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        backgroundImage: `
          linear-gradient(var(--glass-border) 1px, transparent 1px),
          linear-gradient(90deg, var(--glass-border) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        maskImage,
        WebkitMaskImage: maskImage,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 2, delay: 0.5 }}
    />
  )
}

/* ─── Mouse Ripple Trail ─────────────────────────── */
function MouseRippleTrail({ mouseX, mouseY }) {
  const [ripples, setRipples] = useState([])
  const lastPos = useRef({ x: 0, y: 0 })
  const idRef = useRef(0)

  useEffect(() => {
    const unsub = mouseX.on('change', (mx) => {
      const my = mouseY.get()
      const dx = mx - lastPos.current.x
      const dy = my - lastPos.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist > 60) {
        lastPos.current = { x: mx, y: my }
        const id = idRef.current++
        setRipples(prev => [...prev.slice(-6), { id, x: mx, y: my }])
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== id))
        }, 1200)
      }
    })
    return unsub
  }, [mouseX, mouseY])

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {ripples.map(r => (
        <m.div
          key={r.id}
          initial={{ scale: 0, opacity: 0.3 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: r.x,
            top: r.y,
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '1px solid var(--secondary)',
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Split Text Animation ────────────────────────── */
function AnimatedText({ text, className, delay = 0 }) {
  const chars = text.split('')
  return (
    <m.span
      className={className}
      style={{ display: 'inline-block', perspective: '800px' }}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.035, delayChildren: delay } } }}
    >
      {chars.map((char, i) => (
        <m.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}
          variants={{
            hidden: { opacity: 0, y: 60, rotateX: -90, filter: 'blur(8px)', transformOrigin: '50% 0%' },
            visible: {
              opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
              transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
            },
          }}
        >
          {char}
        </m.span>
      ))}
    </m.span>
  )
}

/* ─── Status Badge ─────────────────────────────────── */
function StatusBadge() {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 16px',
        borderRadius: '99px',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--glass-border)',
        fontSize: '0.8rem',
        fontFamily: 'var(--font-accent)',
        color: 'var(--secondary)',
        marginBottom: '1.5rem',
      }}
    >
      <m.span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'var(--secondary)',
        }}
        animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      Open to opportunities
    </m.div>
  )
}

export default function Hero() {
  const [typingStatus, setTypingStatus] = useState('Initializing')
  const [isMobile, setIsMobile] = useState(false)
  const parallax = useMouseParallax(15)
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 60])
  const mouse = useMousePosition()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const fadeUp = {
    hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { delay: 0.3 + i * 0.15, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
    }),
  }

  return (
    <Section classProp={`${hero.section}`}>
      <m.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}>
        <Container spacing={'VerticalXXXL'}>

          {/* Status badge */}
          <StatusBadge />

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
              whileHover={{
                scale: 1.07,
                y: -4,
                boxShadow: '0 16px 40px rgba(0,255,204,0.3), 0 0 60px rgba(0,255,204,0.15)',
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {content.buttons.primary.title}
            </m.button>

            <m.button
              className={`button ${button.secondary} leaveSite`}
              onClick={() =>
                window.open('https://www.linkedin.com/in/lakshya-badjatya/', '_blank')
              }
              whileHover={{
                scale: 1.07,
                y: -4,
                boxShadow: '0 12px 32px rgba(168,85,247,0.2)',
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {content.buttons.secondary.title}
            </m.button>
          </m.section>

        </Container>
      </m.div>

      {/* ── Mouse-reactive layers ── */}
      {!isMobile && <AuroraSpotlight mouseX={mouse.x} mouseY={mouse.y} />}
      {!isMobile && <MouseGlowOrb mouseX={mouse.smoothX} mouseY={mouse.smoothY} />}
      {!isMobile && <MouseRippleTrail mouseX={mouse.x} mouseY={mouse.y} />}

      {/* Floating Orbs — only on desktop */}
      {!isMobile && <FloatingOrbs mouseX={mouse.smoothX} mouseY={mouse.smoothY} />}

      {/* Interactive Particles — only on desktop */}
      {!isMobile && <InteractiveParticles mouseX={mouse.x} mouseY={mouse.y} />}

      {/* Grid Lines — only on desktop */}
      {!isMobile && <GridLines mouseX={mouse.x} mouseY={mouse.y} />}

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
          gap: '8px',
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ delay: 3, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <m.span
          style={{
            fontSize: '0.65rem',
            fontFamily: 'var(--font-accent)',
            color: 'var(--primary-dim)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </m.span>
        <m.div
          style={{
            width: '24px',
            height: '40px',
            borderRadius: '12px',
            border: '2px solid var(--primary-dim)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '7px',
          }}
        >
          <m.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '3px',
              height: '8px',
              borderRadius: '2px',
              background: 'var(--gradient-primary)',
            }}
          />
        </m.div>
      </m.div>

    </Section>
  )
}
