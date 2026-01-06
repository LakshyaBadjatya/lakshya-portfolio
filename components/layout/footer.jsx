import Container from '../structure/container'
import Icon from '../utils/icon.util'
import RateMe from "../utils/RateMe"
import GameDownloadCard from "../blocks/GameDownloadCard"


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
                <a
                  key={index}
                  href={url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icon icon={['fab', icon]} />
                </a>
              ))}
            </li>
          </ul>
        </section>

        {/* COPYRIGHT (NO LINK, DYNAMIC YEAR) */}
        <section className={css.copyright}>
          <h5>
            © Lakshya Badjatya {new Date().getFullYear()}
          </h5>
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
