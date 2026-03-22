import Head from 'next/head'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/* ─── Staggered card container ─────────────────────────── */
const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const cardItem = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease: [0.25, 0.4, 0.25, 1] },
  },
}

/* ─── Timeline items ───────────────────────────────────── */
const timelineEvents = [
  { year: '2020', label: 'First Computer', desc: 'Got my first PC during COVID. Curiosity about software instantly sparked.' },
  { year: '2022', label: 'First Project', desc: 'Built a Flappy Bird clone in Unity — learned programming logic hands-on.' },
  { year: '2023', label: 'Web Development', desc: 'Started learning HTML, CSS, JavaScript and built my first websites.' },
  { year: '2024', label: 'React & Next.js', desc: 'Built this portfolio with Next.js, mastering modern web development.' },
  { year: '2027', label: 'CS Abroad', desc: 'Goal: Study Computer Science internationally and start building impactful products.' },
]

/* ─── Timeline Item Component ──────────────────────────── */
function TimelineItem({ event, index }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const isRight = index % 2 === 0

  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2.5rem', flexDirection: 'row' }}>
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
        style={{
          minWidth: '80px',
          textAlign: 'right',
          fontFamily: 'var(--font-accent)',
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--secondary)',
        }}
      >
        {event.year}
      </motion.div>

      {/* Dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 15, delay: index * 0.1 + 0.1 }}
        style={{
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: 'var(--secondary)',
          flexShrink: 0,
          boxShadow: '0 0 12px var(--secondary)',
          position: 'relative',
          zIndex: 1,
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.05, ease: [0.25, 0.4, 0.25, 1] }}
        whileHover={{ x: 6, transition: { duration: 0.2 } }}
        style={{
          flex: 1,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '12px',
          padding: '14px 20px',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div style={{ fontWeight: 700, color: 'var(--primary-bright)', marginBottom: '4px', fontSize: '0.95rem' }}>
          {event.label}
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--primary-dim)', lineHeight: 1.6 }}>
          {event.desc}
        </div>
      </motion.div>
    </div>
  )
}

export default function AboutMe() {
  const [quotes, setQuotes] = useState([])
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 300], [0, -60])
  const heroOpacity = useTransform(scrollY, [0, 250], [1, 0])

  useEffect(() => {
    fetch('/quotes.txt')
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split('\n').filter(Boolean)
        const formatted = lines.map((line) => {
          const [quote, author] = line.split('|')
          return { quote: quote.trim(), author: author?.trim() }
        })
        setQuotes(formatted)
      })
      .catch(() => {})
  }, [])

  const cards = [
    {
      emoji: '🚀',
      title: 'My Journey',
      text: 'My interest in technology began during COVID when I got my first computer. Curiosity quickly turned into passion for understanding software, building websites, and learning how digital products work.',
      color: 'var(--neon-1-1)',
    },
    {
      emoji: '💻',
      title: 'Projects & Skills',
      text: 'I enjoy turning ideas into working systems. One early project was building a Flappy Bird-style game where I learned programming logic and debugging. Currently improving through hands-on projects every day.',
      color: 'var(--secondary)',
    },
    {
      emoji: '🎓',
      title: 'Academic Focus',
      text: 'I study Physics, Chemistry, and Mathematics and am preparing for IELTS. My goal is to study Computer Science abroad and gain strong hands-on training, research exposure, and real-world experience.',
      color: 'var(--neon-2-2)',
    },
    {
      emoji: '🎯',
      title: 'Future Vision',
      text: 'My long-term ambition is to build a technology startup and create digital products that solve real-world problems and reach many users worldwide.',
      color: 'var(--neon-1-2)',
    },
  ]

  return (
    <>
      <Head>
        <title>About Me | Lakshya Badjatya</title>
        <meta
          name="description"
          content="Lakshya Badjatya is a Class 12 PCM student from Kota, India, aspiring to study Computer Science internationally starting Fall 2027."
        />
      </Head>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 20px 60px' }}>

        {/* ─── HERO ───────────────────────────────────────────── */}
        <motion.section
          style={{ textAlign: 'center', marginBottom: '70px', y: heroY, opacity: heroOpacity }}
        >
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(127,234,255,0.08)',
              border: '1px solid rgba(127,234,255,0.2)',
              borderRadius: '99px',
              padding: '6px 18px',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--secondary)',
              fontFamily: 'var(--font-accent)',
              marginBottom: '28px',
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: 'var(--secondary)' }}
            />
            Class 12 Student · Aspiring CS Undergrad
          </motion.div>

          {/* Main heading - letter by letter */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            style={{
              fontSize: 'clamp(42px, 8vw, 80px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              margin: '0 0 20px',
              background: 'linear-gradient(135deg, var(--primary-bright) 0%, var(--secondary) 50%, var(--neon-2-2) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            About Me
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{
              maxWidth: '620px',
              margin: '0 auto',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: 'var(--primary-dim)',
              fontFamily: 'var(--font-accent)',
            }}
          >
            I'm a Class 12 student from Kota, India building my journey toward studying
            Computer Science abroad — focused on learning by building and improving daily.
          </motion.p>
        </motion.section>

        {/* ─── CARDS ──────────────────────────────────────────── */}
        <motion.section
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '60px',
          }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              variants={cardItem}
              whileHover={{
                y: -8, scale: 1.02,
                boxShadow: `0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px ${card.color}33`,
                transition: { duration: 0.3 },
              }}
              style={{
                padding: '28px',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(12px)',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Corner gradient accent */}
              <div style={{
                position: 'absolute',
                top: 0, right: 0,
                width: '120px', height: '120px',
                background: `radial-gradient(circle at top right, ${card.color}18, transparent 70%)`,
                pointerEvents: 'none',
              }} />
              <div style={{ fontSize: '2.2rem', marginBottom: '14px' }}>{card.emoji}</div>
              <h3 style={{ color: 'var(--primary-bright)', marginBottom: '10px', fontSize: '1.1rem' }}>
                {card.title}
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--primary-dim)', margin: 0 }}>
                {card.text}
              </p>
            </motion.div>
          ))}

          {/* Personal side card */}
          <motion.div
            variants={cardItem}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.3 } }}
            style={{
              gridColumn: '1 / -1',
              padding: '30px',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              gap: '24px',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ fontSize: '2.2rem' }}>🧠</div>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <h3 style={{ color: 'var(--primary-bright)', marginBottom: '10px' }}>Personal Side</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--primary-dim)', margin: 0 }}>
                Outside academics and coding, I play badminton to stay disciplined and balanced.
                I'm naturally introverted, which helps me focus deeply on learning and building.
                I dedicate 2–3 hours daily to improving my skills and progressing toward long-term goals.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── TIMELINE ───────────────────────────────────────── */}
        <section style={{ marginBottom: '60px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '36px' }}
          >
            <div style={{
              display: 'inline-block',
              fontFamily: 'var(--font-accent)',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--secondary)',
              marginBottom: '8px',
            }}>
              My Path
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--primary-bright)', margin: 0 }}>
              Journey
            </h2>
          </motion.div>

          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <motion.div
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
              style={{
                position: 'absolute',
                left: 'calc(80px + 2rem + 7px)',
                top: 0,
                bottom: 0,
                width: '2px',
                background: 'linear-gradient(180deg, var(--secondary), var(--neon-2-2), transparent)',
                transformOrigin: 'top',
                opacity: 0.3,
              }}
            />

            {timelineEvents.map((event, i) => (
              <TimelineItem key={event.year} event={event} index={i} />
            ))}
          </div>
        </section>

        {/* ─── QUOTES ─────────────────────────────────────────── */}
        {quotes.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            style={{
              padding: '40px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(127,234,255,0.05), rgba(198,36,238,0.05))',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(14px)',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: '1.4rem', marginBottom: '30px', color: 'var(--primary-bright)' }}>
              ✨ Personal Favorite Quotes
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {quotes.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * index, duration: 0.5 }}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  style={{
                    fontStyle: 'italic',
                    fontSize: '1.05rem',
                    lineHeight: 1.7,
                    color: 'var(--primary)',
                    padding: '16px 0',
                    borderBottom: index < quotes.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}
                >
                  "{item.quote}"
                  <span style={{
                    display: 'block',
                    marginTop: '8px',
                    fontStyle: 'normal',
                    fontSize: '0.85rem',
                    color: 'var(--primary-dim)',
                    opacity: 0.7,
                  }}>
                    — {item.author}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

      </main>
    </>
  )
}
