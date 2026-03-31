import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

/* ─── Custom Cursor ─────────────────────────────────── */
export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { damping: 25, stiffness: 300 })
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300 })
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true)

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  useEffect(() => {
    if (isTouchDevice) return
    const move = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); if (!visible) setVisible(true) }
    const down = () => setClicked(true)
    const up = () => setClicked(false)
    const enter = () => setVisible(true)
    const leave = () => setVisible(false)
    const onOver = (e) => { if (e.target.closest("a, button, [data-hover], input, textarea, select, [role='button'], [role='link']")) setHovered(true) }
    const onOut = (e) => { if (e.target.closest("a, button, [data-hover], input, textarea, select, [role='button'], [role='link']")) setHovered(false) }
    window.addEventListener("mousemove", move)
    window.addEventListener("mousedown", down)
    window.addEventListener("mouseup", up)
    document.addEventListener("mouseenter", enter)
    document.addEventListener("mouseleave", leave)
    document.addEventListener("mouseover", onOver)
    document.addEventListener("mouseout", onOut)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mousedown", down)
      window.removeEventListener("mouseup", up)
      document.removeEventListener("mouseenter", enter)
      document.removeEventListener("mouseleave", leave)
      document.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseout", onOut)
    }
  }, [cursorX, cursorY, visible, isTouchDevice])

  if (isTouchDevice) return null

  return (
    <>
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0, x: springX, y: springY,
          translateX: "-50%", translateY: "-50%",
          width: hovered ? 48 : 28, height: hovered ? 48 : 28,
          borderRadius: "50%",
          border: `2px solid ${hovered ? "var(--secondary)" : "var(--primary-dim)"}`,
          pointerEvents: "none", zIndex: 99998,
          opacity: visible ? 0.8 : 0, scale: clicked ? 0.75 : 1,
          background: hovered ? "rgba(0,255,204,0.1)" : "transparent",
          mixBlendMode: "difference",
          transition: "width 0.2s, height 0.2s, border-color 0.2s, background 0.2s",
        }}
      />
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0, x: cursorX, y: cursorY,
          translateX: "-50%", translateY: "-50%",
          width: hovered ? 5 : 4, height: hovered ? 5 : 4,
          borderRadius: "50%",
          background: hovered ? "var(--secondary)" : "var(--primary)",
          pointerEvents: "none", zIndex: 99999,
          opacity: visible ? 1 : 0,
          boxShadow: `0 0 8px ${hovered ? "var(--secondary)" : "var(--primary-dim)"}`,
        }}
      />
    </>
  )
}

/* ─── 3D Tilt Card ──────────────────────────────────── */
export function TiltCard({ children, className, style, intensity = 10, ...props }) {
  const ref = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRX = useSpring(rotateX, { damping: 20, stiffness: 200 })
  const springRY = useSpring(rotateY, { damping: 20, stiffness: 200 })
  const glareOpacity = useMotionValue(0)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const handleMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateX.set((py - 0.5) * -intensity)
    rotateY.set((px - 0.5) * intensity)
    glareX.set(px * 100)
    glareY.set(py * 100)
    glareOpacity.set(0.12)
  }, [rotateX, rotateY, glareX, glareY, glareOpacity, intensity])

  const handleLeave = useCallback(() => {
    rotateX.set(0); rotateY.set(0); glareOpacity.set(0)
  }, [rotateX, rotateY, glareOpacity])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style, perspective: "800px", transformStyle: "preserve-3d",
        rotateX: springRX, rotateY: springRY,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
      <motion.div
        style={{
          position: "absolute", inset: 0, borderRadius: "inherit",
          pointerEvents: "none", opacity: glareOpacity,
          background: useTransform(
            [glareX, glareY],
            ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.2), transparent 60%)`
          ),
        }}
      />
    </motion.div>
  )
}

/* ─── Magnetic Button ───────────────────────────────── */
export function MagneticButton({ children, className, style, strength = 0.3, ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 15, stiffness: 200 })
  const springY = useSpring(y, { damping: 15, stiffness: 200 })

  const handleMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }, [x, y, strength])

  const handleLeave = useCallback(() => { x.set(0); y.set(0) }, [x, y])

  return (
    <motion.div
      ref={ref} className={className}
      style={{ ...style, x: springX, y: springY, display: "inline-block" }}
      onMouseMove={handleMove} onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/* ─── Mouse Parallax Hook ───────────────────────────── */
export function useMouseParallax(strength = 20) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 30, stiffness: 100 })
  const springY = useSpring(y, { damping: 30, stiffness: 100 })

  useEffect(() => {
    const onMove = (e) => {
      const px = (e.clientX / window.innerWidth - 0.5) * 2
      const py = (e.clientY / window.innerHeight - 0.5) * 2
      x.set(px * strength)
      y.set(py * strength)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [x, y, strength])

  return { x: springX, y: springY }
}

/* ─── Spotlight Section ─────────────────────────────── */
export function SpotlightSection({ children, className, style, ...props }) {
  const ref = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }, [mouseX, mouseY])

  const bg = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(0,255,204,0.07), transparent 50%)`
  )

  return (
    <div ref={ref} className={className} style={{ ...style, position: "relative" }}
      onMouseMove={handleMove} {...props}>
      <motion.div style={{ position: "absolute", inset: 0, background: bg, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  )
}

/* ─── Animated Counter ──────────────────────────────── */
export function CountUp({ value, duration = 2000, suffix = "" }) {
  const [display, setDisplay] = useState("0")
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const num = parseFloat(value.replace(/[^0-9.]/g, "")) || 0
          const isDecimal = value.includes(".")
          const startTime = performance.now()
          const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = num * eased
            setDisplay(isDecimal ? current.toFixed(1) : Math.floor(current).toString())
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, duration])

  const nonNumeric = value.replace(/[0-9.]/g, "")
  return <span ref={ref}>{display}{nonNumeric}{suffix}</span>
}
