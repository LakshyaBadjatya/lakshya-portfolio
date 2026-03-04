import { useEffect, useState } from "react"
import Lottie from "lottie-react"
import animationData from "../../public/preloader.json"

export default function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false)
      document.body.classList.add("loaded")
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
      return () => window.removeEventListener("load", handleLoad)
    }
  }, [])

  if (!loading) return null

  return (
    <div style={styles.wrapper}>
      <div style={styles.animation}>
        <Lottie animationData={animationData} loop />
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    position: "fixed",
    inset: 0,
    background: "var(--background)", // uses theme background automatically
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999
  },

  animation: {
    width: "clamp(220px, 40vw, 420px)",
    maxWidth: "80vw"
  }
}