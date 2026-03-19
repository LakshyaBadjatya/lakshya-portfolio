import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function ProjectsPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
    }),
  }

  return (
    <>
      <Head>
        <title>Projects | Lakshya Badjatya</title>
        <meta
          name="description"
          content="Projects built by Lakshya Badjatya including games and web applications."
        />
      </Head>

      <main style={styles.page}>
        <motion.h1
          style={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Projects
        </motion.h1>
        <motion.p
          style={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          A collection of projects I've built while learning computer science
          and software development.
        </motion.p>

        {/* PROJECT CARD */}
        <motion.section
          style={styles.card}
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", transition: { duration: 0.3 } }}
        >
          <motion.div
            style={styles.imageWrapper}
            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
          >
            <Image
              src="/img/flappy-bird-preview.webp"
              alt="Flappy Bird Game"
              width={300}
              height={300}
              style={styles.image}
            />
          </motion.div>

          <div style={styles.content}>
            <h2>Flappy Bird</h2>
            <p style={styles.description}>
              A simple 2D Flappy Bird–style game built using Unity and C# as a
              learning project. This project helped me understand game physics,
              collision handling, and basic game loops.
            </p>

            <div style={styles.tags}>
              {["Unity", "C#", "Game Dev"].map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ duration: 0.2 }}
                  style={styles.tag}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <div style={styles.actions}>
              <Link href="/projects/flappy-bird">
                <motion.button
                  style={styles.primaryBtn}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(111,255,210,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Details
                </motion.button>
              </Link>

              <a href="/downloads/Flappy.apk" download>
                <motion.button
                  style={styles.secondaryBtn}
                  whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.6)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Download Game
                </motion.button>
              </a>
            </div>
          </div>
        </motion.section>
      </main>
    </>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "120px 24px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "8px",
  },
  subtitle: {
    opacity: 0.7,
    marginBottom: "60px",
  },
  card: {
    display: "flex",
    gap: "40px",
    background: "rgba(255,255,255,0.04)",
    borderRadius: "20px",
    padding: "32px",
    alignItems: "center",
    flexWrap: "wrap",
    border: "1px solid rgba(255,255,255,0.06)",
    transition: "border-color 0.3s",
    cursor: "default",
  },
  imageWrapper: {
    flex: "0 0 300px",
  },
  image: {
    borderRadius: "16px",
  },
  content: {
    flex: 1,
  },
  description: {
    opacity: 0.85,
    marginBottom: "20px",
  },
  tags: {
    display: "flex",
    gap: "10px",
    marginBottom: "24px",
  },
  tag: {
    padding: "4px 14px",
    borderRadius: "99px",
    border: "1px solid rgba(255,255,255,0.15)",
    fontSize: "0.85rem",
    display: "inline-block",
    cursor: "default",
  },
  actions: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    padding: "12px 20px",
    borderRadius: "999px",
    border: "none",
    background: "#6fffd2",
    color: "#000",
    cursor: "pointer",
    fontWeight: 600,
  },
  secondaryBtn: {
    padding: "12px 20px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "transparent",
    color: "var(--primary)",
    cursor: "pointer",
    transition: "border-color 0.3s",
  },
}
