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
  site: 'sukhma.in', // display text — not a URL; use socials[].href for links

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
      id: 'sammed',
      name: 'Sammed Technosol',
      type: 'Corporate Website',
      accent: '#ec4899',
      form: 'ringed',
      summary:
        'The official corporate website for Sammed Technosol — a storytelling-first marketing site with an editorial light design, a GSAP-driven product showcase, and a 56-route SEO content layer. Built and maintained as CTO.',
      stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'GSAP', 'Framer Motion'],
      bullets: [
        "Designed and engineered the company's marketing site as a storytelling-first experience — a minimal homepage flowing into dedicated Story, Journey, Impact, Leadership, and Vision pages.",
        'Built a 56-route static-generated SEO layer (services, industries, locations, blog, case studies) with full JSON-LD structured data, canonical metadata, and a generated sitemap.',
        'Created a GSAP + ScrollTrigger pinned horizontal product showcase that degrades to a clean vertical stack on mobile, with Lenis-driven smooth scroll synced to the GSAP ticker.',
        'Tuned for Core Web Vitals — the hero headline is the LCP element from first paint, behind a restrained editorial design system driven entirely by CSS tokens.',
      ],
      cover: '/projects/sammed/hero.jpeg',
      media: [
        { src: '/projects/sammed/hero.jpeg', alt: 'Sammed Technosol homepage hero — “Technology Built Around Real Business Problems”', w: 1440, h: 900 },
        { src: '/projects/sammed/ecosystem.jpeg', alt: 'The product ecosystem bar with the five Sammed products', w: 1440, h: 900 },
        { src: '/projects/sammed/products.jpeg', alt: 'Pinned horizontal product showcase with the products mega-menu open', w: 1440, h: 900 },
      ],
      links: [{ label: 'Live Site', href: 'https://samtechnos.com' }],
    },
    {
      id: 'puzzlecam',
      name: 'Puzzle Cam',
      type: 'Gesture-Controlled Game',
      accent: '#fbbf24',
      form: 'wire',
      summary:
        'A webcam photo-booth game with no mouse or keyboard — wave your hands to snap a selfie, then pinch tiles out of thin air to rebuild your shattered face. Built in vanilla JS with real-time MediaPipe hand tracking.',
      stack: ['Vanilla JS', 'MediaPipe Hands', 'HTML5 Canvas', 'WebRTC', 'No Build Step'],
      bullets: [
        'Built a fully gesture-controlled game where MediaPipe Hands turns the webcam into the only input device — show both hands to start, pinch to grab a tile, open your hand to drop and swap.',
        'Captures the player’s face, shatters it into a scrambled 3×3 / 4×4 / 5×5 sliding puzzle, detects the solved state, and drops each finished photo as black-and-white into a downloadable photo-booth strip.',
        'Architected around a single requestAnimationFrame loop and a guarded state machine (LOADING → IDLE → COUNTDOWN → CAPTURE → PUZZLE → SOLVED → STRIP) that rejects illegal transitions.',
        'Zero dependencies and no build step — pure HTML/CSS/JS, plus a self-playing demo mode that drives synthetic hands through the real gesture pipeline.',
      ],
      cover: '/projects/puzzle-cam/02-solving.png',
      media: [
        { src: '/projects/puzzle-cam/02-solving.png', alt: 'Puzzle Cam mid-solve — a face puzzle with the tracked-hand skeleton and gold pinch cursor', w: 1366, h: 623 },
        { src: '/projects/puzzle-cam/01-start.png', alt: 'Puzzle Cam start — face captured and shattered into a 3×3 grid', w: 1366, h: 623 },
        { src: '/projects/puzzle-cam/03-strip.png', alt: 'Puzzle Cam photo-booth strip filling with solved black-and-white photos', w: 1366, h: 623 },
      ],
      links: [{ label: 'GitHub', href: 'https://github.com/LakshyaBadjatya/Puzzel3D' }],
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

  now: {
    updated: 'June 2026',
    items: [
      { icon: '🎓', text: 'Class 12 PCM — Physics, Chemistry, and Mathematics coursework' },
      { icon: '📚', text: 'Preparing for IELTS, targeting Fall 2027 international CS admissions' },
      { icon: '🛠️', text: 'Evolving this 3D portfolio — a scroll-driven WebGL voyage built with React Three Fiber' },
      { icon: '✍️', text: 'Writing developer articles for Medium and Dev.to' },
    ],
  },

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
