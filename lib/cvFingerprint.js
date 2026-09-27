import { createHash } from 'node:crypto'

/** The parts of the profile that appear on the CV PDF. */
export function cvData(p) {
  return {
    name: p.name,
    role: p.role,
    location: p.location,
    email: p.email,
    url: p.url,
    portrait: p.portrait.src,
    links: p.links,
    about: p.about,
    work: p.work.map(({ id, name, tagline, lines, links }) => ({ id, name, tagline, lines, links })),
    experience: p.experience,
    education: p.education,
    certificates: p.certificates,
    skills: p.skills,
    languages: p.languages,
  }
}

/** SHA-256 of the CV content. `npm run assets` stores it beside the PDF. */
export function cvFingerprint(p) {
  return createHash('sha256').update(JSON.stringify(cvData(p))).digest('hex')
}
