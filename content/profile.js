// The one source of truth for the website, the CV PDF and the structured data.
// Copy rules, enforced by __tests__/profile.test.js: short lines; no tool or
// backend names in work, experience or bio text; IELTS only inside `languages`.
export const profile = {
  name: 'Lakshya Badjatya',
  nameLines: ['Lakshya', 'Badjatya'],
  role: 'Co-Founder & CTO, Sammed Technosol',
  headline: 'Building software that keeps labs and hospitals running.',
  location: 'Kota, India',
  email: 'lakshyabadjatya@gmail.com',
  url: 'https://sukhma.in',
  portrait: {
    src: '/img/portrait.png',
    alt: 'Portrait of Lakshya Badjatya in a navy suit',
    width: 408,
    height: 612,
  },

  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lakshya-badjatya/' },
    { label: 'GitHub', href: 'https://github.com/LakshyaBadjatya' },
    { label: 'Medium', href: 'https://medium.com/@lakshyabadjatya' },
    { label: 'Dev.to', href: 'https://dev.to/lakshyabadjatya' },
  ],

  work: [
    {
      id: 'samlab',
      number: '01',
      name: 'SamLab',
      tagline: 'Lab software that runs when the internet doesn’t.',
      lines: [
        'An offline-first system for pathology labs and hospitals, from registration and billing to the final report.',
        'Connects to lab analyzers, so results reach the report without retyping.',
        'Used by labs and hospitals across India and internationally.',
        'Built end to end with my father: the apps, our own backend and cloud sync.',
      ],
      meta: 'Desktop · Web · Android',
      links: [
        { label: 'samlablis.com', note: 'Global', href: 'https://samlablis.com' },
        { label: 'samlab.in', note: 'India', href: 'https://samlab.in' },
      ],
    },
    {
      id: 'sammed',
      number: '02',
      name: 'Sammed Technosol',
      tagline: 'Software for businesses that can’t afford downtime.',
      lines: [
        'Co-founded in 2026 in Kota, India. I lead engineering as CTO.',
        'I own the architecture across the company’s product suite.',
        'I designed and built the company website, home to the product line.',
      ],
      meta: 'Co-founded 2026 · Kota, India',
      links: [{ label: 'samtechnos.com', note: 'Company', href: 'https://www.samtechnos.com' }],
    },
  ],

  quote: ['Reliability is a feature', 'people notice only', 'when it’s missing.'],
  about:
    'I’m Lakshya, a developer from Kota, India. I got my first computer in 2020 and haven’t stopped building since: small games first, then websites and apps, and now SamLab, which labs and hospitals rely on. I co-founded Sammed Technosol, where I lead engineering, while finishing school in Physics, Chemistry and Maths.',

  experience: [
    {
      role: 'Co-Founder & CTO',
      org: 'Sammed Technosol',
      orgHref: 'https://www.samtechnos.com',
      place: 'Kota, India',
      period: 'June 2026 – present',
      lines: [
        'Lead engineering and architecture across the company’s product suite.',
        'Design offline-first, cloud-synced systems built for uptime.',
      ],
    },
  ],

  education: [
    {
      school: 'Disha Delphi Public School',
      place: 'Kota, India',
      detail: 'Higher Secondary · Physics, Chemistry, Mathematics',
      period: '2015 – 2027',
    },
  ],

  certificates: [
    {
      title: 'Introduction to Data Science and AI',
      issuer: 'IIT Madras · CODE School Connect',
      detail: '8-week course',
      date: 'April 2026',
      href: '/certificates/iitm-data-science-ai.jpg',
    },
    {
      title: 'Certificate of Appreciation',
      issuer: 'IIT Madras · CODE School Connect',
      detail: 'Exceptional work on the course’s take-home project',
      date: 'April 2026',
      href: '/certificates/iitm-appreciation.jpg',
    },
    {
      title: 'Claude Code in Action',
      issuer: 'Anthropic',
      detail: 'Verified certificate',
      date: 'April 2026',
      href: 'https://verify.skilljar.com/c/hwojudi6nxu4',
    },
  ],

  skills: [
    'Software architecture',
    'Offline-first & sync systems',
    'Product engineering',
    'Web development',
    'Cross-platform apps (desktop, web, mobile)',
    'UI/UX design',
    'Problem solving',
  ],

  languages: [
    { name: 'English', level: 'C1 (IELTS Academic 7.0)' },
    { name: 'Hindi', level: 'First language' },
  ],
}
