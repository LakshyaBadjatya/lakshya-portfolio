# SEO Handoff — Lakshya Badjatya / Sammed Technosol

**Goal:** Rank #1 for **"Lakshya Badjatya"** and own the SERP for **"CTO of Sammed Technosol"**, while keeping the portfolio a strong international undergraduate (CS, Fall 2027) application piece.

**Date:** 2026-06-29 · **Canonical host chosen:** `https://sukhma.in` (bare) · `https://www.samtechnos.com` (company)

---

## ✅ What was already done in code (both repos build clean)

### Portfolio — `sukhma.in` (`e:/My Portfolio/portfolio`)
- **Dual-positioning title/description** now lead with *"CTO at Sammed Technosol"* and keep *"Student Developer & CS Applicant / Fall 2027"*.
- **Enriched JSON-LD `@graph`** in `app/layout.jsx`: `Person` (with `jobTitle`, `worksFor`, `address`, `knowsAbout`, `sameAs`) + `Organization` + `WebSite`. No fabricated fields.
- **Visible, first-paint CTO line** under the hero H1 + CTO in roles, tagline, objective, about lead, and a new **Experience** entry on the resume (with a followed link to samtechnos.com).
- **CTO role surfaced** on the Sammed project card (home + projects page).
- **Canonical tags** on every page + **www→non-www 308 redirect** (`next.config.mjs`).
- **Dynamic `app/sitemap.js` + `app/robots.js`** (with `lastmod`, correct host) replacing stale static files; real **`app/manifest.js`**.
- **Crawlability fix:** scroll-triggered reveals (`whileInView`) → mount-triggered (`animate`) so Google's renderer sees all content, not `opacity:0`. CSS safety-net added.
- OG image corrected (`og-image.jpg`, 1200×630) + Twitter card; fonts `display: 'swap'`.

### Company — `samtechnos.com` (`D:/VS code projects/SammedTechnos`)
- `/leadership` now emits **Person JSON-LD** for each founder — Lakshya as `Co-Founder & CTO`, `worksFor` the Org, `sameAs: ["https://sukhma.in", …]`.
- **Organization** now references founders/employees by **the same `@id` the portfolio uses** → Google merges the two into one entity.
- A **visible, followed `Portfolio ↗` link to sukhma.in** on the leadership card (intentionally NOT `nofollow`).
- Leadership page metadata now names the people ("…Lakshya Badjatya (Co-Founder & CTO)…").

> ⚠️ **These changes are committed to neither repo yet and not deployed.** Review, commit, and deploy both sites (Vercel) for any of this to take effect.

---

## 🔴 Do these manually — in priority order

### 1. Confirm the canonical host (5 min) — *everything depends on this*
The code standardizes on **bare `https://sukhma.in`**. In **Vercel → portfolio project → Settings → Domains**, make sure `sukhma.in` is the **primary** domain and `www.sukhma.in` **redirects** to it (the code adds an app-level redirect too, but the platform setting is authoritative). If you'd rather use `www`, tell me and I'll flip every URL string in one pass.

### 2. Verify Googlebot can actually crawl both sites — *nothing ranks until this is true*
The SERP research saw `sukhma.in` return **403 to bots**. In **Google Search Console → URL Inspection → Test Live URL** for `https://sukhma.in/`:
- If it shows **"URL is available to Google"** → good.
- If blocked/403 → it's a bot-protection/WAF rule (e.g. Vercel firewall). Allow verified Googlebot at the platform level. This is config, not code.
Do the same live test for `https://www.samtechnos.com/leadership`.

### 3. Fix the LinkedIn URL — *blocks a Knowledge Panel*
The code uses your known URL `https://www.linkedin.com/in/lakshya-badjatya-a12a77399/`. The SERP research **guessed** a cleaner `in.linkedin.com/in/lakshya-badjatya` ranks — **I did NOT use that unverified URL** (it could point at the wrong person).
- **Action:** open your LinkedIn → set ONE custom public URL (ideally `linkedin.com/in/lakshya-badjatya`) → tell me the exact final URL and I'll standardize it across both repos + the redirects.

### 4. Resolve the role/brand collision across your profiles
- **GitHub bio** currently says *"Founder of SamTechy"* → change to **"CTO, Sammed Technosol — sukhma.in"**. (Keep "SamTechy" as a *product* name only, never the company.)
- **dev.to + Medium** bios → "CTO of Sammed Technosol", link `sukhma.in`, and use the **same headshot** as the site/LinkedIn (image consistency helps Google reconcile the entity).

### 5. Deploy, then submit to Search Console (both sites)
After deploying:
- **Submit sitemaps:** `https://sukhma.in/sitemap.xml` and `https://www.samtechnos.com/sitemap.xml` in GSC + Bing.
- **Request Indexing** (URL Inspection) for: `sukhma.in/`, `/about`, `/resume`, and `https://www.samtechnos.com/leadership`.
- Re-run **URL Inspection → View Rendered HTML** on `sukhma.in/` to confirm the CTO text is visible (not `opacity:0`).
- Validate both with the **Rich Results Test** / **Schema Markup Validator** — confirm the Person resolves with `worksFor` the Organization and `sameAs` linking the two domains.

### 6. Build the authoritative off-page entities (what the namesakes have, you don't)
Do in this order (each feeds the next):
1. **LinkedIn Company Page** for "Sammed Technosol" (Kota, est. 2026); list yourself as CTO.
2. **Crunchbase** organization + a person entry tied to it (common Knowledge-Panel feeder).
3. **Wikidata** items (Person: occupation CTO, employer Sammed Technosol, website `sukhma.in`; + Organization) — the single biggest lever for a Knowledge Panel, but **only after #1–#2 exist** or it gets deleted for lack of notability.
4. Publish **2–3 dev.to/Medium articles** bylined *"Lakshya Badjatya, CTO of Sammed Technosol"* linking both sites — builds the co-citations Google uses to bind Person ↔ Org ↔ Domain. Always co-mention *"Sammed Technosol — Kota, Rajasthan, India, founded 2026, samtechnos.com"* to beat the sound-alike companies (Sammed Technologies-Ghana, SMD Technosol, etc.).

---

## 📅 Realistic timeline (after deploy + indexation)
- **"Lakshya Badjatya" → #1 organic:** ~6–12 weeks (low competition; mostly indexation + consistency).
- **"Sammed Technosol" / "CTO of Sammed Technosol" SERP ownership:** ~2–5 months once samtechnos.com is indexed.
- **Google Knowledge Panel:** ~3–6 months, and only after Wikidata + Crunchbase + perfectly consistent `sameAs` are all live. Not guaranteed.

---

## ❓ Open question for you
Confirm a couple of facts so the structured data stays 100% truthful (Google penalizes false schema; admissions readers do too):
- Your exact public title — code uses **"Chief Technology Officer"** (portfolio) / **"Co-Founder & CTO"** (company, from your existing data). OK as-is?
- CTO since **2026** (matches the company's founding date) — correct? It's shown on the resume Experience entry.
