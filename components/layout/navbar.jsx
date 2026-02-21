import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ThemeMode from '../utils/theme.util'

import settings from '../../content/_settings.json'
import content from '../../content/navbar.json'
import css from '../../styles/structure/navbar.module.scss'

export default function Navbar({ title }) {
  const router = useRouter()
  const [menuState, menuToggle] = useState(false)

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

  const toggleMenu = () => {
    menuToggle(!menuState)
  }

  /* -------- AUTO PAGE TITLE LOGIC -------- */
  const getPageTitle = () => {
    if (title) return title // allow manual override

    const path = router.pathname.toLowerCase()

    if (path === "/") return settings.name
    if (path.includes("projects")) return "Projects"
    if (path.includes("about")) return "About Me"

    // fallback: use site name
    return settings.name
  }

  const pageTitle = getPageTitle()

  return (
    <nav id="Navbar" className={css.container}>
      <ul className={css.menu}>
        <li className={css.menuHeader}>

          {/* LEFT: Dynamic title pill */}
          <Link className={css.logo} href="/">
            {pageTitle}
          </Link>

          {/* RIGHT LINKS (desktop links if you add later) */}
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          </div>

          <button
            onClick={toggleMenu}
            className={css.mobileToggle}
            data-open={menuState}
          >
            <div>
              <span></span>
              <span></span>
            </div>
          </button>

        </li>

        {/* MOBILE MENU */}
        <li data-open={menuState} className={css.menuContent}>
          <ul>
            {content.map(({ url, title }, index) => (
              <li key={index}>
                <Link href={url}>{title}</Link>
              </li>
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
    </nav>
  )
}