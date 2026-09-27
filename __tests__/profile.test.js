import { profile } from '@/content/profile'

const TOOL_NAMES =
  /\b(flutter|firebase|firestore|react|next\.?js|dart|supabase|sqlite|node\.?js|typescript|javascript|tailwind|gsap|aws|vercel|riverpod|unity)\b/i
const BANNED = /applicant|fall 2027|study(ing)? abroad|\bapk\b|puzzle cam|flappy|preparing for ielts/i

const bioAndWork = () =>
  JSON.stringify([profile.headline, profile.about, profile.quote, profile.work, profile.experience])

describe('profile content', () => {
  test('identity and contact', () => {
    expect(profile.name).toBe('Lakshya Badjatya')
    expect(profile.nameLines.join(' ')).toBe(profile.name)
    expect(profile.role).toBe('Co-Founder & CTO, Sammed Technosol')
    expect(profile.email).toBe('lakshyabadjatya@gmail.com')
    expect(profile.url).toBe('https://sukhma.in')
    expect(profile.links.map((l) => l.label)).toEqual(['LinkedIn', 'GitHub', 'Medium', 'Dev.to'])
    expect(profile.links[0].href).toBe('https://www.linkedin.com/in/lakshya-badjatya/')
  })

  test('exactly two projects, SamLab then Sammed Technosol', () => {
    expect(profile.work.map((w) => w.id)).toEqual(['samlab', 'sammed'])
    for (const w of profile.work) {
      expect(w.tagline.length).toBeGreaterThan(10)
      expect(w.lines.length).toBeGreaterThanOrEqual(3)
      expect(w.lines.length).toBeLessThanOrEqual(4)
      for (const link of w.links) expect(link.href).toMatch(/^https:\/\//)
    }
  })

  test('copy stays short: a portfolio, not a descriptive site', () => {
    expect(profile.about.split(/(?<=[.!?])\s+/).length).toBeLessThanOrEqual(3)
    for (const w of profile.work) for (const line of w.lines) expect(line.length).toBeLessThanOrEqual(120)
  })

  test('no tool or backend names in work, experience or bio text', () => {
    expect(bioAndWork()).not.toMatch(TOOL_NAMES)
  })

  test('no application wording, downloads or old projects anywhere', () => {
    expect(JSON.stringify(profile)).not.toMatch(BANNED)
  })

  test('IELTS appears only in the languages entry', () => {
    const { languages, ...rest } = profile
    expect(JSON.stringify(rest)).not.toMatch(/ielts/i)
    expect(languages.find((l) => l.name === 'English').level).toBe('C1 (IELTS Academic 7.0)')
  })

  test('no private details: phone, address or birth date', () => {
    expect(JSON.stringify(profile)).not.toMatch(/\+?\d[\d\s-]{9,}\d|\b\d{1,2}[/.-]\d{1,2}[/.-](19|20)\d{2}\b|\b\d{6}\b/)
  })

  test('CV sections are complete', () => {
    expect(profile.experience[0]).toMatchObject({
      role: 'Co-Founder & CTO',
      org: 'Sammed Technosol',
      period: 'June 2026 – present',
    })
    expect(profile.education[0].school).toBe('Disha Delphi Public School')
    expect(profile.certificates).toHaveLength(3)
    for (const c of profile.certificates) expect(c.href).toMatch(/^(https:\/\/|\/certificates\/)/)
    expect(profile.skills.length).toBeGreaterThanOrEqual(5)
    expect(profile.skills.join(' ')).not.toMatch(/firebase|firestore|supabase|aws/i)
  })
})
