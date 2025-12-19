// Core packages
import Watermark from '../components/utils/Watermark'
import { useEffect } from 'react'
import Preloader from '../components/layout/Preloader'
import { Analytics } from '@vercel/analytics/react'
import { LazyMotion, domAnimation } from 'framer-motion'

// Utils
import SetGridGap from '../components/utils/set.grid.util'

// Structure
import Layout from '../components/layout/layout'

// CSS reset
import '../node_modules/the-new-css-reset/css/reset.css'

// Fonts
import '@fontsource/fira-code/400.css'
import '@fontsource/fira-code/600.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'

// Devicon
import '../node_modules/devicon/devicon.min.css'

// Global CSS
import '../styles/css/variables.css'
import '../styles/css/global.css'

/**
 * _app.jsx
 */
export default function MyApp({ Component, pageProps }) {

  /* ===============================
     BASIC CONTENT PROTECTION
     =============================== */
  useEffect(() => {
    // Disable right-click
    const disableRightClick = (e) => e.preventDefault()

    // Disable common dev / copy shortcuts
    const disableKeys = (e) => {
      if (
        (e.ctrlKey && ['c', 'u', 's', 'p'].includes(e.key.toLowerCase())) ||
        e.key === 'F12'
      ) {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', disableRightClick)
    document.addEventListener('keydown', disableKeys)

    return () => {
      document.removeEventListener('contextmenu', disableRightClick)
      document.removeEventListener('keydown', disableKeys)
    }
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      {/* 🔥 PRELOADER MUST BE ABOVE LAYOUT */}
      <Preloader />

      <Layout>
        <Component {...pageProps} />
        <SetGridGap />
        <Analytics />
      </Layout>
    </LazyMotion>
  )

  useEffect(() => {
  const blockTouch = (e) => {
    if (e.touches && e.touches.length > 1) {
      e.preventDefault()
    }
  }

  document.addEventListener('touchstart', blockTouch, { passive: false })
  document.addEventListener('touchend', blockTouch, { passive: false })

  return () => {
    document.removeEventListener('touchstart', blockTouch)
    document.removeEventListener('touchend', blockTouch)
  }
}, [])

}
