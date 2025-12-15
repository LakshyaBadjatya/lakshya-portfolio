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
 * Section: Technical
 * Highlight technical skills and tools (student version)
 */
export default function Technical() {
  return (
    <Section classProp={`${about.section} borderBottom`}>
      <Container spacing={['verticalXXXLrg']}>
        <SectionTitle
          title="Technical Skills"
          preTitle="Skills"
          subTitle="The tools and technologies I am currently learning and using in my projects."
        />

        <section className={`${about.content} ${about.container}`}>
          <div className={about.copy}>
            <CopyBlock
              title="Learning foundations"
              icon={['fat', 'code']}
              copy="I am building a strong foundation in computer science through academics, self-learning, and hands-on projects. I enjoy understanding how things work, writing clean code, and gradually improving my technical and problem-solving skills."
              iconClass={about.icon}
              containerClass={about.container}
            />

            <BadgesBlock
              title="Tools & Software I use"
              copy="These are some of the tools and platforms I regularly use for learning, development, design, and productivity."
              list={software}
              block="software"
              fullContainer="fullContainer"
              icon="grid-2-plus"
              containerClass={about.container}
              headerIcon={about.icon}
            />

            <BadgesBlock
              title="Technologies I am learning"
              copy="I am actively learning and experimenting with these technologies through small projects, practice, and exploration."
              list={tech}
              block="tech"
              fullContainer="fullContainer"
              icon="laptop-code"
              containerClass={about.container}
              headerIcon={about.icon}
            />
          </div>

          <div className={`${about.image} ${about.technicalSvg}`}>
            <Image
              src="/img/dataism-24.svg"
              width={477}
              height={1111}
              alt="Abstract technical illustration"
            />
          </div>
        </section>
      </Container>
    </Section>
  )
}

/* SOFTWARE & TOOLS */
const software = [
  { key: 'vscode', name: 'VS Code', type: 'devicon' },
  { key: 'figma', name: 'Figma', type: 'devicon' },
  { key: 'git', name: 'Git', type: 'devicon' },
  { key: 'github', name: 'GitHub', type: 'devicon' },
  { key: 'postman', name: 'Postman', type: 'fas' },
  { key: 'unity', name: 'Unity', type: 'devicon' },
]

/* TECHNOLOGIES */
const tech = [
  { key: 'javascript', name: 'JavaScript', type: 'devicon' },
  { key: 'react', name: 'React', type: 'devicon' },
  { key: 'nextjs', name: 'Next.js', type: 'devicon' },
  { key: 'html5', name: 'HTML5', type: 'devicon' },
  { key: 'css3', name: 'CSS3', type: 'devicon' },
  { key: 'nodejs', name: 'Node.js (Basics)', type: 'devicon' },
]
