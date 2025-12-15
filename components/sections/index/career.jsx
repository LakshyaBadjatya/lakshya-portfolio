// Core packages
import Image from 'next/image'

import Badges from '../../utils/badge.list.util'

// Section structure
import Section from '../../structure/section'
import Container from '../../structure/container'

// Section general blocks
import SectionTitle from '../../blocks/section.title.block'

// Career scss
import career from '../../../styles/sections/index/career.module.scss'

/**
 * Section: Learning & Projects
 */
export default function Career() {
  return (
    <Section classProp={`${career.section} borderBottom`}>
      <Container spacing={['verticalXXXLrg']}>
        <SectionTitle
          title="Learning & Projects"
          preTitle="Journey"
          subTitle="My journey in computer science through academics, self-learning, and hands-on projects."
        />

        <section className={career.area}>
          {/* ABOUT ME */}
          <article className={career.company}>
            <div className={career.companyContent}>
              <span className={career.companyHeader}>
                <h3>Student & Aspiring Computer Scientist</h3>
                <h4>Class 11 · PCM</h4>
                <h4>2025 – Present</h4>
                <h5>India</h5>
              </span>
              <p>
                I am a Class 11 PCM student with a strong interest in computer science and software
                development. I enjoy learning programming, building projects, and experimenting with
                modern technologies. My focus is on developing strong fundamentals while preparing
                for competitive exams and future global opportunities.
              </p>
            </div>
            <div className={career.companyAlt}></div>
          </article>

          {/* PROJECTS & LEARNING */}
          <article className={career.companyPositions}>
            <div className={career.position}>
              <div className={career.positionContent}>
                <span className={career.positionHeader}>
                  <h3>Projects & Learning Focus</h3>
                  <h4>2025 – Present</h4>
                </span>
                <p>
                  I actively work on small projects to apply what I learn. These include building
                  web applications using React and Next.js, experimenting with front-end design,
                  and developing simple games using Unity. Through these projects, I am improving
                  my problem-solving skills and understanding of real-world development workflows.
                </p>
                <ul className={career.list}>
                  <li>Personal portfolio website built with Next.js</li>
                  <li>Basic web apps using JavaScript and React</li>
                  <li>2D game projects developed using Unity</li>
                  <li>Version control and collaboration using Git & GitHub</li>
                </ul>

                <Badges list={learningStack} block="stack" fullContainer="fullContainer" />
              </div>
              <div className={career.positionAlt}></div>
            </div>
          </article>
        </section>
      </Container>
    </Section>
  )
}

/* TECHNOLOGIES I AM LEARNING */
const learningStack = [
  { key: 'javascript', name: 'JavaScript', type: 'devicon' },
  { key: 'react', name: 'React', type: 'devicon' },
  { key: 'nextjs', name: 'Next.js', type: 'devicon' },
  { key: 'html5', name: 'HTML5', type: 'devicon' },
  { key: 'css3', name: 'CSS3', type: 'devicon' },
  { key: 'git', name: 'Git', type: 'devicon' },
  { key: 'github', name: 'GitHub', type: 'devicon' },
  { key: 'unity', name: 'Unity', type: 'devicon' },
]
