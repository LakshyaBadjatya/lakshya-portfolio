import { readFileSync } from 'node:fs'
import path from 'node:path'

// Unlayered CSS beats every Tailwind utility, so component classes must live in a layer.
// (An unlayered `.link { position: relative }` once overrode `absolute` on the hero's scroll link.)
test('.link is a component class, so utilities such as `absolute` can override it', () => {
  const css = readFileSync(path.join(__dirname, '..', 'app', 'globals.css'), 'utf8')
  const components = css.match(/@layer components \{([\s\S]*?)\n\}/)?.[1] ?? ''
  expect(components).toMatch(/\.link \{/)
  expect(components).toMatch(/\.link::after \{/)
})
