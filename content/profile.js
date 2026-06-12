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
      links: [{ label: 'GitHub Profile', href: 'https://github.com/LakshyaBadjatya' }],
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
      links: [{ label: 'GitHub Profile', href: 'https://github.com/LakshyaBadjatya' }],
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
