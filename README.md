# sukhma.in

Portfolio and CV of **Lakshya Badjatya**, Co-Founder & CTO of Sammed Technosol.
Live at https://sukhma.in

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # content, redirects, structured data, scroll maths and CV checks
npm run lint
```

## Content

Everything visitors read lives in `content/profile.js`. The website, the CV PDF and
the structured data are all built from it.

After changing it, regenerate the derived files (Google Chrome must be installed):

```bash
npm run assets  # builds, then writes the CV PDF, share image and 3D still into public/
```

`npm test` fails if the CV PDF is older than the content.
