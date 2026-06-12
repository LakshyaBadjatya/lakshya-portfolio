'use client'

// Tiny synthesized sound engine — no audio assets. Off by default; user opts in.
const STORAGE_KEY = 'voyage-sound'

class SoundEngine {
  ctx = null
  humGain = null
  enabled = false

  prefersOn() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'on'
    } catch {
      return false
    }
  }

  init() {
    if (this.ctx) return
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    this.ctx = new Ctx()

    // Ship hum: two detuned triangles, gain breathing via a slow LFO.
    const master = this.ctx.createGain()
    master.gain.value = 0
    master.connect(this.ctx.destination)
    this.humGain = master

    for (const freq of [54, 57.3]) {
      const osc = this.ctx.createOscillator()
      osc.type = 'triangle'
      osc.frequency.value = freq
      const g = this.ctx.createGain()
      g.gain.value = 0.5
      osc.connect(g)
      g.connect(master)
      osc.start()
    }
    const lfo = this.ctx.createOscillator()
    lfo.frequency.value = 0.13
    const lfoGain = this.ctx.createGain()
    lfoGain.gain.value = 0.006
    lfo.connect(lfoGain)
    lfoGain.connect(master.gain)
    lfo.start()

    document.addEventListener('visibilitychange', () => {
      if (!this.ctx) return
      if (document.hidden) this.ctx.suspend()
      else if (this.enabled) this.ctx.resume()
    })
  }

  setEnabled(on) {
    this.enabled = on
    try {
      localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off')
    } catch {}
    if (on) {
      this.init()
      if (!this.ctx) return
      this.ctx.resume()
      this.humGain.gain.cancelScheduledValues(this.ctx.currentTime)
      this.humGain.gain.setTargetAtTime(0.02, this.ctx.currentTime, 0.4)
    } else if (this.ctx) {
      this.humGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2)
    }
  }

  /** Short UI ping; pitch in Hz. */
  blip(freq = 880) {
    if (!this.enabled || !this.ctx) return
    const t = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, t)
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + 0.07)
    const g = this.ctx.createGain()
    g.gain.setValueAtTime(0.05, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12)
    osc.connect(g)
    g.connect(this.ctx.destination)
    osc.start(t)
    osc.stop(t + 0.13)
  }
}

export const sound = new SoundEngine()
