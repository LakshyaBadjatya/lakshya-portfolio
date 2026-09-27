import fs from 'node:fs'
import path from 'node:path'
import { profile } from '@/content/profile'
import { cvData, cvFingerprint } from '@/lib/cvFingerprint'

describe('CV fingerprint', () => {
  test('is stable for the same content', () => {
    expect(cvFingerprint(profile)).toMatch(/^[0-9a-f]{64}$/)
    expect(cvFingerprint(profile)).toBe(cvFingerprint(profile))
  })

  test('changes when CV content changes', () => {
    const edited = { ...profile, skills: [...profile.skills, 'Something new'] }
    expect(cvFingerprint(edited)).not.toBe(cvFingerprint(profile))
  })

  test('ignores site-only fields', () => {
    const edited = { ...profile, headline: 'A different hero line', quote: ['A different quote'] }
    expect(cvFingerprint(edited)).toBe(cvFingerprint(profile))
  })

  test('the CV carries no private details', () => {
    expect(JSON.stringify(cvData(profile))).not.toMatch(/\+?\d[\d\s-]{9,}\d|\b\d{1,2}[/.-]\d{1,2}[/.-](19|20)\d{2}\b|\b\d{6}\b/)
  })
})

describe('committed CV PDF', () => {
  test('was generated from the current content (run `npm run assets` if this fails)', () => {
    const stored = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'cv-fingerprint.json'), 'utf8'))
    expect(stored.fingerprint).toBe(cvFingerprint(profile))
    expect(fs.existsSync(path.join(process.cwd(), 'public', 'Lakshya-Badjatya-CV.pdf'))).toBe(true)
  })
})
