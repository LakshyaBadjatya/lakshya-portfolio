import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { m, AnimatePresence } from 'framer-motion'
import ThemeMode from '../utils/theme.util'
import { MagneticButton } from '../utils/MouseEffects'

import settings from '../../content/_settings.json'
import content from '../../content/navbar.json'
import css from '../../styles/structure/navbar.module.scss'

export default function Navbar({ title }) {
  const router = useRouter()
  const [menuState, menuToggle] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    menuToggle(false)
  }, [])

  useEffect(() => {
    const closeMenu = () => menuToggle(false)
    router.events.on('routeChangeComplete', closeMenu)
    return () => router.events.off('routeChangeComplete', closeMenu)
  }, [router.events])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      // Hide on scroll down, show on scroll up
      if (y > lastScrollY.current && y > 100) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMenu = () => menuToggle(!menuState)

  const getPageTitle = () => {
    if (title) return title
    const path = router.pathname.toLowerCase()
    if (path === '/') return settings.name
    if (path.includes('projects')) return 'Projects'
    if (path.includes('resume')) return 'Resume'
    if (path.includes('about')) return 'About Me'
    return settings.name
  }

  const pageTitle = getPageTitle()
  const isActive = (url) => router.pathname === url || router.pathname.startsWith(url + '/')

  return (
    <m.nav
      id="Navbar"
      className={css.container}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden && !menuState ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
      data-scrolled={scrolled}
    >
      <ul className={css.menu}>
        <li className={css.menuHeader}>

          {/* LEFT: Logo */}
          <MagneticButton strength={0.15}>
            <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link className={css.logo} href="/">
                <m.span
                  className="gradient-text"
                  style={{ fontWeight: 800, fontSize: '0.95rem' }}
                >
                  {pageTitle}
                </m.span>
              </Link>
            </m.div>
          </MagneticButton>

          {/* RIGHT GROUP: nav links + theme toggle */}
          <div className={css.rightGroup}>
            {/* Desktop nav links */}
            <div className={css.desktopNav}>
              {content.map(({ url, title }, index) => (
                <MagneticButton key={index} strength={0.15}>
                  <m.div
                    style={{ position: 'relative' }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  >
                    <Link href={url} className={css.desktopLink}>
                      <m.span
                        whileHover={{ color: 'var(--secondary)' }}
                        transition={{ duration: 0.2 }}
                      >
                        {title}
                      </m.span>
                    </Link>
                    {isActive(url) && (
                      <m.div
                        layoutId="nav-active"
                        style={{
                          position: 'absolute',
                          bottom: '-6px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: 'var(--secondary)',
                          boxShadow: '0 0 10px var(--secondary), 0 0 20px var(--secondary)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </m.div>
                </MagneticButton>
              ))}
            </div>

            {/* Theme toggle — far right */}
            <m.div
              className={css.themeToggle}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <ThemeMode />
            </m.div>
          </div>

          <m.button
            onClick={toggleMenu}
            className={css.mobileToggle}
            data-open={menuState}
            whileTap={{ scale: 0.9 }}
          >
            <div>
              <span></span>
              <span></span>
            </div>
          </m.button>

        </li>

        {/* MOBILE MENU */}
        <li data-open={menuState} className={css.menuContent}>
          <ul>
            {content.map(({ url, title }, index) => (
              <m.li
                key={index}
                initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                animate={menuState ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                transition={{ delay: index * 0.1, duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <Link href={url}>{title}</Link>
              </m.li>
            ))}

            <li>
              <ThemeMode />
            </li>
          </ul>
        </li>
      </ul>

      <span
        onClick={toggleMenu}
        className={css.menuBlackout}
        data-open={menuState}
      ></span>
    </m.nav>
  )
}
