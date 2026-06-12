export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function supportsWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * 0 = no 3D (reduced motion or no WebGL) -> static fallback
 * 1 = reduced 3D (mobile / weak hardware)
 * 2 = full experience
 */
export function detectTier({
  reducedMotion = prefersReducedMotion(),
  webgl = supportsWebGL(),
  nav = navigator,
  width = window.innerWidth,
} = {}) {
  if (reducedMotion || !webgl) return 0
  const weak =
    (nav.hardwareConcurrency || 4) <= 4 ||
    width < 768 ||
    (nav.deviceMemory !== undefined && nav.deviceMemory <= 4)
  return weak ? 1 : 2
}
