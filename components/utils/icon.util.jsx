// Core
import { useEffect, useState } from 'react'

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'

// FREE icon packs only
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// Prevent Font Awesome from injecting CSS twice (Next.js safe)
config.autoAddCss = false

// Load FREE icons into library
library.add(fas, far, fab)

/**
 * Icon utility (client-only to avoid hydration errors)
 *
 * @param {array} icon - ['fas', 'code'] | ['fab', 'github']
 */
export default function Icon({ icon }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Avoid SSR hydration mismatch
  if (!mounted) return null

  return <FontAwesomeIcon icon={icon} />
}
