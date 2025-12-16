// Core packages
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
}
