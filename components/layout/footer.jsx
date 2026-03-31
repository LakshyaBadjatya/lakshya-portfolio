import { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import Container from '../structure/container'
import Icon from '../utils/icon.util'
import RateMe from '../utils/RateMe'
import { MagneticButton } from '../utils/MouseEffects'

import css from '../../styles/structure/footer.module.scss'
import content from '../../content/footer.json'

export default function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className={css.container}>
      <Container spacing={['verticalXXLrg', 'bottomLrg']}>

        {/* Decorative divider */}
        <m.div
          style={{
            width: '80px',
            height: '3px',
            background: 'var(--gradient-primary)',
            borderRadius: '99px',
            margin: '0 auto 2rem',
          }}
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 80, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />

        {/* CENTERED SOCIAL SECTION */}
        <section className={css.sections}>
          <ul className={css.socialCenter}>
            <li>
              <m.h4
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ color: 'var(--secondary)', fontFamily: 'var(--font-accent)' }}
              >
                Connect
              </m.h4>
            </li>
            <li className={css.socialList}>
              {content.social.map(({ url, icon }, index) => (
                <MagneticButton key={index} strength={0.3}>
                  <m.a
                    href={url}
                    rel="noreferrer"
                    target="_blank"
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{
                      scale: 1.3,
                      y: -6,
                      filter: 'drop-shadow(0 4px 12px var(--card-glow))',
                    }}
                    whileTap={{ scale: 0.9 }}
                    style={{ display: 'inline-flex', color: 'var(--primary-dim)', transition: 'color 0.3s' }}
                  >
                    <Icon icon={['fab', icon]} />
                  </m.a>
                </MagneticButton>
              ))}
            </li>
          </ul>
        </section>

        {/* COPYRIGHT */}
        <section className={css.copyright}>
          <m.h5
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            &copy; Lakshya Badjatya {new Date().getFullYear()}
          </m.h5>
        </section>

        {/* RATE ME SECTION */}
        <section className={css.rateMe}>
          <RateMe />
        </section>

      </Container>

      {/* BACKGROUND GRADIENT */}
      <canvas id="gradient-canvas" data-transition-in></canvas>

      {/* SCROLL TO TOP BUTTON */}
      <AnimatePresence>
        {showTop && (
          <m.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            whileHover={{
              scale: 1.15,
              y: -3,
              boxShadow: '0 8px 30px rgba(0,255,204,0.25), 0 0 40px rgba(0,255,204,0.1)',
            }}
            whileTap={{ scale: 0.92 }}
            style={{
              position: 'fixed',
              bottom: '1.5rem',
              right: '1.5rem',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--secondary)',
              cursor: 'pointer',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              backdropFilter: 'blur(16px)',
            }}
            aria-label="Scroll to top"
          >
            <m.span
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              ↑
            </m.span>
          </m.button>
        )}
      </AnimatePresence>
    </footer>
  )
}
