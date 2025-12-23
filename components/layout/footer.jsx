import Container from '../structure/container'
import Icon from '../utils/icon.util'
import RateMe from "../utils/RateMe"

import css from '../../styles/structure/footer.module.scss'

import content from '../../content/footer.json'
import settings from '../../content/_settings.json'

export default function Footer() {

  return (
    <footer className={css.container}>
      <Container spacing={['verticalXXLrg', 'bottomLrg']}>

        {/* CENTERED SOCIAL SECTION */}
        <section className={css.sections}>
          <ul className={css.socialCenter}>
            <li><h4>Social</h4></li>
            <li className={css.socialList}>
              {
                content.social.map(({ url, icon }, index) => {
                  return (
                    <a
                      key={index}
                      href={url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Icon icon={['fab', icon]} />
                    </a>
                  )
                })
              }
            </li>
          </ul>
        </section>

        {/* SIMPLE GITHUB LINK (NO STATS) */}
        <section className={css.github}>
          <a
            href={settings.portfolio.repo_html}
            rel="noreferrer"
            target="_blank"
          >
            <h5>{settings.portfolio.forkthis}</h5>
          </a>
        </section>

        {/* ⭐ RATE ME SECTION */}
        <section className={css.rateMe}>
          <RateMe />
        </section>

      </Container>

      {/* BACKGROUND GRADIENT */}
      <canvas id="gradient-canvas" data-transition-in></canvas>
    </footer>
  )
}
