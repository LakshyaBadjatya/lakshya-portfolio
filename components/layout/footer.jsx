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

        {/* CENTERED SOCIAL SECTION */}
        <section className={css.sections}>
          <ul className={css.socialCenter}>
            <li><h4>Social</h4></li>
            <li className={css.socialList}>
              {content.social.map(({ url, icon }, index) => (
                <MagneticButton key={index} strength={0.3}>
                  <m.a
                    href={url}
                    rel="noreferrer"
                    target="_blank"
                    whileHover={{ scale: 1.25, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
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
          <h5>
            © Lakshya Badjatya {new Date().getFullYear()}
          </h5>
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
            whileHover={{ scale: 1.1, y: -3, boxShadow: '0 8px 24px rgba(127,234,255,0.3)' }}
            whileTap={{ scale: 0.92 }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--background-dim2)',
              border: '1px solid var(--primary-dark)',
              color: 'var(--secondary)',
              cursor: 'pointer',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              backdropFilter: 'blur(10px)',
            }}
            aria-label="Scroll to top"
          >
            ↑
          </m.button>
        )}
      </AnimatePresence>
    </footer>
  )
}
