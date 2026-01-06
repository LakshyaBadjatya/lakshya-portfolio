import Head from "next/head"
import Link from "next/link"
import Image from "next/image"

export default function ProjectsPage() {
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
        <h1 style={styles.title}>My Projects</h1>
        <p style={styles.subtitle}>
          A collection of projects I’ve built while learning computer science
          and software development.
        </p>

        {/* PROJECT CARD */}
        <section style={styles.card}>
          <div style={styles.imageWrapper}>
            <Image
              src="/img/flappy-bird-preview.webp"   // 👈 put image in /public/img/
              alt="Flappy Bird Game"
              width={300}
              height={300}
              style={styles.image}
            />
          </div>

          <div style={styles.content}>
            <h2>Flappy Bird</h2>
            <p style={styles.description}>
              A simple 2D Flappy Bird–style game built using Unity and C# as a
              learning project. This project helped me understand game physics,
              collision handling, and basic game loops.
            </p>

            <div style={styles.tags}>
              <span>Unity</span>
              <span>C#</span>
              <span>Game Dev</span>
            </div>

            <div style={styles.actions}>
              <Link href="/projects/flappy-bird">
                <button style={styles.primaryBtn}>View Details</button>
              </Link>

              <a href="/downloads/Flappy.apk" download>
                <button style={styles.secondaryBtn}>Download Game</button>
              </a>
            </div>
          </div>
        </section>
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
    color: "#fff",
    cursor: "pointer",
  },
}
