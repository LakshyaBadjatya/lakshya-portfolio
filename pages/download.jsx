import { useEffect } from "react"

export default function Download() {
  useEffect(() => {
    window.location.href = "/downloads"
  }, [])

  return null
}
