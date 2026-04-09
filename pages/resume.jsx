import Head from 'next/head'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import css from '../styles/sections/resume.module.scss'

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const cardPop = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease: [0.25, 0.4, 0.25, 1] },
  },
}

/* ─── Data ─── */
const skills = [
  {
    category: 'Languages',
    color: '#00ffcc',
    tags: ['Dart', 'JavaScript', 'TypeScript', 'C#', 'HTML5', 'CSS3'],
  },
  {
    category: 'Mobile & Desktop',
    color: '#a855f7',
    tags: ['Flutter', 'Android', 'iOS', 'Windows', 'macOS', 'Riverpod', 'Provider', 'GoRouter'],
  },
  {
    category: 'Web Development',
    color: '#3b82f6',
    tags: ['React', 'Next.js', 'Node.js', 'Framer Motion', 'Tailwind CSS', 'SCSS'],
  },
  {
    category: 'Backend & Database',
    color: '#f43f5e',
    tags: ['Firebase Auth', 'Firestore', 'FCM', 'Cloud Storage', 'SQLite', 'JWT', 'BCrypt'],
  },
  {
    category: 'Game Development',
    color: '#f59e0b',
    tags: ['Unity Engine', 'Game Physics', 'C# Scripting'],
  },
  {
    category: 'DevOps & Tools',
    color: '#10b981',
    tags: ['Git', 'GitHub', 'Codemagic CI/CD', 'VS Code', 'Figma', 'Postman', 'RCON'],
  },
]

const projects = [
  {
    name: 'Sambhav Services App',
    type: 'Business Management',
    typeColor: '#a855f7',
    stack: 'Flutter (Android + Windows Desktop) · Firebase · Riverpod · GoRouter',
    bullets: [
      'Engineered a full-featured cross-platform business management system with staff management, client tracking, invoice/bill management, cash accounting, and task reminders.',
      'Implemented role-based access control (Admin vs. Staff), real-time notifications, and a custom neumorphic UI widget library with 12+ reusable components.',
      'Built invoice lifecycle tracking (New \u2192 Packed \u2192 Delivered) with timeline history, cash book with running balance, and a 3-hour edit rule for staff entries.',
      'Features transport/courier company management, priority-based task reminders (Normal/Urgent), and persistent dark/light theme. Codebase spans 138 Dart files.',
    ],
    color: '#a855f7',
  },
  {
    name: 'SamTechy',
    type: 'Enterprise SaaS',
    typeColor: '#3b82f6',
    stack: 'Flutter (Android, iOS, Windows, macOS) · Firebase · Provider · FCM',
    bullets: [
      'Built a comprehensive field service management platform with 5 distinct user roles (Super Admin, Admin, Engineer, Dealer, Customer), each with a custom dashboard.',
      'Features include engineer ticketing, job management, expense tracking with date-range filters, analytics dashboard, license key management (SaaS-style), and push notifications via FCM.',
      'Implemented encrypted data storage for sensitive information, organization management system, and client master data management with real-time sync.',
      'Deployed to Android and iOS with automated CI/CD pipelines using Codemagic. Supports desktop (Windows/macOS) from a single codebase with responsive layouts.',
    ],
    color: '#3b82f6',
  },
]

const timeline = [
  { year: '2020', label: 'First Computer', desc: 'Got my first PC during COVID-19 \u2014 curiosity about software sparked instantly.' },
  { year: '2022', label: 'First Project', desc: 'Self-taught C# and Unity; built a Flappy Bird clone, learning programming logic hands-on.' },
  { year: '2023', label: 'Web + Mobile Dev', desc: 'Taught myself HTML, CSS, JS, and Flutter. Began building production applications.' },
  { year: '2024-25', label: 'Shipped 7+ Apps', desc: 'Shipped multiple enterprise-grade applications across mobile, desktop, and web platforms.' },
  { year: '2027', label: 'CS Abroad', desc: 'Goal: Study Computer Science internationally and build impactful products.' },
]

const extras = [
  { icon: '\uD83C\uDFF8', title: 'Badminton', text: 'Regular player \u2014 builds discipline, focus, and a balanced routine.', color: 'var(--neon-1-1)' },
  { icon: '\u270D\uFE0F', title: 'Technical Writing', text: 'Publishes articles on Medium and Dev.to sharing learnings with the developer community.', color: 'var(--secondary)' },
  { icon: '\uD83D\uDD13', title: 'Open Source', text: 'All projects are public on GitHub, reflecting commitment to open collaboration.', color: 'var(--neon-2-2)' },
]

/* ─── Animated section header ─── */
function SectionHeader({ preTitle, title }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  return (
    <motion.div
      ref={ref}
      className={css.sectionHeader}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className={css.sectionPre}>{preTitle}</div>
      <h2 className={css.sectionTitle}>{title}</h2>
    </motion.div>
  )
}

/* ─── Timeline item ─── */
function TimelineItem({ event, index }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  return (
    <div ref={ref} className={css.timelineItem}>
      <motion.div
        className={css.timelineYear}
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        {event.year}
      </motion.div>
      <motion.div
        className={css.timelineDot}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 15, delay: index * 0.1 + 0.1 }}
      />
      <motion.div
        className={css.timelineContent}
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.05 }}
        whileHover={{ x: 6, transition: { duration: 0.2 } }}
      >
        <div className={css.timelineLabel}>{event.label}</div>
        <div className={css.timelineDesc}>{event.desc}</div>
      </motion.div>
    </div>
  )
}

/* ─── Main page ─── */
export default function ResumePage() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 300], [0, -60])
  const heroOpacity = useTransform(scrollY, [0, 250], [1, 0])

  const { ref: skillsRef, inView: skillsInView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { ref: projectsRef, inView: projectsInView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { ref: extraRef, inView: extraInView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { ref: profilesRef, inView: profilesInView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <>
      <Head>
        <title>Resume | Lakshya Badjatya</title>
        <meta name="description" content="Resume of Lakshya Badjatya - Class 12 PCM student, aspiring CS undergrad, building production apps across web, mobile, and desktop." />
      </Head>

      <main className={css.resume}>

        {/* ═══════ HERO ═══════ */}
        <motion.section className={css.hero} style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div
            className={css.badge}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: 'var(--secondary)' }}
            />
            Open to Opportunities
          </motion.div>

          <motion.h1
            className={css.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            My Resume
          </motion.h1>

          <motion.p
            className={css.heroSub}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Class 12 PCM student from Kota, India with a passion for building production-grade
            applications. Aspiring to study Computer Science internationally, Fall 2027.
          </motion.p>
        </motion.section>

        {/* ═══════ CONTACT & OBJECTIVE ═══════ */}
        <motion.section
          className={css.infoGrid}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.div className={css.card} variants={cardPop}
            whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 50px rgba(0,0,0,0.3), 0 0 0 1px var(--secondary)', transition: { duration: 0.3 } }}
          >
            <div className={css.cardAccent} style={{ background: 'radial-gradient(circle at top right, rgba(127,234,255,0.15), transparent 70%)' }} />
            <span className={css.cardIcon}>&#128233;</span>
            <h3 className={css.cardTitle}>Contact</h3>
            <p className={css.cardText}>
              <strong>Email:</strong> lakshyabadjatya@gmail.com<br />
              <strong>Phone:</strong> +91 8619690342<br />
              <strong>Location:</strong> Kota, Rajasthan, India<br />
              <strong>Website:</strong> sukhma.in
            </p>
          </motion.div>

          <motion.div className={css.card} variants={cardPop}
            whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 50px rgba(0,0,0,0.3), 0 0 0 1px var(--neon-2-2)', transition: { duration: 0.3 } }}
          >
            <div className={css.cardAccent} style={{ background: 'radial-gradient(circle at top right, rgba(198,36,238,0.12), transparent 70%)' }} />
            <span className={css.cardIcon}>&#127919;</span>
            <h3 className={css.cardTitle}>Objective</h3>
            <p className={css.cardText}>
              Self-driven student with a proven passion for software development, having independently
              built and shipped 7+ production applications across web, mobile, and desktop platforms.
              Seeking admission to an international CS undergraduate program (Fall 2027).
            </p>
          </motion.div>

          <motion.div className={css.card} variants={cardPop}
            whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 50px rgba(0,0,0,0.3), 0 0 0 1px var(--neon-1-1)', transition: { duration: 0.3 } }}
          >
            <div className={css.cardAccent} style={{ background: 'radial-gradient(circle at top right, rgba(167,213,117,0.12), transparent 70%)' }} />
            <span className={css.cardIcon}>&#127891;</span>
            <h3 className={css.cardTitle}>Education</h3>
            <p className={css.cardText}>
              <strong>Senior Secondary (Class 12)</strong><br />
              PCM Stream &mdash; Kota, Rajasthan, India<br />
              Expected 2027 &bull; Preparing for IELTS<br />
              Focus on analytical thinking &amp; problem-solving
            </p>
          </motion.div>
        </motion.section>

        {/* ═══════ SKILLS ═══════ */}
        <section className={css.skillsSection}>
          <SectionHeader preTitle="Expertise" title="Technical Skills" />
          <motion.div
            ref={skillsRef}
            className={css.skillsGrid}
            variants={stagger}
            initial="hidden"
            animate={skillsInView ? 'visible' : 'hidden'}
          >
            {skills.map((skill, i) => (
              <motion.div
                key={skill.category}
                className={css.skillCard}
                variants={cardPop}
                whileHover={{ y: -6, boxShadow: `0 16px 40px rgba(0,0,0,0.2), 0 0 0 1px ${skill.color}33`, transition: { duration: 0.3 } }}
              >
                <div className={css.skillCategory}>
                  <span className={css.skillDot} style={{ background: skill.color, boxShadow: `0 0 10px ${skill.color}` }} />
                  <span style={{ color: skill.color }}>{skill.category}</span>
                </div>
                <div className={css.skillTags}>
                  {skill.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      className={css.skillTag}
                      style={{
                        background: `${skill.color}15`,
                        color: skill.color,
                        border: `1px solid ${skill.color}30`,
                      }}
                      whileHover={{ scale: 1.08, boxShadow: `0 4px 15px ${skill.color}25` }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ═══════ PROJECTS ═══════ */}
        <section className={css.projectsSection}>
          <SectionHeader preTitle="Featured Work" title="Projects" />
          <div ref={projectsRef}>
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                className={css.projectCard}
                initial={{ opacity: 0, y: 50, scale: 0.97 }}
                animate={projectsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: i * 0.2, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                whileHover={{ y: -6, boxShadow: `0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px ${project.color}33`, transition: { duration: 0.3 } }}
              >
                <div className={css.projectNumber}>0{i + 1}</div>
                <div className={css.projectName}>
                  {project.name}
                  <span className={css.projectType} style={{ background: `${project.typeColor}20`, color: project.typeColor, border: `1px solid ${project.typeColor}40` }}>
                    {project.type}
                  </span>
                </div>
                <div className={css.projectStack}>{project.stack}</div>
                <ul className={css.bulletList}>
                  {project.bullets.map((bullet, j) => (
                    <motion.li
                      key={j}
                      className={css.bulletItem}
                      initial={{ opacity: 0, x: -20 }}
                      animate={projectsInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.2 + j * 0.08 + 0.3, duration: 0.5 }}
                    >
                      <span className={css.bulletDot} style={{ background: project.color, boxShadow: `0 0 8px ${project.color}` }} />
                      <span>{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════ TIMELINE ═══════ */}
        <section className={css.timelineSection}>
          <SectionHeader preTitle="My Path" title="Learning Journey" />
          <div className={css.timelineContainer}>
            <motion.div
              className={css.timelineLine}
              style={{ background: 'linear-gradient(180deg, var(--secondary), var(--neon-2-2), transparent)' }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
            />
            {timeline.map((event, i) => (
              <TimelineItem key={event.year} event={event} index={i} />
            ))}
          </div>
        </section>

        {/* ═══════ EXTRACURRICULAR ═══════ */}
        <section className={css.extraSection}>
          <SectionHeader preTitle="Beyond Code" title="Activities & Interests" />
          <motion.div
            ref={extraRef}
            className={css.extraGrid}
            variants={stagger}
            initial="hidden"
            animate={extraInView ? 'visible' : 'hidden'}
          >
            {extras.map((item) => (
              <motion.div
                key={item.title}
                className={css.extraCard}
                variants={cardPop}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3 } }}
              >
                <span className={css.extraIcon}>{item.icon}</span>
                <div>
                  <div className={css.extraTitle}>{item.title}</div>
                  <p className={css.extraText}>{item.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ═══════ ONLINE PROFILES ═══════ */}
        <motion.section
          ref={profilesRef}
          className={css.profilesSection}
          initial={{ opacity: 0, y: 40 }}
          animate={profilesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h3 className={css.profilesTitle}>Online Profiles</h3>
          <div className={css.profileLinks}>
            {[
              { label: 'Portfolio', href: 'https://www.sukhma.in', emoji: '\uD83C\uDF10' },
              { label: 'GitHub', href: 'https://github.com/LakshyaBadjatya', emoji: '\uD83D\uDC19' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/lakshya-badjatya-a12a77399', emoji: '\uD83D\uDD17' },
              { label: 'Medium', href: 'https://medium.com/@lakshyabadjatya', emoji: '\u270D\uFE0F' },
              { label: 'Dev.to', href: 'https://dev.to/lakshyabadjatya', emoji: '\uD83D\uDEE0\uFE0F' },
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={css.profileLink}
                initial={{ opacity: 0, y: 20 }}
                animate={profilesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 + 0.2, duration: 0.5 }}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {link.emoji} {link.label}
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* ═══════ DOWNLOAD PDF ═══════ */}
        <motion.section
          className={css.downloadSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.a
            href="/Lakshya_Badjatya_Resume.pdf"
            download
            className={css.downloadBtn}
            whileHover={{ scale: 1.07, y: -4 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            &#11015;&#65039; Download PDF Resume
          </motion.a>
        </motion.section>

      </main>
    </>
  )
}
