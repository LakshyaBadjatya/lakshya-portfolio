import { useEffect, useState } from "react"

export default function DynamicWatermark() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(Date.now())
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="dynamic-watermark"
      style={{
        transform: `translate(
          ${Math.sin(tick / 3000) * 10}px,
          ${Math.cos(tick / 3000) * 10}px
        )`
      }}
    >
      © Lakshya Badjatya
    </div>
  )
}
