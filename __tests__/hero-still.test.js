import { renderToStaticMarkup } from 'react-dom/server'
import Hero from '@/components/site/Hero'

// The still of the 3D form is only shown on wide landscape screens
// (Tailwind's md:landscape). Phones must never request it.
const LANDSCAPE = '(min-width: 48rem) and (orientation: landscape)'

const html = renderToStaticMarkup(<Hero />)
const tags = (name) => html.match(new RegExp(`<${name}\\b[^>]*>`, 'g')) ?? []

describe('hero still', () => {
  test('the image is only offered through a wide-landscape source', () => {
    const sources = tags('source').filter((tag) => tag.includes('form-still'))
    expect(sources).toHaveLength(1)
    expect(sources[0]).toContain(`media="${LANDSCAPE}"`)
  })

  test('the fallback img never points at the still', () => {
    const [img] = tags('img')
    expect(img).toBeDefined()
    expect(img).not.toContain('form-still')
    expect(img).toMatch(/src="data:image\//)
  })

  test('no unconditional preload of the still', () => {
    const preloads = tags('link').filter((tag) => tag.includes('form-still'))
    expect(preloads).toEqual([])
  })
})
