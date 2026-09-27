import { profile } from '@/content/profile'

const ORG_ID = 'https://www.samtechnos.com/#organization'
const PERSON_ID = 'https://sukhma.in/#lakshya'
const KOTA = { '@type': 'PostalAddress', addressLocality: 'Kota', addressRegion: 'Rajasthan', addressCountry: 'IN' }

/** JSON-LD @graph for the root layout: Person + Organization + WebSite. */
export function buildSchema(p = profile) {
  const [cto] = p.experience
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: p.name,
        url: p.url,
        image: `${p.url}${p.portrait.src}`,
        email: `mailto:${p.email}`,
        jobTitle: cto.role,
        worksFor: { '@id': ORG_ID },
        address: KOTA,
        knowsLanguage: p.languages.map((l) => l.name),
        sameAs: p.links.map((l) => l.href),
      },
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: cto.org,
        url: cto.orgHref,
        foundingDate: '2026',
        address: KOTA,
        founder: { '@id': PERSON_ID },
      },
      {
        '@type': 'WebSite',
        '@id': `${p.url}/#website`,
        url: p.url,
        name: `${p.name} — Portfolio`,
        publisher: { '@id': PERSON_ID },
        inLanguage: 'en',
      },
    ],
  }
}

/** Serialised for <script type="application/ld+json">, so no value can close the tag. */
export function schemaJson(p = profile) {
  return JSON.stringify(buildSchema(p)).replace(/</g, '\\u003c')
}
