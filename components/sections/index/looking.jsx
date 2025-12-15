// Section structure
import Section from '../../structure/section'
import Container from '../../structure/container'

// Section general blocks
import SectionTitle from '../../blocks/section.title.block'

// Section scss
import looking from '../../../styles/sections/index/looking.module.scss'
import section from '../../../styles/blocks/section.title.module.scss'

/**
 * Section: Looking
 * Declare learning & opportunity interests 🚀
 */
export default function Looking() {
  return (
    <Section classProp={`${looking.section} borderBottom`}>
      <Container
        classProp={`${section.title} ${looking.container}`}
        spacing={['verticalXXXLrg']}
      >
        <h4>I&apos;m currently open to learning opportunities.</h4>

        <h2 className={looking.json}>Student : &#123;</h2>
        <h2 className={looking.jsonSub}>
          <span className={looking.highlight}>Aspiring Computer Scientist</span>,
        </h2>
        <h2 className={looking.jsonSub}>
          <span className={looking.highlight2}>Developer in Progress</span>
        </h2>
        <h2 className={looking.json}>&#125;</h2>

        <h4>
          I am interested in learning-focused opportunities, personal projects,
          and experiences that help me grow in computer science, software
          development, and problem-solving.
        </h4>
      </Container>
    </Section>
  )
}
