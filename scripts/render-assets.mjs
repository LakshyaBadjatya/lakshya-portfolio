// Renders files derived from the site into public/ (run `npm run assets`, which builds first):
//   form-still.png  the 3D form in its hero pose, transparent  <- /still
// Drives the installed Google Chrome through playwright-core.
import { spawn } from 'node:child_process'
import { chromium } from 'playwright-core'

const PORT = 3107
const BASE = `http://localhost:${PORT}`

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
