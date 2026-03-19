import { useState, useEffect } from 'react'
import { m } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'

import Section from '../../structure/section'
import Container from '../../structure/container'

import space from '../../utils/spacing.util'
import Icon from '../../utils/icon.util'
import { useMouseParallax } from '../../utils/MouseEffects'

import HeroBg from '../../blocks/hero.bg/bg-color-1'

import hero from '../../../styles/sections/index/hero.module.scss'
import button from '../../../styles/blocks/button.module.scss'

import content from '../../../content/index/hero.json'

export default function Hero() {

  const [typingStatus, setTypingStatus] = useState('Initializing')
  const [isMobile, setIsMobile] = useState(false)
  const parallax = useMouseParallax(15)

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    }
  }, [])

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + i * 0.15, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
    }),
  }

  return (
    <Section classProp={`${hero.section}`}>
      <Container spacing={'VerticalXXXL'}>

        {/* Typing animation with fade-in */}
        <m.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {!isMobile ? (
            <TypeAnimation
              className={`${hero.preHeader}`}
              sequence={[
                content.intro.startDelay,
                () => { setTypingStatus('typing') },
                content.intro.start,
                () => { setTypingStatus('typed') },
                content.intro.deleteDelay,
                () => { setTypingStatus('deleting') },
                content.intro.end,
                () => { setTypingStatus('deleted') },
                content.intro.restartDelay,
              ]}
              speed={content.intro.speed}
              deletionSpeed={content.intro.deletionSpeed}
              wrapper={content.intro.wrapper}
              repeat={Infinity}
            />
          ) : (
            <div className={hero.preHeader}>{content.intro.start}</div>
          )}
        </m.div>

        <section>
          <m.h1
            className={hero.header}
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            {content.header.name}
          </m.h1>

          <m.h1
            className={`${hero.header} ${hero.primaryDim}`}
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            {content.header.usp}
          </m.h1>
        </section>

        <m.section
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <p className={`${hero.primaryBright} subtitle ${space(["verticalLrg"])}`}>
            {content.paragraph}
          </p>
        </m.section>

        <m.section
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className={hero.buttons}
        >
          <m.button
            className={`button ${button.primary}`}
            onClick={() => window.location = 'mailto:lakshyabadjatya@gmail.com'}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {content.buttons.primary.title}
          </m.button>

          <m.button
            className={`button ${button.secondary} leaveSite`}
            onClick={() =>
              window.open("https://www.linkedin.com/in/lakshya-badjatya/", "_blank")
            }
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {content.buttons.secondary.title}
          </m.button>
        </m.section>

      </Container>

      {/* Background animation with mouse parallax */}
      <m.div style={{ x: parallax.x, y: parallax.y }} className={hero.heroBgParallax}>
        <HeroBg theme="bg-color-1" />
      </m.div>

    </Section>
  )
}
