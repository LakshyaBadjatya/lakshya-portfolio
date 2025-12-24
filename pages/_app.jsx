// Core packages
import { useEffect } from 'react'
import DynamicWatermark from '../components/utils/DynamicWatermark'
import Preloader from '../components/layout/Preloader'
import { Analytics } from '@vercel/analytics/react'
import { Analytics } from "@vercel/analytics/next"
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
    const disableRightClick = (e) => e.preventDefault()

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

  /* ===============================
     BLUR ON TAB / APP SWITCH
     =============================== */
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        document.body.classList.add('blurred')
      } else {
        document.body.classList.remove('blurred')
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () =>
      document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <Preloader />

      <Layout>
        {/* 🔒 Watermark always on top */}
        <DynamicWatermark />

        <Component {...pageProps} />

        <SetGridGap />
        <Analytics />
      </Layout>
    </LazyMotion>
  )
}
