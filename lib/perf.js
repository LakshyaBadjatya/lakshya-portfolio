export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function supportsWebGL(doc = typeof document === 'undefined' ? undefined : document) {
  if (!doc) return false
  try {
    const c = doc.createElement('canvas')
    const gl = c.getContext('webgl2') || c.getContext('webgl')
    if (!gl) return false
    // Release the probe at once, so it doesn't count against the browser's context limit.
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return true
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
