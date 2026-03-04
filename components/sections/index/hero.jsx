import { useState, useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation'

import Section from '../../structure/section'
import Container from '../../structure/container'

import space from '../../utils/spacing.util'

import Icon from '../../utils/icon.util'

import HeroBg from '../../blocks/hero.bg/bg-color-1'

import hero from '../../../styles/sections/index/hero.module.scss'
import button from '../../../styles/blocks/button.module.scss'

import content from '../../../content/index/hero.json'

export default function Hero() {

  const [typingStatus, setTypingStatus] = useState('Initializing')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    }
  }, [])

  return (
    <Section classProp={`${hero.section}`}>
      <Container spacing={'VerticalXXXL'}>

        {/* Typing animation (disabled on mobile for performance) */}
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

        <section>
          <h1 className={hero.header}>
            {content.header.name}
          </h1>

          <h1 className={`${hero.header} ${hero.primaryDim}`}>
            {content.header.usp}
          </h1>
        </section>

        <section>
          <p className={`${hero.primaryBright} subtitle ${space(["verticalLrg"])}`}>
            {content.paragraph}
          </p>
        </section>

        <section>
          <button
            className={`button ${button.primary}`}
            onClick={() => window.location = 'mailto:lakshyabadjatya@gmail.com'}
          >
            {content.buttons.primary.title}
          </button>

          <button
            className={`button ${button.secondary} leaveSite`}
            onClick={() =>
              window.open("https://www.linkedin.com/in/lakshya-badjatya/", "_blank")
            }
          >
            {content.buttons.secondary.title}
          </button>
        </section>

      </Container>

      {/* Background animation */}
      <HeroBg theme="bg-color-1" />

    </Section>
  )
}