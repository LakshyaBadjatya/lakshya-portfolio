// Core packages
import Image from 'next/image'

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

/**
 * Section: About
 * Student-focused overview
 */
export default function About() {
  return (
    <Section classProp={about.section}>
      <Container spacing={['verticalXXXLrg']}>
        <SectionTitle
          title="About Me"
          preTitle="Introduction"
          subTitle="A brief overview of who I am, what I am learning, and what motivates me in computer science."
        />

        <section className={about.content}>
          <div className={about.image}>
            <img src="/img/profile-photo.webp" alt="Lakshay Badjatya" />
          </div>

          <div className={about.copy}>
            <CopyBlock
              title="Who I am"
              containerClass={about.container}
              iconClass={about.icon}
              icon={['fat', 'user']}
              copy="I am a Class 11 PCM student from India with a strong interest in computer science and technology. I enjoy understanding how software works, building small projects, and continuously improving my skills through practice and exploration."
            />

            <CopyBlock
              title="How I work & learn"
              containerClass={about.container}
              iconClass={about.icon}
              icon={['fat', 'brain']}
              copy="I believe in learning by doing. I spend time experimenting with code, building projects, solving problems, and reflecting on what I can improve. Alongside academics, I focus on developing consistency, discipline, and a growth mindset."
            />

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
