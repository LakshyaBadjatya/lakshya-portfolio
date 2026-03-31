import { useEffect, useState, useRef, useCallback } from "react"
import { m, AnimatePresence } from "framer-motion"

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const pageLoadedRef = useRef(false)

  const dismiss = useCallback(() => {
    setLoading(false)
    document.body.classList.add("loaded")
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }, [])

  // Chroma key: paint video to canvas, remove green pixels
  const processFrame = useCallback(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas || video.paused || video.ended) return

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    canvas.width = video.videoWidth || 1920
    canvas.height = video.videoHeight || 1080

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    const frame = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const d = frame.data

    for (let i = 0; i < d.length; i += 4) {
      const r = d[i]
      const g = d[i + 1]
      const b = d[i + 2]

      if (g > 80 && g > r * 1.4 && g > b * 1.4) {
        d[i + 3] = 0
      }
    }

    ctx.putImageData(frame, 0, 0)
    rafRef.current = requestAnimationFrame(processFrame)
  }, [])

  // Start canvas processing when video plays
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const startProcessing = () => {
      rafRef.current = requestAnimationFrame(processFrame)
    }

    video.addEventListener("play", startProcessing)

    return () => {
      video.removeEventListener("play", startProcessing)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [processFrame])

  // Logic: play video once, freeze on last frame until page loads, then dismiss
  useEffect(() => {
    const video = videoRef.current

    // Track page load
    const handlePageLoad = () => {
      pageLoadedRef.current = true
      // If video already ended, dismiss now
      if (video && video.ended) {
        dismiss()
      }
    }

    // When video ends its single play
    const handleVideoEnd = () => {
      if (pageLoadedRef.current) {
        // Page already loaded, dismiss
        dismiss()
      }
      // else: page still loading — keep showing last frame, dismiss will happen in handlePageLoad
    }

    if (document.readyState === "complete") {
      pageLoadedRef.current = true
    } else {
      window.addEventListener("load", handlePageLoad)
    }

    if (video) {
      video.addEventListener("ended", handleVideoEnd)
    }

    // Fallback
    const fallback = setTimeout(dismiss, 10000)

    return () => {
      clearTimeout(fallback)
      window.removeEventListener("load", handlePageLoad)
      if (video) video.removeEventListener("ended", handleVideoEnd)
    }
  }, [dismiss])

  return (
    <AnimatePresence>
      {loading && (
        <m.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          style={styles.wrapper}
        >
          {/* Hidden video — plays once, no loop */}
          <video
            ref={videoRef}
            src="/preloader4.mp4"
            autoPlay
            muted
            playsInline
            style={styles.hiddenVideo}
          />
          {/* Canvas with green removed */}
          <canvas ref={canvasRef} style={styles.canvas} />
        </m.div>
      )}
    </AnimatePresence>
  )
}

const styles = {
  wrapper: {
    position: "fixed",
    inset: 0,
    background: "#000000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999,
    overflow: "hidden",
  },
  hiddenVideo: {
    position: "absolute",
    width: 0,
    height: 0,
    opacity: 0,
    pointerEvents: "none",
  },
  canvas: {
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
  },
}
