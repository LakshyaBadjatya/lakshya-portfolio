import * as THREE from 'three'

let cached = null
let cachedFlare = null

/** White radial glow texture; tint with material color. */
export function glowTexture() {
  if (cached) return cached
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.35, 'rgba(255,255,255,0.35)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  cached = new THREE.CanvasTexture(c)
  return cached
}

/** Star flare: bright core with four diffraction spikes. Tint via material color. */
export function flareTexture() {
  if (cachedFlare) return cachedFlare
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const ctx = c.getContext('2d')
  ctx.globalCompositeOperation = 'lighter'

  const core = ctx.createRadialGradient(128, 128, 0, 128, 128, 56)
  core.addColorStop(0, 'rgba(255,255,255,1)')
  core.addColorStop(0.3, 'rgba(255,255,255,0.5)')
  core.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = core
  ctx.fillRect(0, 0, 256, 256)

  for (const angle of [0, Math.PI / 2]) {
    ctx.save()
    ctx.translate(128, 128)
    ctx.rotate(angle)
    ctx.scale(1, 0.045)
    const spike = ctx.createRadialGradient(0, 0, 0, 0, 0, 126)
    spike.addColorStop(0, 'rgba(255,255,255,0.9)')
    spike.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = spike
    ctx.beginPath()
    ctx.arc(0, 0, 126, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  cachedFlare = new THREE.CanvasTexture(c)
  return cachedFlare
}
