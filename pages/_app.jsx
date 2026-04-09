import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import Lenis from 'lenis'


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

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    filter: 'blur(8px)',
  },
}

const pageTransition = {
  duration: 0.5,
  ease: [0.25, 0.4, 0.25, 1],
}

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

  // Smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
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
      <CustomCursor />

      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={router.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
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
