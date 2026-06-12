# "Voyage" 3D Immersive Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild sukhma.in as a deep-space 3D scroll-journey portfolio (React Three Fiber homepage + classic themed About/Projects/Resume subpages) that impresses college admissions reviewers while preserving all of Lakshya's content.

**Architecture:** Fresh Next.js App Router codebase. The homepage renders one fixed, pointer-transparent WebGL canvas behind normal-flow DOM sections; Lenis publishes scroll progress (0→1) into a module-level mutable `scrollState`, which a camera rig reads every frame to fly a waypoint path through 7 "chapters" placed along −Z. DOM chapter sections get their heights from the same shared chapter config, keeping 3D and DOM in sync. Adaptive quality tiers (0 = static fallback, 1 = reduced, 2 = full) gate particle counts and postprocessing.

**Tech Stack:** Next.js 15 (App Router), React 19, three + @react-three/fiber 9 + drei 10 + @react-three/postprocessing, Lenis, Framer Motion 12, Tailwind CSS v4, Jest (via next/jest) for pure-logic tests, Playwright MCP for visual verification.

**Spec:** `docs/superpowers/specs/2026-06-12-3d-immersive-redesign-design.md` — the Content Inventory there is the canonical list of knowledge that must survive.

**Conventions used below:**
- All paths are relative to repo root `d:\VS code projects\My Portfolio\portfolio`.
- Shell commands are PowerShell-compatible (Windows).
- `@/` is a path alias to repo root (configured in Task 1).
- Visual checks use the Playwright MCP tools (`browser_navigate`, `browser_take_screenshot`, `browser_resize`, `browser_evaluate`, `browser_console_messages`); load them with ToolSearch first.

---

### Task 1: Branch, clean slate, and buildable App Router scaffold

**Files:**
- Delete: `pages/`, `components/`, `styles/`, `content/` (old JSONs), `public/js/`, `.eslintrc.json` (recreated), `jest.config.js` (recreated), `next.config.js` (if present)
- Create: `package.json` (rewrite), `next.config.mjs`, `postcss.config.mjs`, `jsconfig.json`, `.eslintrc.json`, `jest.config.js`, `app/layout.jsx`, `app/globals.css`, `app/page.jsx` (placeholder), `app/about/page.jsx` (placeholder), `app/projects/page.jsx` (placeholder), `app/resume/page.jsx` (placeholder)

- [ ] **Step 1: Create the feature branch**

```powershell
git checkout -b redesign/voyage
```

- [ ] **Step 2: Delete the old app code (keep public assets)**

```powershell
git rm -r -q pages components styles content public/js .eslintrc.json jest.config.js
if (Test-Path next.config.js) { git rm -q next.config.js }
```

Keep untouched: `public/downloads/Flappy.apk`, `public/img/profile-photo.webp`, `public/og-image.png`, `public/favicon/*`, `public/quotes.txt`. (Other legacy `public` assets are removed later in Task 15, after nothing references them.)

- [ ] **Step 3: Rewrite `package.json` (scripts only; installs fill dependencies)**

```json
{
  "name": "voyage-portfolio",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest"
  }
}
```

- [ ] **Step 4: Clean install the new stack**

```powershell
Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue
npm install next@latest react@latest react-dom@latest three@latest @react-three/fiber@latest @react-three/drei@latest @react-three/postprocessing@latest lenis@latest framer-motion@latest @vercel/analytics@latest
npm install -D tailwindcss@latest @tailwindcss/postcss@latest jest@latest eslint@8.57.0 eslint-config-next@latest
```

If npm fails with ERESOLVE on the eslint pairing, retry the dev-dependency install with `--legacy-peer-deps`.

- [ ] **Step 5: Create config files**

`next.config.mjs`:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/aboutme', destination: '/about', permanent: true },
      { source: '/articles', destination: '/', permanent: true },
      { source: '/case-studies', destination: '/', permanent: true },
      { source: '/download', destination: '/projects', permanent: true },
      { source: '/projects/flappy-bird', destination: '/projects', permanent: true },
    ]
  },
}

export default nextConfig
```

`postcss.config.mjs`:
```js
export default { plugins: { '@tailwindcss/postcss': {} } }
```

`jsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  }
}
```

`.eslintrc.json`:
```json
{ "extends": "next/core-web-vitals" }
```

`jest.config.js`:
```js
const nextJest = require('next/jest')
const createJestConfig = nextJest({ dir: './' })
module.exports = createJestConfig({ testEnvironment: 'node' })
```

- [ ] **Step 6: Create `app/globals.css`** (theme tokens, glass/gradient utilities, print rules)

```css
@import "tailwindcss";

@theme {
  --color-void: #050510;
  --color-space: #0b0b22;
  --color-star: #e8ecff;
  --color-cyan: #6ee7ff;
  --color-violet: #a78bfa;
  --color-magenta: #f472b6;
  --color-dim: #8b93b8;
  --font-display: var(--font-space-grotesk), sans-serif;
  --font-body: var(--font-inter), sans-serif;
  --font-mono: var(--font-jetbrains), monospace;
}

html {
  scroll-behavior: auto;
}

body {
  background: var(--color-void);
  color: var(--color-star);
  font-family: var(--font-body);
  overflow-x: hidden;
}

::selection {
  background: rgba(110, 231, 255, 0.35);
}

.font-display { font-family: var(--font-display); }
.font-mono { font-family: var(--font-mono); }

.glass {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.09);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.gradient-text {
  background: linear-gradient(120deg, #e8ecff 0%, #6ee7ff 45%, #a78bfa 85%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Custom cursor is rendered by components/ui/Cursor.jsx; hide native only on fine pointers */
@media (pointer: fine) {
  .cursor-active, .cursor-active a, .cursor-active button { cursor: none; }
}

@media print {
  nav, footer, .no-print { display: none !important; }
  body { background: #fff !important; color: #111 !important; }
  .glass { background: #fff !important; border: 1px solid #ddd !important; backdrop-filter: none !important; }
  .gradient-text { color: #111 !important; background: none !important; -webkit-text-fill-color: #111 !important; }
  main { padding-top: 0 !important; }
}
```

- [ ] **Step 7: Create `app/layout.jsx`** (fonts, metadata, Person schema, analytics; Navbar/Footer/Cursor/Lenis get wired in Tasks 3–4 — for now only fonts + children)

```jsx
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export const metadata = {
  metadataBase: new URL('https://sukhma.in'),
  title: {
    default: 'Lakshya Badjatya — Developer & Aspiring Computer Scientist',
    template: '%s | Lakshya Badjatya',
  },
  description:
    'Lakshya Badjatya is a Class 12 PCM student from Kota, India who has shipped 7+ production apps across web, mobile, and desktop. Aspiring to study Computer Science internationally, Fall 2027.',
  authors: [{ name: 'Lakshya Badjatya' }],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Lakshya Badjatya — Student Developer Portfolio',
    description: 'A 3D voyage through the journey, projects, and skills of a self-taught student developer.',
    url: 'https://sukhma.in',
    type: 'website',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
}

export const viewport = { themeColor: '#050510' }

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Lakshya Badjatya',
  url: 'https://sukhma.in',
  email: 'mailto:lakshyabadjatya@gmail.com',
  sameAs: [
    'https://github.com/LakshyaBadjatya',
    'https://www.linkedin.com/in/lakshya-badjatya-a12a77399/',
    'https://dev.to/lakshyabadjatya',
    'https://medium.com/@lakshyabadjatya',
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

- [ ] **Step 8: Create placeholder pages** so the build passes

`app/page.jsx`:
```jsx
export default function Home() {
  return <main className="flex min-h-screen items-center justify-center font-display text-2xl">Voyage — under construction</main>
}
```

`app/about/page.jsx`, `app/projects/page.jsx`, `app/resume/page.jsx` (same shape, change the text):
```jsx
export default function About() {
  return <main className="flex min-h-screen items-center justify-center font-display text-2xl">About — under construction</main>
}
```

- [ ] **Step 9: Verify the build**

Run: `npm run build`
Expected: build succeeds, 4 static routes (`/`, `/about`, `/projects`, `/resume`) plus redirects compiled.

- [ ] **Step 10: Commit**

```powershell
git add -A
git commit -m "feat: scaffold Voyage redesign - App Router, Tailwind v4, R3F stack"
```

---

### Task 2: Content single-source-of-truth + chapter geometry config (with tests)

**Files:**
- Create: `content/profile.js`, `lib/chapters.js`
- Test: `__tests__/profile.test.js`, `__tests__/chapters.test.js`

- [ ] **Step 1: Write failing tests for content completeness**

`__tests__/profile.test.js`:
```js
import { profile } from '@/content/profile'

describe('profile content integrity (spec: Content Inventory)', () => {
  test('identity', () => {
    expect(profile.name).toBe('Lakshya Badjatya')
    expect(profile.email).toBe('lakshyabadjatya@gmail.com')
    expect(profile.phone).toBe('+91 8619690342')
    expect(profile.location).toMatch(/Kota/)
    expect(profile.roles.length).toBeGreaterThanOrEqual(3)
  })

  test('socials cover all four platforms', () => {
    const hrefs = profile.socials.map((s) => s.href).join(' ')
    for (const part of ['github.com/LakshyaBadjatya', 'linkedin.com', 'medium.com/@lakshyabadjatya', 'dev.to/lakshyabadjatya']) {
      expect(hrefs).toContain(part)
    }
  })

  test('timeline has the 5 canonical events ending at 2027', () => {
    expect(profile.timeline).toHaveLength(5)
    expect(profile.timeline[0].year).toBe('2020')
    expect(profile.timeline.at(-1).year).toBe('2027')
  })

  test('all 4 projects present with full data', () => {
    const names = profile.projects.map((p) => p.name)
    expect(names).toEqual(
      expect.arrayContaining(['Sambhav Services App', 'SamTechy', 'Flappy Bird', 'Sukhma.in']),
    )
    for (const p of profile.projects) {
      expect(p.summary.length).toBeGreaterThan(20)
      expect(p.bullets.length).toBeGreaterThanOrEqual(2)
      expect(p.stack.length).toBeGreaterThanOrEqual(2)
      expect(p.links.length).toBeGreaterThanOrEqual(1)
      expect(p.accent).toMatch(/^#/)
    }
  })

  test('6 skill categories preserved', () => {
    expect(profile.skills).toHaveLength(6)
    const all = profile.skills.flatMap((s) => s.tags)
    for (const tag of ['Dart', 'Flutter', 'React', 'Next.js', 'Firebase Auth', 'Unity Engine', 'Codemagic CI/CD']) {
      expect(all).toContain(tag)
    }
  })

  test('narrative pieces exist', () => {
    expect(profile.objective).toMatch(/7\+/)
    expect(profile.education.detail).toMatch(/PCM/)
    expect(profile.vision).toMatch(/startup/i)
    expect(profile.stats.length).toBe(4)
    expect(profile.extras).toHaveLength(3)
    expect(profile.story.panels).toHaveLength(3)
    expect(profile.about.cards.length).toBeGreaterThanOrEqual(5)
  })
})
```

`__tests__/chapters.test.js`:
```js
import { SEGMENTS, cameraTarget, localProgress, posOf, zOf } from '@/lib/chapters'

describe('chapter geometry', () => {
  test('7 chapters with contiguous scroll ranges', () => {
    expect(SEGMENTS).toHaveLength(7)
    expect(SEGMENTS[0].start).toBe(0)
    expect(SEGMENTS.at(-1).end).toBeCloseTo(1)
    for (let i = 1; i < SEGMENTS.length; i++) {
      expect(SEGMENTS[i].start).toBeCloseTo(SEGMENTS[i - 1].end)
    }
  })

  test('camera flies forward (z decreases monotonically)', () => {
    let last = Infinity
    for (let p = 0; p <= 1.001; p += 0.05) {
      const { pos } = cameraTarget(Math.min(p, 1))
      expect(pos[2]).toBeLessThanOrEqual(last + 1e-6)
      last = pos[2]
    }
  })

  test('camera starts at launch and ends at transmission', () => {
    expect(cameraTarget(0).pos[2]).toBeCloseTo(16)
    expect(cameraTarget(1).pos[2]).toBeCloseTo(zOf('transmission') + 16, 0)
  })

  test('localProgress maps a chapter to 0..1', () => {
    const seg = SEGMENTS.find((s) => s.id === 'worlds')
    expect(localProgress(seg.start, 'worlds')).toBeCloseTo(0)
    expect(localProgress(seg.end, 'worlds')).toBeCloseTo(1)
    expect(localProgress(0, 'worlds')).toBe(0)
    expect(localProgress(1, 'worlds')).toBe(1)
  })

  test('posOf offsets from the chapter waypoint', () => {
    const [x, y, z] = posOf('pilot', 1, 2, -3)
    const seg = SEGMENTS.find((s) => s.id === 'pilot')
    expect([x, y, z]).toEqual([seg.x + 1, seg.y + 2, seg.z - 3])
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot find modules `@/content/profile` and `@/lib/chapters`.

- [ ] **Step 3: Write `content/profile.js`** (every string from the spec's Content Inventory lives here)

```js
export const profile = {
  name: 'Lakshya Badjatya',
  firstName: 'Lakshya',
  statusBadge: 'Class 12 · Kota, India → CS Abroad, Fall 2027',
  roles: [
    'Self-taught Developer',
    'Aspiring Computer Scientist',
    'Flutter & Web Builder',
    'Future Founder',
  ],
  tagline:
    'A Class 12 PCM student from Kota, India who taught himself to build production software — 7+ apps shipped across web, mobile, and desktop.',
  email: 'lakshyabadjatya@gmail.com',
  phone: '+91 8619690342',
  location: 'Kota, Rajasthan, India',
  site: 'sukhma.in',

  socials: [
    { label: 'GitHub', href: 'https://github.com/LakshyaBadjatya' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lakshya-badjatya-a12a77399/' },
    { label: 'Medium', href: 'https://medium.com/@lakshyabadjatya' },
    { label: 'Dev.to', href: 'https://dev.to/lakshyabadjatya' },
  ],

  objective:
    'Self-driven student with a proven passion for software development, having independently built and shipped 7+ production applications across web, mobile, and desktop platforms. Seeking admission to an international CS undergraduate program (Fall 2027).',

  education: {
    title: 'Senior Secondary (Class 12)',
    detail: 'PCM Stream — Kota, Rajasthan, India',
    extra: 'Expected 2027 · Preparing for IELTS · Focus on analytical thinking & problem-solving',
  },

  vision:
    'Long-term, I want to build a technology startup and create digital products that solve real-world problems and reach users worldwide. The first checkpoint: studying Computer Science internationally with strong hands-on training and research exposure.',

  stats: [
    { value: '7+', label: 'production apps shipped' },
    { value: '6', label: 'platforms targeted' },
    { value: '2–3h', label: 'daily skill-building' },
    { value: '100%', label: 'self-taught' },
  ],

  story: {
    intro:
      "I got my first computer during COVID in 2020. Curiosity about how software works turned into a daily practice of building things that didn't exist the day before.",
    panels: [
      {
        code: 'PILOT LOG // 01',
        title: 'Who I am',
        text: 'A Class 12 PCM student from India with a strong interest in computer science. I enjoy understanding how software works, building real projects, and improving through deliberate practice.',
      },
      {
        code: 'PILOT LOG // 02',
        title: 'How I work',
        text: 'I learn by shipping. From a Unity game to enterprise Flutter platforms, every project taught me programming logic, debugging, architecture, and how to finish what I start.',
      },
      {
        code: 'PILOT LOG // 03',
        title: 'Discipline',
        text: "I'm naturally introverted, which helps me focus deeply. Badminton keeps me balanced. I dedicate 2–3 hours daily to engineering skills alongside Physics, Chemistry, and Mathematics.",
      },
    ],
  },

  timeline: [
    { year: '2020', label: 'First Computer', desc: 'Got my first PC during COVID-19 — curiosity about software sparked instantly.' },
    { year: '2022', label: 'First Project', desc: 'Self-taught C# and Unity; built a Flappy Bird clone, learning programming logic hands-on.' },
    { year: '2023', label: 'Web + Mobile Dev', desc: 'Taught myself HTML, CSS, JS, and Flutter. Began building production applications.' },
    { year: '2024–25', label: 'Shipped 7+ Apps', desc: 'Shipped multiple enterprise-grade applications across mobile, desktop, and web platforms.' },
    { year: '2027', label: 'CS Abroad', desc: 'Goal: study Computer Science internationally and build impactful products.' },
  ],

  projects: [
    {
      id: 'sambhav',
      name: 'Sambhav Services App',
      type: 'Business Management',
      accent: '#a78bfa',
      summary:
        'Full-featured cross-platform business management system: staff, clients, invoices, cash accounting, and task reminders — 138 Dart files shipped to Android and Windows.',
      stack: ['Flutter', 'Firebase', 'Riverpod', 'GoRouter', 'Android', 'Windows'],
      bullets: [
        'Engineered a full-featured cross-platform business management system with staff management, client tracking, invoice/bill management, cash accounting, and task reminders.',
        'Implemented role-based access control (Admin vs. Staff), real-time notifications, and a custom neumorphic UI widget library with 12+ reusable components.',
        'Built invoice lifecycle tracking (New → Packed → Delivered) with timeline history, cash book with running balance, and a 3-hour edit rule for staff entries.',
        'Features transport/courier company management, priority-based task reminders (Normal/Urgent), and persistent dark/light theme. Codebase spans 138 Dart files.',
      ],
      links: [{ label: 'GitHub', href: 'https://github.com/LakshyaBadjatya' }],
    },
    {
      id: 'samtechy',
      name: 'SamTechy',
      type: 'Enterprise SaaS',
      accent: '#6ee7ff',
      summary:
        'Field service management platform with 5 user roles, ticketing, analytics, license-key SaaS management, and FCM push — deployed to Android/iOS via Codemagic CI/CD.',
      stack: ['Flutter', 'Firebase', 'Provider', 'FCM', 'iOS', 'macOS', 'Codemagic'],
      bullets: [
        'Built a comprehensive field service management platform with 5 distinct user roles (Super Admin, Admin, Engineer, Dealer, Customer), each with a custom dashboard.',
        'Features engineer ticketing, job management, expense tracking with date-range filters, analytics dashboard, license key management (SaaS-style), and push notifications via FCM.',
        'Implemented encrypted data storage for sensitive information, organization management, and client master data management with real-time sync.',
        'Deployed to Android and iOS with automated CI/CD pipelines using Codemagic. Supports Windows/macOS desktop from a single codebase.',
      ],
      links: [{ label: 'GitHub', href: 'https://github.com/LakshyaBadjatya' }],
    },
    {
      id: 'flappy',
      name: 'Flappy Bird',
      type: '2D Game · First Project',
      accent: '#f59e0b',
      summary:
        'The project that started everything — a Flappy Bird-style game built in Unity with C#, where I learned programming logic, game physics, and debugging hands-on.',
      stack: ['Unity Engine', 'C#', 'Game Physics', 'Git'],
      bullets: [
        'Self-taught C# and the Unity engine at age 14 to build a complete, playable 2D game.',
        'Implemented game physics, collision detection, scoring, and difficulty progression.',
        'Published the source publicly and shipped a downloadable Android APK.',
      ],
      links: [
        { label: 'GitHub', href: 'https://github.com/LakshyaBadjatya/FlappyBird' },
        { label: 'Download APK', href: '/downloads/Flappy.apk' },
      ],
    },
    {
      id: 'portfolio',
      name: 'Sukhma.in',
      type: 'This Website',
      accent: '#f472b6',
      summary:
        'This portfolio — a custom 3D scroll-journey built with Next.js, React Three Fiber, and WebGL shaders. Designed and engineered from scratch, open source.',
      stack: ['Next.js', 'React', 'Three.js', 'React Three Fiber', 'Tailwind CSS', 'Framer Motion'],
      bullets: [
        'Designed and built a 3D immersive scroll experience with a scroll-driven WebGL camera, instanced starfields, and adaptive performance tiers.',
        'Implemented graceful fallbacks for reduced-motion preferences and devices without WebGL.',
        'Fully open source on GitHub.',
      ],
      links: [{ label: 'GitHub', href: 'https://github.com/LakshyaBadjatya/Personal-Portfolio' }],
    },
  ],

  skills: [
    { category: 'Languages', color: '#00ffcc', tags: ['Dart', 'JavaScript', 'TypeScript', 'C#', 'HTML5', 'CSS3'] },
    { category: 'Mobile & Desktop', color: '#a855f7', tags: ['Flutter', 'Android', 'iOS', 'Windows', 'macOS', 'Riverpod', 'Provider', 'GoRouter'] },
    { category: 'Web Development', color: '#3b82f6', tags: ['React', 'Next.js', 'Node.js', 'Framer Motion', 'Tailwind CSS', 'SCSS'] },
    { category: 'Backend & Database', color: '#f43f5e', tags: ['Firebase Auth', 'Firestore', 'FCM', 'Cloud Storage', 'SQLite', 'JWT', 'BCrypt'] },
    { category: 'Game Development', color: '#f59e0b', tags: ['Unity Engine', 'Game Physics', 'C# Scripting'] },
    { category: 'DevOps & Tools', color: '#10b981', tags: ['Git', 'GitHub', 'Codemagic CI/CD', 'VS Code', 'Figma', 'Postman', 'RCON'] },
  ],

  extras: [
    { icon: '🏸', title: 'Badminton', text: 'Regular player — builds discipline, focus, and a balanced routine.' },
    { icon: '✍️', title: 'Technical Writing', text: 'Publishes articles on Medium and Dev.to sharing learnings with the developer community.' },
    { icon: '🔓', title: 'Open Source', text: 'All projects are public on GitHub, reflecting commitment to open collaboration.' },
  ],

  about: {
    lead: "I'm a Class 12 student from Kota, India building my journey toward studying Computer Science abroad — focused on learning by building and improving daily.",
    cards: [
      { emoji: '🚀', title: 'My Journey', text: 'My interest in technology began during COVID when I got my first computer. Curiosity quickly turned into passion for understanding software, building websites, and learning how digital products work.' },
      { emoji: '💻', title: 'Projects & Skills', text: 'I enjoy turning ideas into working systems. One early project was building a Flappy Bird-style game where I learned programming logic and debugging. Currently improving through hands-on projects every day.' },
      { emoji: '🎓', title: 'Academic Focus', text: 'I study Physics, Chemistry, and Mathematics and am preparing for IELTS. My goal is to study Computer Science abroad and gain strong hands-on training, research exposure, and real-world experience.' },
      { emoji: '🎯', title: 'Future Vision', text: 'My long-term ambition is to build a technology startup and create digital products that solve real-world problems and reach many users worldwide.' },
      { emoji: '🧠', title: 'Personal Side', text: "Outside academics and coding, I play badminton to stay disciplined and balanced. I'm naturally introverted, which helps me focus deeply on learning and building. I dedicate 2–3 hours daily to improving my skills." },
    ],
  },
}
```

- [ ] **Step 4: Write `lib/chapters.js`**

```js
// Shared geometry between the DOM sections and the 3D scene.
// Each chapter gets a scroll weight (relative screen-heights of DOM content)
// and a camera waypoint. Chapters sit every SPACING units along -Z.
const SPACING = 70

export const CHAPTERS = [
  { id: 'launch', weight: 1.0, x: 0, y: 0 },
  { id: 'pilot', weight: 1.3, x: 9, y: 2 },
  { id: 'flightpath', weight: 1.6, x: -8, y: 4 },
  { id: 'worlds', weight: 2.6, x: 7, y: -2 },
  { id: 'systems', weight: 1.3, x: -7, y: 3 },
  { id: 'destination', weight: 1.1, x: 0, y: 1 },
  { id: 'transmission', weight: 1.0, x: 0, y: 0 },
]

const total = CHAPTERS.reduce((sum, c) => sum + c.weight, 0)

let acc = 0
export const SEGMENTS = CHAPTERS.map((c, index) => {
  const start = acc / total
  acc += c.weight
  return { ...c, index, start, end: acc / total, z: -index * SPACING }
})

function seg(id) {
  const s = SEGMENTS.find((c) => c.id === id)
  if (!s) throw new Error(`unknown chapter: ${id}`)
  return s
}

export function zOf(id) {
  return seg(id).z
}

export function posOf(id, dx = 0, dy = 0, dz = 0) {
  const s = seg(id)
  return [s.x + dx, s.y + dy, s.z + dz]
}

/** 0..1 progress within one chapter's scroll range (clamped). */
export function localProgress(progress, id) {
  const s = seg(id)
  return Math.min(1, Math.max(0, (progress - s.start) / (s.end - s.start)))
}

const smooth = (t) => t * t * (3 - 2 * t)

/** Camera position + look target for a global scroll progress 0..1. */
export function cameraTarget(progress) {
  const p = Math.min(Math.max(progress, 0), 1)
  const s =
    SEGMENTS.find((c) => p >= c.start && p < c.end) ?? SEGMENTS[SEGMENTS.length - 1]
  const next = SEGMENTS[Math.min(s.index + 1, SEGMENTS.length - 1)]
  const t = s.end === s.start ? 0 : (p - s.start) / (s.end - s.start)
  const e = smooth(t)
  return {
    pos: [
      s.x + (next.x - s.x) * e,
      s.y + (next.y - s.y) * e,
      s.z + (next.z - s.z) * e + 16,
    ],
    look: [next.x, next.y, next.z - 10],
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — both suites green.

- [ ] **Step 6: Commit**

```powershell
git add -A
git commit -m "feat: add profile content source-of-truth and chapter geometry with tests"
```

---

### Task 3: Performance tiers + scroll infrastructure

**Files:**
- Create: `lib/perf.js`, `lib/scroll.js`
- Test: `__tests__/perf.test.js`
- Modify: `app/layout.jsx` (wrap children in LenisProvider)

- [ ] **Step 1: Write failing tier-detection tests**

`__tests__/perf.test.js`:
```js
import { detectTier } from '@/lib/perf'

// All inputs injected so tests run in node without window/navigator.
const base = { reducedMotion: false, webgl: true, nav: { hardwareConcurrency: 8 }, width: 1440 }

describe('detectTier', () => {
  test('tier 0 when user prefers reduced motion', () => {
    expect(detectTier({ ...base, reducedMotion: true })).toBe(0)
  })
  test('tier 0 when WebGL is unavailable', () => {
    expect(detectTier({ ...base, webgl: false })).toBe(0)
  })
  test('tier 1 on narrow (mobile) viewports', () => {
    expect(detectTier({ ...base, width: 390 })).toBe(1)
  })
  test('tier 1 on weak hardware', () => {
    expect(detectTier({ ...base, nav: { hardwareConcurrency: 4 } })).toBe(1)
    expect(detectTier({ ...base, nav: { hardwareConcurrency: 8, deviceMemory: 4 } })).toBe(1)
  })
  test('tier 2 on capable desktops', () => {
    expect(detectTier(base)).toBe(2)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- perf`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `lib/perf.js`**

```js
export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function supportsWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * 0 = no 3D (reduced motion or no WebGL) -> static fallback
 * 1 = reduced 3D (mobile / weak hardware)
 * 2 = full experience
 */
export function detectTier({
  reducedMotion = prefersReducedMotion(),
  webgl = supportsWebGL(),
  nav = navigator,
  width = window.innerWidth,
} = {}) {
  if (reducedMotion || !webgl) return 0
  const weak =
    (nav.hardwareConcurrency || 4) <= 4 ||
    width < 768 ||
    (nav.deviceMemory !== undefined && nav.deviceMemory <= 4)
  return weak ? 1 : 2
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- perf`
Expected: PASS.

- [ ] **Step 5: Write `lib/scroll.js`** (Lenis provider publishing into a mutable module singleton; plain scroll listener under reduced motion)

```js
'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { prefersReducedMotion } from '@/lib/perf'

// Mutated every scroll frame; read inside useFrame without re-renders.
export const scrollState = { progress: 0, velocity: 0 }

export function LenisProvider({ children }) {
  useEffect(() => {
    if (prefersReducedMotion()) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        scrollState.progress = max > 0 ? window.scrollY / max : 0
      }
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    lenis.on('scroll', ({ progress, velocity }) => {
      scrollState.progress = progress
      scrollState.velocity = velocity
    })
    let raf = requestAnimationFrame(function frame(time) {
      lenis.raf(time)
      raf = requestAnimationFrame(frame)
    })
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return children
}
```

- [ ] **Step 6: Wire LenisProvider into `app/layout.jsx`**

Add the import and wrap children:
```jsx
import { LenisProvider } from '@/lib/scroll'
```
```jsx
        <LenisProvider>{children}</LenisProvider>
```
(replacing the bare `{children}` inside `<body>`; keep `<Analytics />` outside the provider).

- [ ] **Step 7: Verify build + tests**

Run: `npm test` then `npm run build`
Expected: all tests pass; build succeeds.

- [ ] **Step 8: Commit**

```powershell
git add -A
git commit -m "feat: add perf tier detection and Lenis scroll state"
```

---

### Task 4: UI shell — Navbar, Footer, Magnetic, Reveal, Typewriter, SectionLabel, Cursor

**Files:**
- Create: `components/ui/Navbar.jsx`, `components/ui/Footer.jsx`, `components/ui/Magnetic.jsx`, `components/ui/Reveal.jsx`, `components/ui/Typewriter.jsx`, `components/ui/SectionLabel.jsx`, `components/ui/Cursor.jsx`
- Modify: `app/layout.jsx`

- [ ] **Step 1: Write `components/ui/Navbar.jsx`**

```jsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const LINKS = [
  { href: '/', label: 'Voyage' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <motion.nav
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
      className="glass fixed inset-x-0 top-0 z-50 border-x-0 border-t-0"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          LB<span className="text-cyan">.</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {LINKS.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-3 py-1.5 font-mono text-xs transition-colors sm:text-sm ${
                  active ? 'text-cyan' : 'text-dim hover:text-star'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-cyan/10 ring-1 ring-cyan/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}
```

- [ ] **Step 2: Write `components/ui/Footer.jsx`**

```jsx
import Link from 'next/link'
import { profile } from '@/content/profile'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-void/80 px-6 py-10 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-sm">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-dim transition-colors hover:text-cyan">
              {s.label} ↗
            </a>
          ))}
        </div>
        <p className="text-xs text-dim/70">
          © {new Date().getFullYear()} {profile.name} · built from scratch with Next.js, Three.js & React Three Fiber ·{' '}
          <Link href="/resume" className="underline decoration-dotted hover:text-cyan">resume</Link>
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Write `components/ui/Magnetic.jsx`**

```jsx
'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18 })
  const sy = useSpring(y, { stiffness: 220, damping: 18 })

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 4: Write `components/ui/Reveal.jsx`**

```jsx
'use client'

import { motion } from 'framer-motion'

export default function Reveal({ children, delay = 0, y = 40, className = '', once = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-12%' }}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 5: Write `components/ui/Typewriter.jsx`**

```jsx
'use client'

import { useEffect, useState } from 'react'

export default function Typewriter({ words, speed = 55, pause = 1800 }) {
  const [index, setIndex] = useState(0)
  const [len, setLen] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const word = words[index % words.length]

  useEffect(() => {
    if (!deleting && len === word.length) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }
    if (deleting && len === 0) {
      setDeleting(false)
      setIndex((i) => i + 1)
      return
    }
    const t = setTimeout(() => setLen((l) => l + (deleting ? -1 : 1)), deleting ? speed / 2 : speed)
    return () => clearTimeout(t)
  }, [len, deleting, word, speed, pause])

  return (
    <span aria-label={words.join(', ')}>
      {word.slice(0, len)}
      <span className="animate-pulse text-cyan">▌</span>
    </span>
  )
}
```

- [ ] **Step 6: Write `components/ui/SectionLabel.jsx`**

```jsx
'use client'

import { motion } from 'framer-motion'

export default function SectionLabel({ pre, title, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${center ? 'text-center' : ''}`}
    >
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">{pre}</div>
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
    </motion.div>
  )
}
```

- [ ] **Step 7: Write `components/ui/Cursor.jsx`** (fine pointers only; respects reduced motion)

```jsx
'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { prefersReducedMotion } from '@/lib/perf'

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hot, setHot] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 250, damping: 22 })
  const ry = useSpring(y, { stiffness: 250, damping: 22 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || prefersReducedMotion()) return
    setEnabled(true)
    document.documentElement.classList.add('cursor-active')
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHot(!!e.target.closest('a, button, [data-hot]'))
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.classList.remove('cursor-active')
    }
  }, [x, y])

  if (!enabled) return null
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan"
        style={{ x, y }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/50"
        style={{ x: rx, y: ry }}
        animate={{ width: hot ? 44 : 28, height: hot ? 44 : 28, opacity: hot ? 0.9 : 0.5 }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
```

- [ ] **Step 8: Wire Navbar/Footer/Cursor into `app/layout.jsx`**

Add imports and update body:
```jsx
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import Cursor from '@/components/ui/Cursor'
```
```jsx
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Cursor />
        <Navbar />
        <LenisProvider>{children}</LenisProvider>
        <Footer />
        <Analytics />
      </body>
```

- [ ] **Step 9: Verify**

Run: `npm run build`
Expected: success. Then `npm run dev` (background), open `http://localhost:3000` via Playwright MCP `browser_navigate` + `browser_take_screenshot`: glass navbar on top, footer with 4 social links, custom cursor replaces native one.

- [ ] **Step 10: Commit**

```powershell
git add -A
git commit -m "feat: add UI shell - navbar, footer, cursor, motion primitives"
```

---

### Task 5: Voyage canvas core — fallback sky, tier gate, camera rig, starfield, postprocessing

**Files:**
- Create: `components/voyage/StaticSky.jsx`, `components/voyage/VoyageCanvas.jsx`, `components/voyage/Scene.jsx`, `components/voyage/CameraRig.jsx`, `components/voyage/Starfield.jsx`, `components/voyage/Effects.jsx`, `lib/glow.js`
- Modify: `app/page.jsx` (canvas + temporary tall placeholder sections)

- [ ] **Step 1: Write `components/voyage/StaticSky.jsx`** (tier-0/no-JS-canvas fallback; deterministic stars via LCG so SSR and client markup match)

```jsx
const STAR_COUNT = 120

function lcgStars() {
  let seed = 1337
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  const shadows = []
  for (let i = 0; i < STAR_COUNT; i++) {
    const x = (rand() * 100).toFixed(2)
    const y = (rand() * 100).toFixed(2)
    const a = (0.3 + rand() * 0.7).toFixed(2)
    shadows.push(`${x}vw ${y}vh 0 0 rgba(232,236,255,${a})`)
  }
  return shadows.join(',')
}

const SHADOWS = lcgStars()

export default function StaticSky() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-void">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(110,231,255,0.10), transparent 60%),' +
            'radial-gradient(ellipse 60% 50% at 80% 110%, rgba(167,139,250,0.12), transparent 60%),' +
            'radial-gradient(ellipse 50% 40% at 10% 60%, rgba(244,114,182,0.06), transparent 60%)',
        }}
      />
      <div className="absolute left-0 top-0 h-px w-px rounded-full" style={{ boxShadow: SHADOWS }} />
    </div>
  )
}
```

- [ ] **Step 2: Write `lib/glow.js`** (shared canvas-generated radial sprite texture; client-only callers)

```js
import * as THREE from 'three'

let cached = null

/** White radial glow texture; tint with material color. */
export function glowTexture() {
  if (cached) return cached
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.35, 'rgba(255,255,255,0.35)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  cached = new THREE.CanvasTexture(c)
  return cached
}
```

- [ ] **Step 3: Write `components/voyage/Starfield.jsx`**

```jsx
'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Starfield({ count = 4000, size = 0.5, color = '#cfd8ff', spin = 0.004, depth = 540 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    let seed = count // deterministic per-layer
    const rand = () => {
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 260
      arr[i * 3 + 1] = (rand() - 0.5) * 150
      arr[i * 3 + 2] = 40 - rand() * depth
    }
    return arr
  }, [count, depth])

  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * spin
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation
        color={color}
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
```

- [ ] **Step 4: Write `components/voyage/CameraRig.jsx`**

```jsx
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from '@/lib/scroll'
import { cameraTarget } from '@/lib/chapters'

export default function CameraRig({ mouse }) {
  const lookRef = useRef(new THREE.Vector3(0, 0, -60))
  const posTmp = useRef(new THREE.Vector3())
  const lookTmp = useRef(new THREE.Vector3())

  useFrame((state, dt) => {
    const { pos, look } = cameraTarget(scrollState.progress)
    const k = 1 - Math.exp(-4.5 * Math.min(dt, 0.1))
    posTmp.current.set(
      pos[0] + mouse.current.x * 1.6,
      pos[1] - mouse.current.y * 1.2,
      pos[2],
    )
    state.camera.position.lerp(posTmp.current, k)
    lookTmp.current.set(look[0] + mouse.current.x * 2, look[1] - mouse.current.y * 1.5, look[2])
    lookRef.current.lerp(lookTmp.current, k)
    state.camera.lookAt(lookRef.current)
  })

  return null
}
```

- [ ] **Step 5: Write `components/voyage/Effects.jsx`**

```jsx
'use client'

import { EffectComposer, Bloom, Vignette, ChromaticAberration, Noise } from '@react-three/postprocessing'

export default function Effects({ tier }) {
  if (tier < 2) return null
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.8} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur />
      <ChromaticAberration offset={[0.0012, 0.0008]} />
      <Noise opacity={0.05} />
      <Vignette eskil={false} offset={0.18} darkness={0.85} />
    </EffectComposer>
  )
}
```

- [ ] **Step 6: Write `components/voyage/Scene.jsx`** (chapter set-dressing components from Tasks 6–11 get added here as they're built)

```jsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei'
import CameraRig from './CameraRig'
import Starfield from './Starfield'
import Effects from './Effects'

export default function Scene({ tier }) {
  const mouse = useRef({ x: 0, y: 0 })
  const [degraded, setDegraded] = useState(false)

  useEffect(() => {
    const move = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <Canvas
      dpr={degraded || tier < 2 ? 1 : [1, 2]}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      camera={{ fov: 60, near: 0.1, far: 700, position: [0, 0, 16] }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <color attach="background" args={['#050510']} />
      <fog attach="fog" args={['#050510', 70, 340]} />
      <ambientLight intensity={0.25} />
      <PerformanceMonitor onDecline={() => setDegraded(true)}>
        <CameraRig mouse={mouse} />
        <Starfield count={tier === 2 ? 5000 : 1800} size={0.45} color="#cfd8ff" />
        <Starfield count={tier === 2 ? 900 : 300} size={1.1} color="#6ee7ff" spin={-0.002} />
        {/* Chapter set dressing mounts here in Tasks 6-11 */}
        <Effects tier={tier} />
      </PerformanceMonitor>
      <AdaptiveDpr pixelated />
    </Canvas>
  )
}
```

- [ ] **Step 7: Write `components/voyage/VoyageCanvas.jsx`** (tier gate + error boundary + lazy load)

```jsx
'use client'

import dynamic from 'next/dynamic'
import { Component, useEffect, useState } from 'react'
import StaticSky from './StaticSky'
import { detectTier } from '@/lib/perf'

const Scene = dynamic(() => import('./Scene'), { ssr: false, loading: () => null })

class CanvasBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? <StaticSky /> : this.props.children
  }
}

export default function VoyageCanvas() {
  const [tier, setTier] = useState(null)

  useEffect(() => {
    setTier(detectTier())
  }, [])

  if (tier === null || tier === 0) return <StaticSky />
  return (
    <CanvasBoundary>
      <StaticSky />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <Scene tier={tier} />
      </div>
    </CanvasBoundary>
  )
}
```

(StaticSky stays mounted underneath at `-z-10` so there is never a black flash while the 3D bundle loads; the canvas paints over it.)

- [ ] **Step 8: Replace `app/page.jsx`** with the canvas + temporary scroll runway

```jsx
import VoyageCanvas from '@/components/voyage/VoyageCanvas'
import { CHAPTERS } from '@/lib/chapters'

export default function Home() {
  return (
    <>
      <VoyageCanvas />
      <main className="relative z-10">
        {CHAPTERS.map((c) => (
          <section key={c.id} id={c.id} style={{ minHeight: `${c.weight * 100}vh` }} className="flex items-center justify-center">
            <span className="font-mono text-dim/40">{c.id}</span>
          </section>
        ))}
      </main>
    </>
  )
}
```

- [ ] **Step 9: Visual verification (Playwright MCP)**

1. `npm run dev` in background.
2. ToolSearch `select:` the Playwright tools, then `browser_navigate` → `http://localhost:3000`.
3. `browser_take_screenshot` at top — expect starfield, bloom glow, navbar.
4. `browser_evaluate` → `() => window.scrollTo(0, document.documentElement.scrollHeight * 0.5)` then screenshot — starfield perspective should have shifted (camera flew forward, lateral waypoint drift visible).
5. `browser_console_messages` — no errors (warnings from three are acceptable only if non-fatal).

- [ ] **Step 10: Commit**

```powershell
git add -A
git commit -m "feat: voyage canvas core - scroll-driven camera, starfield, postprocessing, fallbacks"
```

---

### Task 6: Chapter 1 — Launch (DOM hero + horizon planet)

**Files:**
- Create: `components/chapters/Chapter.jsx`, `components/chapters/Launch.jsx`, `components/voyage/HorizonPlanet.jsx`
- Modify: `components/voyage/Scene.jsx`, `app/page.jsx`

- [ ] **Step 1: Write `components/chapters/Chapter.jsx`** (shared section wrapper bound to chapter weights)

```jsx
'use client'

import { SEGMENTS } from '@/lib/chapters'

export default function Chapter({ id, className = '', children }) {
  const seg = SEGMENTS.find((s) => s.id === id)
  return (
    <section
      id={id}
      style={{ minHeight: `${seg.weight * 100}vh` }}
      className={`relative mx-auto flex w-full max-w-6xl flex-col justify-center px-6 py-24 md:px-12 ${className}`}
    >
      {children}
    </section>
  )
}
```

- [ ] **Step 2: Write `components/chapters/Launch.jsx`**

```jsx
'use client'

import { motion } from 'framer-motion'
import Chapter from './Chapter'
import Typewriter from '@/components/ui/Typewriter'
import { profile } from '@/content/profile'

export default function Launch() {
  return (
    <Chapter id="launch" className="items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-5 py-1.5 font-mono text-xs text-cyan"
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
        {profile.statusBadge}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
        className="gradient-text font-display text-6xl font-bold leading-[1.02] tracking-tight md:text-8xl lg:text-9xl"
      >
        {profile.name.split(' ')[0]}
        <br />
        {profile.name.split(' ')[1]}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-6 h-7 font-mono text-base text-dim md:text-lg"
      >
        <Typewriter words={profile.roles} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="mt-6 max-w-xl text-base leading-relaxed text-dim md:text-lg"
      >
        {profile.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-dim/70">scroll to begin the voyage</div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto mt-3 text-cyan"
        >
          ↓
        </motion.div>
      </motion.div>
    </Chapter>
  )
}
```

- [ ] **Step 3: Write `components/voyage/HorizonPlanet.jsx`** (planet below the hero with an atmosphere glow sprite)

```jsx
'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { posOf } from '@/lib/chapters'
import { glowTexture } from '@/lib/glow'

export default function HorizonPlanet() {
  const ref = useRef()
  const tex = useMemo(() => glowTexture(), [])
  const position = posOf('launch', 0, -17, -34)

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02
  })

  return (
    <group position={position}>
      <sprite scale={[42, 42, 1]}>
        <spriteMaterial map={tex} color="#3b5bd9" transparent opacity={0.5} depthWrite={false} />
      </sprite>
      <mesh ref={ref}>
        <sphereGeometry args={[13, 48, 48]} />
        <meshStandardMaterial color="#0d1440" emissive="#27408f" emissiveIntensity={0.35} roughness={0.85} />
      </mesh>
      <pointLight position={[18, 14, 14]} intensity={140} color="#6ee7ff" />
    </group>
  )
}
```

- [ ] **Step 4: Mount in `components/voyage/Scene.jsx`** — add import and render inside `<PerformanceMonitor>` after the starfields:

```jsx
import HorizonPlanet from './HorizonPlanet'
```
```jsx
        <HorizonPlanet />
```

- [ ] **Step 5: Mount in `app/page.jsx`** — replace the `launch` placeholder by importing Launch and rendering it as the first child of `<main>`; keep the other placeholders:

```jsx
import Launch from '@/components/chapters/Launch'
```
```jsx
      <main className="relative z-10">
        <Launch />
        {CHAPTERS.filter((c) => c.id !== 'launch').map((c) => (
          <section key={c.id} id={c.id} style={{ minHeight: `${c.weight * 100}vh` }} className="flex items-center justify-center">
            <span className="font-mono text-dim/40">{c.id}</span>
          </section>
        ))}
      </main>
```

- [ ] **Step 6: Visual check** — Playwright screenshot at top: name in huge gradient type, typewriter cycling, badge pill, planet glow on the horizon, scroll cue bobbing.

- [ ] **Step 7: Commit**

```powershell
git add -A
git commit -m "feat: launch chapter - hero typography over horizon planet"
```

---

### Task 7: Chapter 2 — The Pilot (HUD panels + nebula)

**Files:**
- Create: `components/chapters/Pilot.jsx`, `components/voyage/Nebula.jsx`
- Modify: `components/voyage/Scene.jsx`, `app/page.jsx`

- [ ] **Step 1: Write `components/voyage/Nebula.jsx`** (billboarded glow sprites in layered hues; reusable for pilot + destination)

```jsx
'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { glowTexture } from '@/lib/glow'

const HUES = ['#6ee7ff', '#a78bfa', '#f472b6', '#4c6ef5']

export default function Nebula({ center, count = 8, spread = 38, baseScale = 30 }) {
  const group = useRef()
  const tex = useMemo(() => glowTexture(), [])
  const puffs = useMemo(() => {
    let seed = Math.abs(Math.round(center[2])) + 7
    const rand = () => {
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }
    return Array.from({ length: count }, (_, i) => ({
      pos: [(rand() - 0.5) * spread, (rand() - 0.5) * spread * 0.5, (rand() - 0.5) * spread],
      scale: baseScale * (0.6 + rand() * 1.2),
      color: HUES[i % HUES.length],
      opacity: 0.08 + rand() * 0.1,
    }))
  }, [center, count, spread, baseScale])

  useFrame((state) => {
    if (group.current) group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
  })

  return (
    <group ref={group} position={center}>
      {puffs.map((p, i) => (
        <sprite key={i} position={p.pos} scale={[p.scale, p.scale, 1]}>
          <spriteMaterial map={tex} color={p.color} transparent opacity={p.opacity} depthWrite={false} />
        </sprite>
      ))}
    </group>
  )
}
```

- [ ] **Step 2: Write `components/chapters/Pilot.jsx`**

```jsx
'use client'

import Chapter from './Chapter'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { profile } from '@/content/profile'

export default function Pilot() {
  return (
    <Chapter id="pilot">
      <SectionLabel pre="Chapter 01 · The Pilot" title="Mission Briefing" />
      <Reveal className="mb-12 max-w-2xl">
        <p className="text-lg leading-relaxed text-star/90 md:text-xl">{profile.story.intro}</p>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {profile.story.panels.map((panel, i) => (
          <Reveal key={panel.code} delay={i * 0.12}>
            <article className="glass relative h-full rounded-2xl p-6">
              <div className="absolute left-4 top-0 h-px w-10 bg-cyan/60" />
              <div className="mb-4 font-mono text-[11px] tracking-[0.25em] text-cyan/80">{panel.code}</div>
              <h3 className="font-display text-xl font-bold">{panel.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-dim">{panel.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Chapter>
  )
}
```

- [ ] **Step 3: Mount the nebula in `Scene.jsx`**

```jsx
import Nebula from './Nebula'
import { posOf } from '@/lib/chapters'
```
```jsx
        <Nebula center={posOf('pilot', 0, 0, -18)} />
```

- [ ] **Step 4: Mount Pilot in `app/page.jsx`** (import it; render after `<Launch />`; remove `pilot` from the placeholder filter list — the filter becomes `!['launch','pilot'].includes(c.id)`).

- [ ] **Step 5: Visual check** — scroll to ~12% page height via `browser_evaluate`, screenshot: nebula hues behind glass HUD panels, panels reveal on scroll.

- [ ] **Step 6: Commit**

```powershell
git add -A
git commit -m "feat: pilot chapter - mission briefing HUD over nebula"
```

---

### Task 8: Chapter 3 — Flight Path (constellation timeline)

**Files:**
- Create: `components/chapters/FlightPath.jsx`, `components/voyage/Constellation.jsx`
- Modify: `components/voyage/Scene.jsx`, `app/page.jsx`

- [ ] **Step 1: Write `components/voyage/Constellation.jsx`** (5 stars ignite sequentially with chapter-local progress; 2027 star pulses)

```jsx
'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { scrollState } from '@/lib/scroll'
import { localProgress, posOf } from '@/lib/chapters'
import { glowTexture } from '@/lib/glow'
import { profile } from '@/content/profile'

export default function Constellation() {
  const tex = useMemo(() => glowTexture(), [])
  const nodeRefs = useRef([])
  const origin = posOf('flightpath', -12, -6, -22)

  const nodes = useMemo(
    () =>
      profile.timeline.map((_, i) => [
        origin[0] + i * 6,
        origin[1] + i * 3 + (i % 2) * 1.2,
        origin[2] - i * 5,
      ]),
    [origin],
  )

  useFrame((state) => {
    const p = localProgress(scrollState.progress, 'flightpath')
    nodes.forEach((_, i) => {
      const node = nodeRefs.current[i]
      if (!node) return
      const lit = Math.min(1, Math.max(0, p * (nodes.length + 1) - i))
      const isGoal = i === nodes.length - 1
      const pulse = isGoal ? 1 + Math.sin(state.clock.elapsedTime * 2.4) * 0.18 : 1
      const s = (1.2 + lit * 2.6) * pulse * (isGoal ? 1.5 : 1)
      node.scale.set(s, s, 1)
      node.material.opacity = 0.15 + lit * 0.85
    })
  })

  return (
    <group>
      <Line points={nodes} color="#6ee7ff" transparent opacity={0.28} lineWidth={1} />
      {nodes.map((pos, i) => (
        <sprite key={i} position={pos} ref={(el) => (nodeRefs.current[i] = el)}>
          <spriteMaterial
            map={tex}
            color={i === nodes.length - 1 ? '#f472b6' : '#bfe9ff'}
            transparent
            opacity={0.2}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  )
}
```

- [ ] **Step 2: Write `components/chapters/FlightPath.jsx`**

```jsx
'use client'

import Chapter from './Chapter'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { profile } from '@/content/profile'

export default function FlightPath() {
  return (
    <Chapter id="flightpath">
      <SectionLabel pre="Chapter 02 · Flight Path" title="The Journey So Far" />
      <div className="relative ml-2 border-l border-cyan/20 pl-8 md:ml-10 md:pl-12">
        {profile.timeline.map((event, i) => {
          const isGoal = i === profile.timeline.length - 1
          return (
            <Reveal key={event.year} delay={i * 0.08} className="relative mb-12 last:mb-0">
              <span
                className={`absolute -left-[41px] top-1 h-4 w-4 rounded-full md:-left-[57px] ${
                  isGoal ? 'bg-magenta shadow-[0_0_18px_#f472b6]' : 'bg-cyan shadow-[0_0_12px_#6ee7ff]'
                }`}
              />
              <div className={`font-mono text-sm font-semibold ${isGoal ? 'text-magenta' : 'text-cyan'}`}>
                {event.year}
                {isGoal && <span className="ml-3 rounded-full border border-magenta/40 bg-magenta/10 px-2 py-0.5 text-[10px] uppercase tracking-widest">destination</span>}
              </div>
              <h3 className="mt-1 font-display text-2xl font-bold">{event.label}</h3>
              <p className="mt-2 max-w-xl leading-relaxed text-dim">{event.desc}</p>
            </Reveal>
          )
        })}
      </div>
    </Chapter>
  )
}
```

- [ ] **Step 3: Mount `<Constellation />` in `Scene.jsx`** (import + render) and **FlightPath in `app/page.jsx`** (placeholder filter list becomes `['launch','pilot','flightpath']`).

- [ ] **Step 4: Visual check** — scroll to ~28%: timeline cards animate in; constellation stars ignite one-by-one as you continue scrolling; final star pulses pink.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: flight path chapter - constellation timeline 2020-2027"
```

---

### Task 9: Chapter 4 — Worlds (project planets + holo cards)

**Files:**
- Create: `components/chapters/Worlds.jsx`, `components/voyage/ProjectWorlds.jsx`
- Modify: `components/voyage/Scene.jsx`, `app/page.jsx`

- [ ] **Step 1: Write `components/voyage/ProjectWorlds.jsx`** (four distinct bodies: ringed planet, smooth planet, low-poly rock, wireframe knot)

```jsx
'use client'

import { Float } from '@react-three/drei'
import { posOf } from '@/lib/chapters'

function Ringed({ accent }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[3.2, 40, 40]} />
        <meshStandardMaterial color="#101638" emissive={accent} emissiveIntensity={0.5} roughness={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[5.2, 0.14, 8, 80]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.4} />
      </mesh>
    </group>
  )
}

function Smooth({ accent }) {
  return (
    <mesh>
      <sphereGeometry args={[3.4, 48, 48]} />
      <meshStandardMaterial color="#161030" emissive={accent} emissiveIntensity={0.55} roughness={0.4} metalness={0.3} />
    </mesh>
  )
}

function LowPoly({ accent }) {
  return (
    <mesh>
      <icosahedronGeometry args={[3.2, 0]} />
      <meshStandardMaterial color="#1c1408" emissive={accent} emissiveIntensity={0.5} flatShading roughness={0.8} />
    </mesh>
  )
}

function Wire({ accent }) {
  return (
    <mesh>
      <torusKnotGeometry args={[2.4, 0.7, 90, 12]} />
      <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.9} wireframe />
    </mesh>
  )
}

const FORMS = { sambhav: Ringed, samtechy: Smooth, flappy: LowPoly, portfolio: Wire }
const OFFSETS = [
  [-10, 1, 4],
  [11, -2, -14],
  [-11, 3, -32],
  [10, 0, -50],
]

import { profile } from '@/content/profile'

export default function ProjectWorlds() {
  return (
    <group>
      <pointLight position={posOf('worlds', 0, 18, -20)} intensity={400} color="#ffffff" />
      {profile.projects.map((p, i) => {
        const Form = FORMS[p.id]
        return (
          <Float key={p.id} speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
            <group position={posOf('worlds', ...OFFSETS[i])}>
              <Form accent={p.accent} />
            </group>
          </Float>
        )
      })}
    </group>
  )
}
```

(Note: keep the `import { profile }` statement at the top of the file with the other imports when writing the real file.)

- [ ] **Step 2: Write `components/chapters/Worlds.jsx`** (cards alternate sides so planets peek out behind them)

```jsx
'use client'

import { motion } from 'framer-motion'
import Chapter from './Chapter'
import SectionLabel from '@/components/ui/SectionLabel'
import { profile } from '@/content/profile'

export default function Worlds() {
  return (
    <Chapter id="worlds">
      <SectionLabel pre="Chapter 03 · Worlds" title="Projects I've Shipped" />
      <div className="flex flex-col gap-[14vh]">
        {profile.projects.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 70, rotateX: 6 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className={`glass w-full max-w-xl rounded-3xl p-7 md:p-9 ${i % 2 ? 'self-end' : 'self-start'}`}
            style={{ boxShadow: `0 24px 80px rgba(0,0,0,0.45), 0 0 0 1px ${p.accent}22` }}
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-xs text-dim">0{i + 1}</span>
              <span
                className="rounded-full px-3 py-0.5 text-[11px] font-semibold"
                style={{ background: `${p.accent}1f`, color: p.accent, border: `1px solid ${p.accent}44` }}
              >
                {p.type}
              </span>
            </div>
            <h3 className="font-display text-3xl font-bold md:text-4xl">{p.name}</h3>
            <p className="mt-3 leading-relaxed text-dim">{p.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-star/80">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-5">
              {p.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.href.startsWith('/') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="text-sm font-semibold transition-colors hover:underline"
                  style={{ color: p.accent }}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </Chapter>
  )
}
```

- [ ] **Step 3: Mount** `<ProjectWorlds />` in `Scene.jsx` and `<Worlds />` in `app/page.jsx` (filter list grows to include `'worlds'`).

- [ ] **Step 4: Visual check** — scroll through 40–65%: each card slides in alternating left/right with a glowing 3D body drifting on the opposite side; all four forms visibly distinct; APK link present on Flappy Bird card.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: worlds chapter - four project planets with holo cards"
```

---

### Task 10: Chapter 5 — Systems (orbital skill rings)

**Files:**
- Create: `components/chapters/Systems.jsx`, `components/voyage/SkillRings.jsx`
- Modify: `components/voyage/Scene.jsx`, `app/page.jsx`

- [ ] **Step 1: Write `components/voyage/SkillRings.jsx`** (one tilted ring per skill category, dots = tags)

```jsx
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { posOf } from '@/lib/chapters'
import { profile } from '@/content/profile'

function Ring({ radius, tilt, speed, color, dots }) {
  const ref = useRef()
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * speed
  })
  return (
    <group rotation={[tilt, 0.3, 0]}>
      <mesh>
        <torusGeometry args={[radius, 0.03, 8, 96]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} transparent opacity={0.5} />
      </mesh>
      <group ref={ref}>
        {Array.from({ length: dots }, (_, i) => {
          const a = (i / dots) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]}>
              <sphereGeometry args={[0.18, 12, 12]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.2} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

export default function SkillRings() {
  return (
    <group position={posOf('systems', 0, 0, -24)}>
      {profile.skills.map((s, i) => (
        <Ring
          key={s.category}
          radius={4 + i * 2.1}
          tilt={Math.PI / 2.4 + i * 0.12}
          speed={(i % 2 ? -1 : 1) * (0.25 - i * 0.025)}
          color={s.color}
          dots={s.tags.length}
        />
      ))}
      <mesh>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshStandardMaterial color="#e8ecff" emissive="#9bb8ff" emissiveIntensity={1.6} />
      </mesh>
    </group>
  )
}
```

- [ ] **Step 2: Write `components/chapters/Systems.jsx`**

```jsx
'use client'

import Chapter from './Chapter'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { profile } from '@/content/profile'

export default function Systems() {
  return (
    <Chapter id="systems">
      <SectionLabel pre="Chapter 04 · Systems" title="Technical Arsenal" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((skill, i) => (
          <Reveal key={skill.category} delay={i * 0.08}>
            <article className="glass h-full rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: skill.color, boxShadow: `0 0 10px ${skill.color}` }} />
                <h3 className="font-display text-base font-bold" style={{ color: skill.color }}>
                  {skill.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md px-2.5 py-1 font-mono text-xs"
                    style={{ background: `${skill.color}14`, color: skill.color, border: `1px solid ${skill.color}30` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Chapter>
  )
}
```

- [ ] **Step 3: Mount** both (Scene + page; filter grows to `'systems'`).

- [ ] **Step 4: Visual check** — scroll ~72%: six color-coded glass skill cards over a rotating ring system with orbiting glow dots.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: systems chapter - orbital skill rings"
```

---

### Task 11: Chapters 6–7 — Destination + Transmission (and finalize homepage)

**Files:**
- Create: `components/chapters/Destination.jsx`, `components/chapters/Transmission.jsx`, `components/voyage/DestinationPlanet.jsx`
- Modify: `components/voyage/Scene.jsx`, `app/page.jsx`

- [ ] **Step 1: Write `components/voyage/DestinationPlanet.jsx`**

```jsx
'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { posOf } from '@/lib/chapters'
import { glowTexture } from '@/lib/glow'

export default function DestinationPlanet() {
  const planet = useRef()
  const moon = useRef()
  const tex = useMemo(() => glowTexture(), [])
  const center = posOf('destination', 0, -2, -30)

  useFrame((state, dt) => {
    if (planet.current) planet.current.rotation.y += dt * 0.05
    if (moon.current) {
      const t = state.clock.elapsedTime * 0.4
      moon.current.position.set(Math.cos(t) * 11, Math.sin(t * 0.7) * 2, Math.sin(t) * 11)
    }
  })

  return (
    <group position={center}>
      <sprite scale={[46, 46, 1]}>
        <spriteMaterial map={tex} color="#a78bfa" transparent opacity={0.45} depthWrite={false} />
      </sprite>
      <mesh ref={planet}>
        <sphereGeometry args={[7, 56, 56]} />
        <meshStandardMaterial color="#2a1457" emissive="#7c3aed" emissiveIntensity={0.6} roughness={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[10.5, 0.18, 8, 100]} />
        <meshStandardMaterial color="#6ee7ff" emissive="#6ee7ff" emissiveIntensity={1.2} transparent opacity={0.8} />
      </mesh>
      <mesh ref={moon}>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshStandardMaterial color="#e8ecff" emissive="#bfe9ff" emissiveIntensity={1.4} />
      </mesh>
      <pointLight position={[16, 10, 16]} intensity={320} color="#a78bfa" />
    </group>
  )
}
```

- [ ] **Step 2: Write `components/chapters/Destination.jsx`**

```jsx
'use client'

import Chapter from './Chapter'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { profile } from '@/content/profile'

export default function Destination() {
  return (
    <Chapter id="destination" className="items-center text-center">
      <SectionLabel center pre="Chapter 05 · Destination" title="Where This Voyage Leads" />
      <Reveal className="max-w-2xl">
        <p className="text-lg leading-relaxed text-star/90 md:text-xl">{profile.vision}</p>
      </Reveal>
      <Reveal delay={0.15} className="mt-14 w-full">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
          {profile.stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl px-4 py-6">
              <div className="gradient-text font-display text-4xl font-bold">{s.value}</div>
              <div className="mt-2 text-xs leading-snug text-dim">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </Chapter>
  )
}
```

- [ ] **Step 3: Write `components/chapters/Transmission.jsx`**

```jsx
'use client'

import Link from 'next/link'
import Chapter from './Chapter'
import Reveal from '@/components/ui/Reveal'
import Magnetic from '@/components/ui/Magnetic'
import { profile } from '@/content/profile'

export default function Transmission() {
  return (
    <Chapter id="transmission" className="items-center text-center">
      <Reveal>
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">Final Chapter · Transmission</div>
        <h2 className="gradient-text mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
          Open a channel
        </h2>
        <p className="mx-auto mt-6 max-w-lg leading-relaxed text-dim">
          Whether you're an admissions officer, a fellow builder, or just curious — my inbox is open.
        </p>
      </Reveal>
      <Reveal delay={0.15} className="mt-10 flex flex-col items-center gap-6">
        <Magnetic>
          <a
            href={`mailto:${profile.email}?subject=Hello%20Lakshya`}
            className="inline-block rounded-full bg-cyan px-10 py-4 font-display text-lg font-bold text-void transition-shadow hover:shadow-[0_0_40px_#6ee7ff66]"
          >
            {profile.email}
          </a>
        </Magnetic>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-sm">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-dim transition-colors hover:text-cyan">
              {s.label} ↗
            </a>
          ))}
          <Link href="/resume" className="text-dim transition-colors hover:text-cyan">
            Resume →
          </Link>
        </div>
      </Reveal>
    </Chapter>
  )
}
```

- [ ] **Step 4: Finalize `app/page.jsx`** — all placeholders gone:

```jsx
import VoyageCanvas from '@/components/voyage/VoyageCanvas'
import Launch from '@/components/chapters/Launch'
import Pilot from '@/components/chapters/Pilot'
import FlightPath from '@/components/chapters/FlightPath'
import Worlds from '@/components/chapters/Worlds'
import Systems from '@/components/chapters/Systems'
import Destination from '@/components/chapters/Destination'
import Transmission from '@/components/chapters/Transmission'

export default function Home() {
  return (
    <>
      <VoyageCanvas />
      <main className="relative z-10 pt-14">
        <Launch />
        <Pilot />
        <FlightPath />
        <Worlds />
        <Systems />
        <Destination />
        <Transmission />
      </main>
    </>
  )
}
```

Also mount `<DestinationPlanet />` and a second `<Nebula center={posOf('destination', 0, 6, -10)} count={6} />` in `Scene.jsx`.

- [ ] **Step 5: Full-page visual pass** — Playwright: screenshot at 0%, 15%, 30%, 45%, 60%, 75%, 90%, 100% scroll on a 1440×900 viewport. Verify every chapter's text is legible against the scene, the destination planet appears behind the vision text, and the final CTA is centered. Fix any text-contrast issues by darkening the glass (`bg-black/30`) where needed.

- [ ] **Step 6: Commit**

```powershell
git add -A
git commit -m "feat: destination and transmission chapters - homepage voyage complete"
```

---

### Task 12: /about page

**Files:**
- Create: `app/about/page.jsx` (replace placeholder), `components/pages/AboutContent.jsx`

- [ ] **Step 1: Write `app/about/page.jsx`** (server shell exports metadata)

```jsx
import AboutContent from '@/components/pages/AboutContent'

export const metadata = {
  title: 'About',
  description:
    'Lakshya Badjatya is a Class 12 PCM student from Kota, India, aspiring to study Computer Science internationally starting Fall 2027.',
}

export default function AboutPage() {
  return <AboutContent />
}
```

- [ ] **Step 2: Write `components/pages/AboutContent.jsx`**

```jsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import StaticSky from '@/components/voyage/StaticSky'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { profile } from '@/content/profile'

export default function AboutContent() {
  const [quotes, setQuotes] = useState([])

  useEffect(() => {
    fetch('/quotes.txt')
      .then((r) => r.text())
      .then((text) => {
        const lines = text.split('\n').filter(Boolean)
        setQuotes(
          lines.map((line) => {
            const [quote, author] = line.split('|')
            return { quote: quote.trim(), author: author?.trim() }
          }),
        )
      })
      .catch(() => {})
  }, [])

  return (
    <>
      <StaticSky />
      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-32 md:px-10">
        <header className="mb-16 flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
          <Reveal>
            <Image
              src="/img/profile-photo.webp"
              alt="Lakshya Badjatya"
              width={180}
              height={180}
              className="rounded-3xl ring-1 ring-white/15"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="gradient-text font-display text-5xl font-bold tracking-tight md:text-6xl">About Me</h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-dim">{profile.about.lead}</p>
          </Reveal>
        </header>

        <section className="mb-20 grid gap-5 sm:grid-cols-2">
          {profile.about.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.07} className={i === profile.about.cards.length - 1 ? 'sm:col-span-2' : ''}>
              <article className="glass h-full rounded-2xl p-7">
                <div className="text-3xl">{card.emoji}</div>
                <h3 className="mt-4 font-display text-xl font-bold">{card.title}</h3>
                <p className="mt-2 leading-relaxed text-dim">{card.text}</p>
              </article>
            </Reveal>
          ))}
        </section>

        <section className="mb-20">
          <SectionLabel pre="My Path" title="Journey" />
          <div className="relative ml-2 border-l border-cyan/20 pl-8">
            {profile.timeline.map((event, i) => (
              <Reveal key={event.year} delay={i * 0.06} className="relative mb-10 last:mb-0">
                <span className="absolute -left-[41px] top-1 h-3.5 w-3.5 rounded-full bg-cyan shadow-[0_0_12px_#6ee7ff]" />
                <div className="font-mono text-sm font-semibold text-cyan">{event.year}</div>
                <h3 className="mt-1 font-display text-xl font-bold">{event.label}</h3>
                <p className="mt-1 max-w-xl text-dim">{event.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {quotes.length > 0 && (
          <Reveal>
            <section className="glass rounded-3xl p-10 text-center">
              <h3 className="font-display text-2xl font-bold">✨ Personal Favorite Quotes</h3>
              <div className="mt-8 space-y-7">
                {quotes.map((q, i) => (
                  <blockquote key={i} className="text-lg italic leading-relaxed text-star/90">
                    “{q.quote}”
                    <footer className="mt-2 text-sm not-italic text-dim">— {q.author}</footer>
                  </blockquote>
                ))}
              </div>
            </section>
          </Reveal>
        )}
      </main>
    </>
  )
}
```

- [ ] **Step 3: Verify** — `npm run build` passes; Playwright screenshot of `/about`: photo, lead, 5 cards, timeline, quotes.

- [ ] **Step 4: Commit**

```powershell
git add -A
git commit -m "feat: about page - story cards, timeline, quotes"
```

---

### Task 13: /projects page

**Files:**
- Create: `app/projects/page.jsx` (replace placeholder), `components/pages/ProjectsContent.jsx`

- [ ] **Step 1: Write `app/projects/page.jsx`**

```jsx
import ProjectsContent from '@/components/pages/ProjectsContent'

export const metadata = {
  title: 'Projects',
  description:
    'Production apps shipped by Lakshya Badjatya: Sambhav Services, SamTechy, Flappy Bird, and this 3D portfolio.',
}

export default function ProjectsPage() {
  return <ProjectsContent />
}
```

- [ ] **Step 2: Write `components/pages/ProjectsContent.jsx`**

```jsx
'use client'

import StaticSky from '@/components/voyage/StaticSky'
import Reveal from '@/components/ui/Reveal'
import { profile } from '@/content/profile'

export default function ProjectsContent() {
  return (
    <>
      <StaticSky />
      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-32 md:px-10">
        <header className="mb-16 text-center">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">Mission Log</div>
            <h1 className="gradient-text mt-3 font-display text-5xl font-bold tracking-tight md:text-6xl">Projects</h1>
            <p className="mx-auto mt-4 max-w-xl text-dim">
              Every world I've built — from a first Unity game to enterprise platforms serving real businesses.
            </p>
          </Reveal>
        </header>

        <div className="space-y-10">
          {profile.projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <article className="glass rounded-3xl p-8 md:p-10" style={{ boxShadow: `0 0 0 1px ${p.accent}22` }}>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-mono text-sm text-dim">0{i + 1}</span>
                  <h2 className="font-display text-3xl font-bold md:text-4xl">{p.name}</h2>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ background: `${p.accent}1f`, color: p.accent, border: `1px solid ${p.accent}44` }}
                  >
                    {p.type}
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {p.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 leading-relaxed text-star/85">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.accent }} />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-star/80">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-5">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target={l.href.startsWith('/') ? undefined : '_blank'}
                      rel="noreferrer"
                      download={l.href.endsWith('.apk') ? '' : undefined}
                      className="rounded-full border px-5 py-2 text-sm font-semibold transition-colors"
                      style={{ borderColor: `${p.accent}55`, color: p.accent }}
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </main>
    </>
  )
}
```

- [ ] **Step 3: Verify** — build passes; Playwright screenshot: 4 detailed project articles, APK download button on Flappy Bird.

- [ ] **Step 4: Commit**

```powershell
git add -A
git commit -m "feat: projects page - full mission log with APK download"
```

---

### Task 14: /resume page (printable)

**Files:**
- Create: `app/resume/page.jsx` (replace placeholder), `components/pages/ResumeContent.jsx`

- [ ] **Step 1: Write `app/resume/page.jsx`**

```jsx
import ResumeContent from '@/components/pages/ResumeContent'

export const metadata = {
  title: 'Resume',
  description:
    'Resume of Lakshya Badjatya — self-taught developer, 7+ production apps shipped, seeking international CS undergraduate admission (Fall 2027).',
}

export default function ResumePage() {
  return <ResumeContent />
}
```

- [ ] **Step 2: Write `components/pages/ResumeContent.jsx`**

```jsx
'use client'

import StaticSky from '@/components/voyage/StaticSky'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { profile } from '@/content/profile'

function InfoCard({ icon, title, children }) {
  return (
    <article className="glass rounded-2xl p-6">
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-3 font-display text-lg font-bold">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-dim">{children}</div>
    </article>
  )
}

export default function ResumeContent() {
  return (
    <>
      <StaticSky />
      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-32 md:px-10 print:max-w-none print:px-0 print:pt-4">
        <header className="mb-12 text-center">
          <Reveal>
            <h1 className="gradient-text font-display text-5xl font-bold tracking-tight md:text-6xl">
              {profile.name}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-dim print:text-black">
              Class 12 PCM student from Kota, India with a passion for building production-grade applications.
              Aspiring to study Computer Science internationally, Fall 2027.
            </p>
            <button
              onClick={() => window.print()}
              className="no-print mt-6 rounded-full border border-cyan/40 bg-cyan/10 px-6 py-2 font-mono text-sm text-cyan transition-colors hover:bg-cyan/20"
            >
              Print / Save as PDF
            </button>
          </Reveal>
        </header>

        <section className="mb-14 grid gap-5 md:grid-cols-3">
          <Reveal>
            <InfoCard icon="📩" title="Contact">
              <strong>Email:</strong> {profile.email}<br />
              <strong>Phone:</strong> {profile.phone}<br />
              <strong>Location:</strong> {profile.location}<br />
              <strong>Website:</strong> {profile.site}
            </InfoCard>
          </Reveal>
          <Reveal delay={0.07}>
            <InfoCard icon="🎯" title="Objective">{profile.objective}</InfoCard>
          </Reveal>
          <Reveal delay={0.14}>
            <InfoCard icon="🎓" title="Education">
              <strong>{profile.education.title}</strong><br />
              {profile.education.detail}<br />
              {profile.education.extra}
            </InfoCard>
          </Reveal>
        </section>

        <section className="mb-14">
          <SectionLabel pre="Expertise" title="Technical Skills" />
          <div className="grid gap-5 sm:grid-cols-2">
            {profile.skills.map((skill, i) => (
              <Reveal key={skill.category} delay={i * 0.05}>
                <article className="glass rounded-2xl p-6">
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: skill.color, boxShadow: `0 0 8px ${skill.color}` }} />
                    <h3 className="font-display font-bold" style={{ color: skill.color }}>{skill.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map((tag) => (
                      <span key={tag} className="rounded-md px-2 py-0.5 font-mono text-xs" style={{ background: `${skill.color}14`, color: skill.color, border: `1px solid ${skill.color}30` }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionLabel pre="Featured Work" title="Projects" />
          <div className="space-y-6">
            {profile.projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <article className="glass rounded-2xl p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                    <span className="rounded-full px-3 py-0.5 text-xs font-semibold" style={{ background: `${p.accent}1f`, color: p.accent, border: `1px solid ${p.accent}44` }}>
                      {p.type}
                    </span>
                  </div>
                  <div className="mt-1 font-mono text-xs text-dim">{p.stack.join(' · ')}</div>
                  <ul className="mt-4 space-y-2">
                    {p.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed text-star/85">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-dim" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionLabel pre="My Path" title="Timeline" />
          <div className="relative ml-2 border-l border-cyan/20 pl-8">
            {profile.timeline.map((event, i) => (
              <Reveal key={event.year} delay={i * 0.04} className="relative mb-8 last:mb-0">
                <span className="absolute -left-[37px] top-1 h-3 w-3 rounded-full bg-cyan shadow-[0_0_10px_#6ee7ff]" />
                <div className="font-mono text-sm font-semibold text-cyan">{event.year}</div>
                <h3 className="font-display text-lg font-bold">{event.label}</h3>
                <p className="text-sm text-dim">{event.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section>
          <SectionLabel pre="Beyond Code" title="Activities & Interests" />
          <div className="grid gap-5 md:grid-cols-3">
            {profile.extras.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.06}>
                <InfoCard icon={e.icon} title={e.title}>{e.text}</InfoCard>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
```

- [ ] **Step 3: Verify print output** — Playwright: navigate to `/resume`, screenshot normal view; then `browser_evaluate` → `() => window.matchMedia('print').matches` is not sufficient — instead use Playwright's `browser_run_code_unsafe` or simply visually confirm the `@media print` rules by emulating: take a screenshot after `document.documentElement.classList` check; minimum bar: build passes, page renders, the Print button exists. (Full print fidelity is manually checked in Task 16.)

- [ ] **Step 4: Commit**

```powershell
git add -A
git commit -m "feat: printable resume page"
```

---

### Task 15: 404 page, legacy cleanup

**Files:**
- Create: `app/not-found.jsx`
- Delete: `public/fonts/`, `public/img/*` legacy files (keep `profile-photo.webp`), `public/favicon/browserconfig.xml` stays, old mock images

- [ ] **Step 1: Write `app/not-found.jsx`**

```jsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="font-mono text-xs uppercase tracking-[0.35em] text-cyan">signal lost</div>
      <h1 className="gradient-text mt-4 font-display text-7xl font-bold md:text-9xl">404</h1>
      <p className="mt-4 max-w-md text-dim">
        This sector of space is uncharted. The page you're looking for drifted beyond the map.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-cyan/40 bg-cyan/10 px-7 py-2.5 font-mono text-sm text-cyan transition-colors hover:bg-cyan/20"
      >
        ← return to the voyage
      </Link>
    </main>
  )
}
```

- [ ] **Step 2: Delete legacy assets no longer referenced**

```powershell
git rm -r -q public/fonts
git rm -q public/img/data-strings-01.svg public/img/data-strings-21.svg public/img/dataism-24-black.svg public/img/dataism-24.svg public/img/portfolio-mock_single-bg.png
# remove old project mock directories if present
if (Test-Path public/img/msc-mock_stack) { git rm -r -q public/img/msc-mock_stack }
if (Test-Path "public/img/01.webp") { git rm -q "public/img/01.webp" }
```

Then run `npx next build` — if the build or any page references a deleted asset, restore that one file.

- [ ] **Step 3: Grep for dangling references**

Run: `grep -rn "img/data-strings\|img/dataism\|fonts/calibre\|js/meshCanvas" app components lib content` (via the Grep tool)
Expected: no matches.

- [ ] **Step 4: Verify** — `npm test` and `npm run build` both pass; Playwright: navigate to `/nonexistent` → themed 404; navigate to `/aboutme` → lands on `/about` (redirect).

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: themed 404 and legacy asset cleanup"
```

---

### Task 16: Full verification, polish pass, and merge

**Files:** polish-only edits where verification reveals issues.

- [ ] **Step 1: Automated checks**

Run: `npm test` → all suites pass. Run: `npm run build` → success, note first-load JS sizes (the `/` route will be heavy due to three.js — confirm it's lazy-loaded by checking that `/about` first-load is dramatically smaller).

- [ ] **Step 2: Desktop walkthrough (Playwright, 1440×900)** — navigate `http://localhost:3000`, screenshot at scroll 0/0.15/0.3/0.45/0.6/0.75/0.9/1.0. Checklist: every chapter legible, camera motion visible between shots, no z-fighting or clipped text, console free of errors.

- [ ] **Step 3: Mobile walkthrough (Playwright, 390×844 via `browser_resize`)** — same scroll sweep. Checklist: tier-1 path active (no postprocessing — verify via `browser_evaluate` that `window.devicePixelRatio` rendering still smooth; practical proxy: scroll feels responsive in trace), typography scales down, cards full-width, nav links fit.

- [ ] **Step 4: Fallback checks**
  - Reduced motion: in Playwright run `browser_run_code_unsafe` with `page.emulateMedia({ reducedMotion: 'reduce' })`, reload `/` → StaticSky gradient background, content readable by plain scroll, no canvas.
  - All four pages reachable from navbar; all old URLs redirect (`/aboutme`, `/articles`, `/case-studies`, `/download`, `/projects/flappy-bird`).
  - `/downloads/Flappy.apk` returns the APK (200).
  - `/resume` → print emulation (`page.emulateMedia({ media: 'print' })`) screenshot: white background, black text, no nav/footer.

- [ ] **Step 5: Polish** — fix anything the walkthroughs surfaced (contrast, spacing, camera waypoint tuning in `lib/chapters.js` x/y values, particle counts). Re-screenshot after each fix. Keep fixes small and committed together.

- [ ] **Step 6: Final commit**

```powershell
git add -A
git commit -m "polish: verification pass fixes for voyage redesign"
```

- [ ] **Step 7: Integration** — use the superpowers:finishing-a-development-branch skill: present merge-to-main / PR options to Lakshya. Old site code remains in git history; nothing is lost.

---

## Self-review notes

- **Spec coverage:** Content Inventory → Task 2 (profile.js + integrity tests). 7 chapters → Tasks 6–11. Adaptive perf + fallbacks → Tasks 3, 5, 16. Subpages → Tasks 12–14. Redirects/404/cleanup → Tasks 1, 15. SEO/schema → Task 1 layout. Quotes feature → Task 12. APK download → Tasks 2, 13, 16. Print resume → Tasks 1 (CSS), 14, 16.
- **Known tuning points (intentional, not placeholders):** camera waypoint x/y values, particle counts, nebula opacities — these are seeded with concrete values above and refined in Task 16 Step 5 against screenshots.
- **Type consistency check:** `scrollState.progress` (lib/scroll) read by CameraRig + Constellation; `localProgress/posOf/zOf/cameraTarget/SEGMENTS/CHAPTERS` signatures match across Tasks 2/5/8/9/10/11; `profile` field names used by chapters/pages match Task 2's shape; `detectTier` injected-params shape matches tests.
