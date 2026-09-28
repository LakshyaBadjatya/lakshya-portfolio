import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'

// Every text file the repository publishes (tests are skipped: they hold these patterns).
const root = path.join(__dirname, '..')
const published = execFileSync('git', ['ls-files', '-z'], { cwd: root })
  .toString()
  .split('\0')
  .filter((f) => f && !f.startsWith('__tests__/') && f !== 'package-lock.json')
  .map((f) => ({ f, buf: readFileSync(path.join(root, f)) }))
  .filter(({ buf }) => !buf.subarray(0, 8000).includes(0))
  .map(({ f, buf }) => ({ f, text: buf.toString('utf8') }))

const offenders = (pattern) => published.filter(({ text }) => pattern.test(text)).map(({ f }) => f)

describe('published files', () => {
  test('no university-application wording', () => {
    expect(offenders(/applicant|admission|fall 2027|study(ing)? abroad|universit/i)).toEqual([])
  })

  test('no AI-workflow traces or attribution', () => {
    expect(offenders(/co-authored-by|generated with \[?claude|claude\.md|agents\.md|superpowers|agentic|\.remember\b/i)).toEqual([])
  })
})
