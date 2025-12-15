import Section from '../../structure/section'
import Container from '../../structure/container'

import Image from 'next/image'
import SectionTitle from '../../blocks/section.title.block'

import Icon from '../../utils/icon.util'

import css from '../../../styles/sections/articles/recent.module.scss'

export default function Recent({ mediumArticles }) {
  const feed = mediumArticles?.feed || {}
  const articles = mediumArticles?.items || []

  return (
    <Section classProp="borderBottom">
      <Container spacing={'verticalXXXXLrg'}>
        <SectionTitle
          title="Writing & Learnings"
          preTitle="Insights"
          subTitle="Notes, reflections, and learnings from my journey in computer science and technology."
        />

        <section className={css.projects}>
          {/* FALLBACK IF NO ARTICLES */}
          {articles.length === 0 && (
            <p style={{ opacity: 0.7, maxWidth: '600px' }}>
              I plan to share my learnings, project breakdowns, and thoughts on
              computer science and development here as I continue learning and
              building.
            </p>
          )}

          {/* ARTICLES LIST */}
          {articles.map(
            ({ title, pubDate, link, thumbnail, categories }, index) => {
              const date = new Date(pubDate).toDateString()

              return (
                <article key={index} className={css.project}>
                  <span className={css.featuredImage}>
                    {thumbnail ? (
                      <img src={thumbnail} alt="Article thumbnail" />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '180px',
                          background: '#111',
                        }}
                      />
                    )}
                  </span>

                  <span className={css.header}>
                    <a href={link} rel="noreferrer" target="_blank">
                      {title}{' '}
                      <Icon
                        icon={['fad', 'arrow-up-right-from-square']}
                      />
                    </a>
                  </span>

                  <span className={css.details}>
                    <p>By Lakshay Badjatya</p>
                    <p className={css.pushedAt}>{date}</p>
                  </span>

                  <span className={css.topicsContainer}>
                    {categories &&
                      categories.map((topic, i) => (
                        <span key={i} className={css.topics}>
                          <Icon icon={['fab', 'medium']} /> {topic}
                        </span>
                      ))}
                  </span>
                </article>
              )
            }
          )}
        </section>
      </Container>
    </Section>
  )
}
