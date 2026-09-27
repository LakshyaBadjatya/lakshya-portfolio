import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import manifest from '@/app/manifest'

describe('SEO routes', () => {
  test('robots allows the site but hides the internal pages', () => {
    const r = robots()
    expect(r.rules.allow).toBe('/')
    expect(r.rules.disallow).toEqual(['/og', '/still', '/cv/print'])
    expect(r.sitemap).toBe('https://sukhma.in/sitemap.xml')
  })

  test('the sitemap lists only the home page', () => {
    expect(sitemap().map((entry) => entry.url)).toEqual(['https://sukhma.in/'])
  })

  test('the manifest uses the paper colour and no application wording', () => {
    const m = manifest()
    expect(m.theme_color).toBe('#f2eee6')
    expect(JSON.stringify(m)).not.toMatch(/applicant|applying|fall 2027/i)
  })
})
