import Image from "next/image"
import Container from "../../components/structure/container"

export default function FlappyBirdProject() {
  return (
    <Container spacing={["verticalXXXLrg"]}>
      <section style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Flappy Bird (2D Game Project)
        </h1>

        <p style={{ opacity: 0.75, marginBottom: "2rem" }}>
          A simple Flappy Bird–style 2D game built using Unity and C# as a learning project.
        </p>

        <Image
          src="/img/flappy-bird-preview.webp"
          alt="Flappy Bird gameplay"
          width={400}
          height={400}
          style={{ borderRadius: "1rem", marginBottom: "2rem" }}
        />

        <h2>🛠 How I Built It</h2>
        <p>
          I built this game using Unity’s 2D engine and C#. The goal was to understand
          game loops, physics, collision detection, and score handling.
        </p>

        <ul>
          <li>Implemented gravity and jump mechanics</li>
          <li>Created obstacle spawning logic</li>
          <li>Handled collisions and game-over states</li>
          <li>Added scoring and restart functionality</li>
        </ul>

        <h2>📚 What I Learned</h2>
        <ul>
          <li>Basics of Unity’s 2D workflow</li>
          <li>C# scripting and object lifecycle</li>
          <li>Debugging gameplay logic</li>
          <li>Game physics and timing</li>
        </ul>

        <h2>⬇️ Download</h2>
        <a
          href="/downloads/Flappy Bird v1.0.1.apk"
          download
          style={{
            display: "inline-block",
            marginTop: "1rem",
            padding: "0.75rem 1.5rem",
            borderRadius: "999px",
            background: "#5eead4",
            color: "#000",
            fontWeight: 600,
            textDecoration: "none"
          }}
        >
          Download Game
        </a>
      </section>
    </Container>
  )
}
