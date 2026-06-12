# "Voyage" — 3D Immersive Portfolio Redesign

**Date:** 2026-06-12
**Status:** Approved by Lakshya
**Goal:** Replace the current portfolio (sukhma.in) with a 3D immersive scroll experience that impresses college admissions reviewers (target: international CS undergrad applications, Fall 2027) while preserving all existing "About Me" knowledge.

## Success criteria

- A reviewer opening the site on any device gets a smooth, visually stunning experience within 2 seconds, and can absorb the full story (who, journey, projects, skills, goal) in under 2 minutes of scrolling.
- The site itself functions as proof of technical skill (custom WebGL, not a template).
- Zero dead ends, zero lag, zero broken states — including phones, low-end laptops, and browsers without WebGL.
- All existing personal content/knowledge is preserved (see Content Inventory).

## Decisions made

| Decision | Choice |
|---|---|
| Audience | College admissions reviewers; profile-building for international applications |
| Structure | 3D immersive homepage + classic themed subpages |
| Pages kept | Home (3D), About, Projects, Resume — drop Articles, Case Studies, standalone download page (Flappy APK download folds into its project entry) |
| Mobile | Adaptive 3D — same scene, auto-reduced quality on weak devices |
| Codebase | Fresh rebuild; old code does not need to be retained |
| Theme | Deep-space journey ("Voyage") — chosen by Claude per "make it impress colleges" |

## Tech stack

- **Next.js** (latest, App Router; pages are client components since the site is animation-heavy) on Vercel
- **@react-three/fiber + @react-three/drei + @react-three/postprocessing** (three.js) — 3D
- **Lenis** — smooth scroll, drives camera progress
- **Framer Motion** — DOM/UI animation, page transitions
- **Tailwind CSS** — styling for all DOM UI
- **@vercel/analytics** — retained
- Old SCSS design system, unused API routes (`evotunes-signature`, `icon-form`, `feedback`), Calibre font files, and placeholder pages are deleted.

## Content inventory (single source of truth: `content/profile.js`)

All knowledge below is extracted from the current site and MUST survive the redesign:

- **Identity:** Lakshya Badjatya. Class 12 PCM student, Kota, India. Aspiring CS undergrad abroad, Fall 2027. Preparing for IELTS. Site: sukhma.in. Email: lakshyabadjatya@gmail.com.
- **Socials:** GitHub `LakshyaBadjatya`, LinkedIn `lakshya-badjatya-a12a77399`, Medium `@lakshyabadjatya`, Dev.to `lakshyabadjatya`.
- **Narrative:** Got first computer during COVID (2020) → curiosity became passion. Self-taught C#/Unity (2022, Flappy Bird clone) → HTML/CSS/JS + Flutter (2023) → shipped 7+ production apps across mobile/desktop/web (2024–25) → goal: CS abroad (2027). Long-term: build a technology startup creating products that solve real-world problems.
- **Timeline:** 2020 First Computer · 2022 First Project (Unity Flappy Bird) · 2023 Web + Mobile Dev · 2024–25 Shipped 7+ Apps · 2027 CS Abroad (goal).
- **Projects:**
  - **Sambhav Services App** — Flutter (Android + Windows), Firebase, Riverpod, GoRouter. Business management: staff/client/invoice/cash/task management, role-based access, invoice lifecycle (New→Packed→Delivered), 3-hour staff edit rule, custom neumorphic widget library (12+ components), 138 Dart files.
  - **SamTechy** — Enterprise SaaS field service platform. Flutter (Android, iOS, Windows, macOS), Firebase, Provider, FCM. 5 user roles with custom dashboards, ticketing, expense tracking, analytics, license key management, encrypted storage, Codemagic CI/CD.
  - **Flappy Bird clone** — Unity + C#, first project, learned programming logic. GitHub: LakshyaBadjatya/FlappyBird. APK download (`/downloads/Flappy.apk`).
  - **This portfolio (sukhma.in)** — Next.js/React. GitHub: LakshyaBadjatya/Personal-Portfolio.
- **Skills (6 categories):** Languages (Dart, JavaScript, TypeScript, C#, HTML5, CSS3) · Mobile & Desktop (Flutter, Android, iOS, Windows, macOS, Riverpod, Provider, GoRouter) · Web (React, Next.js, Node.js, Framer Motion, Tailwind, SCSS) · Backend & DB (Firebase Auth, Firestore, FCM, Cloud Storage, SQLite, JWT, BCrypt) · Game Dev (Unity, Game Physics, C# Scripting) · DevOps & Tools (Git, GitHub, Codemagic CI/CD, VS Code, Figma, Postman, RCON).
- **Personal side:** Badminton (discipline/balance), introverted (deep focus), 2–3 hours daily skill-building, technical writing on Medium/Dev.to, all projects open source.
- **Favorite quotes:** loaded from `public/quotes.txt` (keep the file and the feature).
- **SEO:** Person schema (sameAs links), OG tags, robots index/follow, author meta — preserved/improved.

## Architecture

### Homepage (`/`) — one persistent WebGL canvas, scroll-driven camera

Lenis scroll progress (0→1) maps to a camera path through 7 chapters. DOM content overlays the canvas in sync (HTML for text = crisp, accessible, SEO-indexable).

1. **Launch** — huge name typography, instanced starfield, horizon planet, role type-animation, scroll cue.
2. **The Pilot** — nebula drift; glass HUD panels: who-I-am story.
3. **Flight Path** — 2020→2027 constellation timeline; stars ignite and connect on scroll; 2027 star distinct/aspirational.
4. **Worlds** — 4 projects as orbiting 3D bodies with holographic info cards (stack, highlights, links).
5. **Systems** — 6 skill categories as orbital rings of badges.
6. **Destination** — radiant goal planet; vision statement.
7. **Transmission** — contact CTA (email), socials, resume link.

### Effects budget

Starfield (instanced points), nebula (shader/sprite-based), scroll-lerped camera, mouse parallax, bloom + vignette + subtle chromatic aberration + film grain, text reveal animations, magnetic buttons, custom cursor, page transitions. Taste rule: effects serve readability — admissions reviewers must never fight the UI to read content.

### Adaptive performance & fallbacks

- drei `PerformanceMonitor` + `AdaptiveDpr`: auto-degrade DPR, particle counts, post-effects when FPS drops.
- Device heuristics: mobile starts at reduced tier (fewer particles, no chromatic aberration/grain).
- `prefers-reduced-motion`: static hero, no camera flight, content readable by plain scroll.
- No WebGL / canvas failure: graceful static-gradient fallback with all content intact (error boundary around canvas).
- Lazy-load 3D bundle; lightweight DOM shell paints first.

### Subpages (classic, same visual language: dark space palette, glass panels)

- **/about** — hero, story cards (journey, projects & skills, academics, vision, personal side), timeline, quotes section.
- **/projects** — all 4 projects in depth (full Sambhav/SamTechy bullets), stack badges, GitHub links, Flappy APK download button.
- **/resume** — clean printable layout (print stylesheet), all resume content, download/print action.
- Shared glass navbar + footer (socials) on all pages.

### Error handling

- Canvas error boundary → static fallback, content never lost.
- `quotes.txt` fetch failure → section hidden (current behavior, kept).
- 404 page themed (lost-in-space).
- Old URLs (`/aboutme`, `/articles`, `/case-studies`, `/download`, `/projects/flappy-bird`) → redirects to nearest equivalent in `next.config` so external links never break.

### Testing & verification

- Build passes (`next build`), no ESLint errors.
- Playwright MCP visual verification of every chapter at desktop + mobile viewports.
- Manual checks: reduced-motion mode, WebGL-disabled fallback, print stylesheet on /resume, all redirects, APK download, Lighthouse performance sanity check.

## Implementation notes

- Use Magic (21st.dev) MCP for UI component inspiration and logo/tech-badge assets where useful.
- Keep `public/downloads/Flappy.apk`, profile photo, quotes.txt; delete unused legacy assets after the new site is verified.
- Single feature branch; old site remains on `main` until the redesign is verified, then merge.
