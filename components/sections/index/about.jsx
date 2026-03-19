// Core packages
import Image from 'next/image'
import { m } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Section structure
import Section from '../../structure/section'
import Container from '../../structure/container'

// Section general blocks
import SectionTitle from '../../blocks/section.title.block'

// Section specific blocks
import BadgesBlock from '../../blocks/about.badges.block'
import CopyBlock from '../../blocks/about.copy.block'

// Section scss
import about from '../../../styles/sections/index/about.module.scss'

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
    }),
  }

  return (
    <Section classProp={about.section}>
      <Container spacing={['verticalXXXLrg']}>
        <SectionTitle
          title="About Me"
          preTitle="Introduction"
          subTitle="A brief overview of who I am, what I am learning, and what motivates me in computer science."
        />

        <section className={about.content} ref={ref}>
          <m.div
            className={about.image}
            custom={0}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
          >
            <img src="/img/profile-photo.webp" alt="Lakshya Badjatya" />
          </m.div>

          <div className={about.copy}>
            <m.div
              custom={1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
            >
              <CopyBlock
                title="Who I am"
                containerClass={about.container}
                iconClass={about.icon}
                icon={['fat', 'user']}
                copy="I am a Class 12 PCM student from India with a strong interest in computer science and technology. I enjoy understanding how software works, building small projects, and continuously improving my skills through practice and exploration."
              />
            </m.div>

            <m.div
              custom={2}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
            >
              <CopyBlock
                title="How I work & learn"
                containerClass={about.container}
                iconClass={about.icon}
                icon={['fat', 'brain']}
                copy="I believe in learning by doing. I spend time experimenting with code, building projects, solving problems, and reflecting on what I can improve. Alongside academics, I focus on developing consistency, discipline, and a growth mindset."
              />
            </m.div>

            <m.div
              custom={3}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
            >
              <BadgesBlock
                title="Interests & Focus Areas"
                containerClass={about.container}
                list={methods}
                fullContainer="fullContainer"
                block="methods"
                icon="fingerprint"
                copy="These are some of the areas I am currently exploring and developing interest in as I grow in computer science."
                headerIcon={`${about.icon}`}
              />
            </m.div>
          </div>
        </section>
      </Container>
    </Section>
  )
}

/* INTERESTS & FOCUS AREAS */
const methods = [
  { key: 'code', name: 'Programming Fundamentals', type: 'fas' },
  { key: 'laptop-code', name: 'Web Development', type: 'fas' },
  { key: 'gamepad', name: 'Game Development', type: 'fas' },
  { key: 'brain', name: 'Problem Solving', type: 'fas' },
  { key: 'graduation-cap', name: 'Academic Growth', type: 'fas' },
  { key: 'globe', name: 'Global Education Goals', type: 'fas' },
]
