import { m } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import FeaturedProject from '../../blocks/projects/featured'

// Section structure
import Section from '../../structure/section'
import Container from '../../structure/container'
import SectionTitle from '../../blocks/section.title.block'

import css from '../../../styles/sections/projects/featured.module.scss'
import content from '../../../content/projects/featured.json'

export default function FeaturedProjects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <Section classProp={css.hasBg}>
      <Container spacing={'verticalXXXXLrg'}>
        <SectionTitle
          title="Featured Projects"
          preTitle="Student Projects"
          subTitle="Projects I've built while learning computer science and development."
        />

        <div ref={ref}>
          {content.map((data, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.75,
                delay: index * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <FeaturedProject content={data} index={index} />
            </m.div>
          ))}
        </div>
      </Container>

      <div className={css.bgContainer}>
        <span className={css.orbitalBg}>
          <span className={css.bgSection}>
            <span className={`${css.bgInner} ${css.heroLeft} ${css.heroOrbital}`}></span>
          </span>

          <span className={css.bgSection}>
            <span className={`${css.bgInner} ${css.heroCenter}`}></span>
          </span>

          <span className={css.bgSection}>
            <span className={`${css.bgInner} ${css.heroRight} ${css.heroOrbital}`}></span>
          </span>
        </span>

        <span className={css.afterGlowBg}></span>
      </div>
    </Section>
  )
}
