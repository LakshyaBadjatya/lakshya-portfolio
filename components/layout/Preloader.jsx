import { useEffect, useState } from "react"

export default function Preloader() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 3500) // duration of animation

    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div style={styles.wrapper}>
      <video
        src="/preloader.webm"
        autoPlay
        muted
        playsInline
        style={styles.video}
      />
    </div>
  )
}

const styles = {
  wrapper: {
    position: "fixed",
    inset: 0,
    background: "#000",
    display: "grid",
    placeItems: "center",
    zIndex: 9999,
  },

  video: {
    /* 🔑 RESPONSIVE SCALING */
    width: "clamp(220px, 50vw, 520px)",
    height: "auto",

    /* Maintain proportions */
    maxWidth: "90vw",
    maxHeight: "90vh",

    /* Prevent pixel stretching */
    objectFit: "contain",
  },
}
