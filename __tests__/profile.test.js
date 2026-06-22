import { profile } from '@/content/profile'

describe('profile content integrity (spec: Content Inventory)', () => {
  test('identity', () => {
    expect(profile.name).toBe('Lakshya Badjatya')
    expect(profile.email).toBe('lakshyabadjatya@gmail.com')
    expect(profile.phone).toBe('+91 8619690342')
    expect(profile.location).toMatch(/Kota/)
    expect(profile.roles.length).toBeGreaterThanOrEqual(3)
  })

  test('socials cover all four platforms', () => {
    const hrefs = profile.socials.map((s) => s.href).join(' ')
    for (const part of ['github.com/LakshyaBadjatya', 'linkedin.com', 'medium.com/@lakshyabadjatya', 'dev.to/lakshyabadjatya']) {
      expect(hrefs).toContain(part)
    }
  })

  test('timeline has the 5 canonical events ending at 2027', () => {
    expect(profile.timeline).toHaveLength(5)
    expect(profile.timeline[0].year).toBe('2020')
    expect(profile.timeline.at(-1).year).toBe('2027')
  })

  test('every project has full, well-formed data + immersive media', () => {
    expect(Array.isArray(profile.projects)).toBe(true)
    for (const p of profile.projects) {
      expect(p.id).toBeTruthy()
      expect(p.summary.length).toBeGreaterThan(20)
      expect(p.bullets.length).toBeGreaterThanOrEqual(2)
      expect(p.stack.length).toBeGreaterThanOrEqual(2)
      expect(p.links.length).toBeGreaterThanOrEqual(1)
      expect(p.accent).toMatch(/^#/)
      // immersive showcase fields
      expect(p.form).toBeTruthy()
      expect(p.cover).toMatch(/^\/projects\//)
      expect(p.media.length).toBeGreaterThanOrEqual(1)
      for (const m of p.media) {
        expect(m.src).toMatch(/^\/projects\//)
        expect(m.alt.length).toBeGreaterThan(3)
        expect(m.w).toBeGreaterThan(0)
        expect(m.h).toBeGreaterThan(0)
      }
    }
  })

  test('6 skill categories preserved', () => {
    expect(profile.skills).toHaveLength(6)
    const all = profile.skills.flatMap((s) => s.tags)
    for (const tag of ['Dart', 'Flutter', 'React', 'Next.js', 'Firebase Auth', 'Unity Engine', 'Codemagic CI/CD']) {
      expect(all).toContain(tag)
    }
  })

  test('narrative pieces exist', () => {
    expect(profile.objective).toMatch(/7\+/)
    expect(profile.education.detail).toMatch(/PCM/)
    expect(profile.vision).toMatch(/startup/i)
    expect(profile.stats.length).toBe(4)
    expect(profile.extras).toHaveLength(3)
    expect(profile.story.panels).toHaveLength(3)
    expect(profile.about.cards.length).toBeGreaterThanOrEqual(5)
  })
})
