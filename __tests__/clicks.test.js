import { isPlainLeftClick } from '@/lib/clicks'

const click = (over = {}) => ({
  button: 0,
  metaKey: false,
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
  defaultPrevented: false,
  ...over,
})

describe('isPlainLeftClick', () => {
  test('a plain left click glides to the section', () => {
    expect(isPlainLeftClick(click())).toBe(true)
  })

  test.each(['metaKey', 'ctrlKey', 'shiftKey', 'altKey'])('%s keeps the browser default (new tab or window)', (key) => {
    expect(isPlainLeftClick(click({ [key]: true }))).toBe(false)
  })

  test('middle and right buttons keep the browser default', () => {
    expect(isPlainLeftClick(click({ button: 1 }))).toBe(false)
    expect(isPlainLeftClick(click({ button: 2 }))).toBe(false)
  })

  test('a click another handler already took is left alone', () => {
    expect(isPlainLeftClick(click({ defaultPrevented: true }))).toBe(false)
  })
})
