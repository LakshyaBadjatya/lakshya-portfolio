import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

export default function RateMe() {
  const [rating, setRating] = useState(0)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const submitFeedback = async () => {
    if (!rating || loading) return

    setLoading(true)

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          name,
          message,
        }),
      })

      if (!res.ok) throw new Error("Failed")

      setSent(true)
      setName("")
      setMessage("")

      // 🎉 Confetti on success
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.75 },
        colors: ["#FFD700", "#FFC107", "#FFB300"],
      })
    } catch (err) {
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rate-me">
      {/* ⭐ STARS */}
      <div className="stars">
        {[1, 2, 3, 4, 5].map((num) => (
          <motion.span
            key={num}
            className={num <= rating ? "star active" : "star"}
            onClick={() => {
              setRating(num)
              setOpen(true)
              setSent(false)
            }}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            animate={
              num <= rating
                ? { scale: [1, 1.35, 1], rotate: [0, 8, -8, 0] }
                : { scale: 1 }
            }
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            ★
          </motion.span>
        ))}
      </div>

      {/* 🧾 NAME + MESSAGE (SLIDE DOWN) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="feedback-box"
          >
            {sent ? (
              <p style={{ marginTop: "8px" }}>
                ✅ Thanks for your feedback!
              </p>
            ) : (
              <>
                {/* Name field */}
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                {/* Message field */}
                <textarea
                  placeholder="Write your feedback (optional)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <button onClick={submitFeedback} disabled={loading}>
                  {loading ? "Sending..." : "Submit"}
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
