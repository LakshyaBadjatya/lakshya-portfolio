import { m } from 'framer-motion'
import Container from '../structure/container'
import Icon from '../utils/icon.util'
import RateMe from "../utils/RateMe"
import { MagneticButton } from '../utils/MouseEffects'

import css from '../../styles/structure/footer.module.scss'
import content from '../../content/footer.json'

export default function Footer() {
  return (
    <footer className={css.container}>
      <Container spacing={['verticalXXLrg', 'bottomLrg']}>

        {/* CENTERED SOCIAL SECTION */}
        <section className={css.sections}>
          <ul className={css.socialCenter}>
            <li><h4>Social</h4></li>
            <li className={css.socialList}>
              {content.social.map(({ url, icon }, index) => (
                <MagneticButton key={index} strength={0.3}>
                  <m.a
                    href={url}
                    rel="noreferrer"
                    target="_blank"
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon icon={['fab', icon]} />
                  </m.a>
                </MagneticButton>
              ))}
            </li>
          </ul>
        </section>

        {/* COPYRIGHT */}
        <section className={css.copyright}>
          <h5>
            © Lakshya Badjatya {new Date().getFullYear()}
          </h5>
        </section>

        {/* RATE ME SECTION */}
        <section className={css.rateMe}>
          <RateMe />
        </section>

      </Container>

      {/* BACKGROUND GRADIENT */}
      <canvas id="gradient-canvas" data-transition-in></canvas>
    </footer>
  )
}
