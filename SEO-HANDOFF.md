# SEO handoff: sukhma.in

What the site already does for search, and the few steps that can only be done outside the code.

## Already in the code

- **One canonical host.** `https://sukhma.in` is canonical and `www.sukhma.in` redirects to it (308).
- **One indexable page.** The sitemap lists only `https://sukhma.in/`. The internal render pages (`/og`, `/still`, `/cv/print`) are `noindex` and disallowed in `robots.txt`.
- **Old links keep working.** `/about`, `/resume`, `/projects/*`, `/case-studies`, `/articles` and the old download links redirect permanently to the matching section (`lib/redirects.mjs`).
- **Structured data.** A `Person` (Lakshya Badjatya, Co-Founder & CTO) that `worksFor` the `Organization` Sammed Technosol, plus the `WebSite` (`lib/schema.js`). The IDs match samtechnos.com's (`https://sukhma.in/#lakshya`, `https://www.samtechnos.com/#organization`), so search engines can join the two sites into one entity.
- **Crawlable text.** Every word is in the server-rendered HTML; the animations start after load.
- **Share card.** `public/og-image.png` (1200 × 630) is generated with the CV PDF by `npm run assets`.

## To do outside the code

1. **Vercel → Domains:** make `sukhma.in` the primary domain and redirect `www.sukhma.in` to it.
2. **Google Search Console** (and Bing Webmaster Tools): verify `sukhma.in`, submit `https://sukhma.in/sitemap.xml`, then run URL Inspection → Test live URL on `https://sukhma.in/`. If Googlebot is blocked, check the Vercel firewall rules.
3. **Retired pages:** Search Console will list them as "Page with redirect". That's expected; they drop out on their own.
4. **Rich results:** test `https://sukhma.in/` in the Rich Results Test and confirm the Person shows `worksFor` Sammed Technosol.
5. **Profiles:** use the same headshot and the same line, "Co-Founder & CTO, Sammed Technosol", linking to sukhma.in, on LinkedIn, GitHub, Medium and Dev.to.
