import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'

import Preloader from '../components/layout/Preloader'
import DynamicWatermark from '../components/utils/DynamicWatermark'
import SetGridGap from '../components/utils/set.grid.util'
import Layout from '../components/layout/layout'
import { CustomCursor } from '../components/utils/MouseEffects'

import '../node_modules/the-new-css-reset/css/reset.css'

import '@fontsource/fira-code/400.css'
import '@fontsource/fira-code/600.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'

import '../node_modules/devicon/devicon.min.css'

import '../styles/css/variables.css'
import '../styles/css/global.css'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const isHome = router.pathname === '/'

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
      {isHome && <Preloader />}
      <CustomCursor />

      <Layout>
        <DynamicWatermark />
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={router.pathname}
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <Component {...pageProps} />
          </m.div>
        </AnimatePresence>
        <SetGridGap />
        <Analytics />
      </Layout>
    </LazyMotion>
  )
}