import { redirects } from '@/lib/redirects.mjs'

const to = (source) => redirects.find((r) => r.source === source && !r.has)?.destination

describe('redirects', () => {
  test('retired pages point at the closest section', () => {
    expect(to('/about')).toBe('/#profile')
    expect(to('/aboutme')).toBe('/#profile')
    expect(to('/projects')).toBe('/#work')
    expect(to('/projects/:slug*')).toBe('/#work')
    expect(to('/case-studies')).toBe('/#work')
    expect(to('/resume')).toBe('/#cv')
    expect(to('/articles')).toBe('/')
    expect(to('/download')).toBe('/')
    expect(to('/downloads/:file*')).toBe('/')
  })

  test('the LinkedIn shortcut uses the new profile URL', () => {
    expect(to('/linkedin')).toBe('https://www.linkedin.com/in/lakshya-badjatya/')
  })

  test('www consolidates to the bare domain', () => {
    const www = redirects.find((r) => r.has?.[0]?.value === 'www.sukhma.in')
    expect(www.destination).toBe('https://sukhma.in/:path*')
  })

  test('every redirect is permanent', () => {
    expect(redirects.every((r) => r.permanent === true)).toBe(true)
  })
})
