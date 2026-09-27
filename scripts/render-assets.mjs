// Renders files derived from content/profile.js and the 3D form into public/
// (run `npm run assets`, which builds first):
//   Lakshya-Badjatya-CV.pdf + cv-fingerprint.json   <- /cv/print
//   og-image.png (1200×630 share card)              <- /og
//   form-still.png (the 3D form, transparent)       <- /still
// Drives the installed Google Chrome through playwright-core.
import { spawn } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-core'

const PORT = 3107
const BASE = `http://localhost:${PORT}`
const A4_HEIGHT_PX = 1123 // 297mm at 96dpi

function startServer() {
  const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT)], {
    stdio: ['ignore', 'pipe', 'inherit'],
  })
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('next start was not ready within 60s')), 60_000)
    server.stdout.on('data', (chunk) => {
      if (/Ready|Local:/.test(String(chunk))) {
        clearTimeout(timer)
        resolve(server)
      }
    })
    server.once('exit', (code) => {
      clearTimeout(timer)
      reject(new Error(`next start exited with code ${code}`))
    })
  })
}

async function renderCv(browser) {
  const page = await browser.newPage()
  await page.goto(`${BASE}/cv/print`, { waitUntil: 'networkidle' })
  await page.emulateMedia({ media: 'print' })
  await page.evaluate(() => document.fonts.ready)
  const height = await page.locator('.cv-page').evaluate((el) => el.getBoundingClientRect().height)
  if (height > A4_HEIGHT_PX + 1) {
    throw new Error(`The CV must fit one A4 page; it is ${Math.round(height)}px tall (max ${A4_HEIGHT_PX}px).`)
  }
  const pdf = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true })
  await writeFile('public/Lakshya-Badjatya-CV.pdf', pdf)
  const fingerprint = await page.locator('meta[name="cv-fingerprint"]').getAttribute('content')
  await writeFile('public/cv-fingerprint.json', `${JSON.stringify({ fingerprint }, null, 2)}\n`)
  console.log('✓ public/Lakshya-Badjatya-CV.pdf (one A4 page) + public/cv-fingerprint.json')
}

async function renderOg(browser) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  await page.goto(`${BASE}/og`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.locator('#og').screenshot({ path: 'public/og-image.png' })
  console.log('✓ public/og-image.png')
}

async function renderStill(browser) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 1200 } })
  await page.goto(`${BASE}/still`, { waitUntil: 'networkidle' })
  await page.waitForFunction(() => window.__formReady === true, null, { timeout: 30_000 })
  await page.waitForTimeout(800)
  await page.locator('#still').screenshot({ path: 'public/form-still.png', omitBackground: true })
  console.log('✓ public/form-still.png')
}

async function main() {
  const server = await startServer()
  const browser = await chromium.launch({
    channel: 'chrome',
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  })
  try {
    await renderCv(browser)
    await renderOg(browser)
    await renderStill(browser)
  } finally {
    await browser.close()
    server.kill('SIGTERM')
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
