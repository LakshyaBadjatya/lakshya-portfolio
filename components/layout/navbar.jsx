import { useEffect, useState } from 'react'
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

  /* Close menu on mount */
  useEffect(() => {
    menuToggle(false)
  }, [])

  /* Close menu on route change */
  useEffect(() => {
    const closeMenu = () => menuToggle(false)
    router.events.on('routeChangeComplete', closeMenu)
    return () => router.events.off('routeChangeComplete', closeMenu)
  }, [router.events])

  /* Track scroll for nav background */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMenu = () => menuToggle(!menuState)

  const getPageTitle = () => {
    if (title) return title
    const path = router.pathname.toLowerCase()
    if (path === '/') return settings.name
    if (path.includes('projects')) return 'Projects'
    if (path.includes('about')) return 'About Me'
    return settings.name
  }

  const pageTitle = getPageTitle()

  const isActive = (url) => router.pathname === url || router.pathname.startsWith(url + '/')

  return (
    <m.nav
      id="Navbar"
      className={css.container}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      data-scrolled={scrolled}
    >
      <ul className={css.menu}>
        <li className={css.menuHeader}>

          {/* LEFT: Dynamic title pill */}
          <MagneticButton strength={0.15}>
            <Link className={css.logo} href="/">
              {pageTitle}
            </Link>
          </MagneticButton>

          {/* Desktop nav links */}
          <div className={css.desktopNav} style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            {content.map(({ url, title }, index) => (
              <MagneticButton key={index} strength={0.15}>
                <div style={{ position: 'relative' }}>
                  <Link href={url} className={css.desktopLink}>
                    {title}
                  </Link>
                  {/* Active underline indicator */}
                  {isActive(url) && (
                    <m.div
                      layoutId="nav-active"
                      style={{
                        position: 'absolute',
                        bottom: '-3px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'var(--secondary)',
                        borderRadius: '99px',
                        boxShadow: '0 0 8px var(--secondary)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              </MagneticButton>
            ))}
          </div>

          {/* Theme toggle — far right on desktop */}
          <div className={css.themeToggle}>
            <ThemeMode />
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
                initial={{ opacity: 0, x: -15 }}
                animate={menuState ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.08, duration: 0.3 }}
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
