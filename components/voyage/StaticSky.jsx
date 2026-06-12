const STAR_COUNT = 120

function lcgStars() {
  let seed = 1337
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  const shadows = []
  for (let i = 0; i < STAR_COUNT; i++) {
    const x = (rand() * 100).toFixed(2)
    const y = (rand() * 100).toFixed(2)
    const a = (0.3 + rand() * 0.7).toFixed(2)
    shadows.push(`${x}vw ${y}vh 0 0 rgba(232,236,255,${a})`)
  }
  return shadows.join(',')
}

const SHADOWS = lcgStars()

export default function StaticSky() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-void">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(110,231,255,0.10), transparent 60%),' +
            'radial-gradient(ellipse 60% 50% at 80% 110%, rgba(167,139,250,0.12), transparent 60%),' +
            'radial-gradient(ellipse 50% 40% at 10% 60%, rgba(244,114,182,0.06), transparent 60%)',
        }}
      />
      <div className="absolute left-0 top-0 h-px w-px rounded-full" style={{ boxShadow: SHADOWS }} />
    </div>
  )
}
