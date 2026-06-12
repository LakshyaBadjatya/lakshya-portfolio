import Link from 'next/link'
import { profile } from '@/content/profile'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-void/80 px-6 py-10 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-sm">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-dim transition-colors hover:text-cyan">
              {s.label} ↗
            </a>
          ))}
        </div>
        <p className="text-xs text-dim/70">
          © {new Date().getFullYear()} {profile.name} · built from scratch with Next.js, Three.js & React Three Fiber ·{' '}
          <Link href="/resume" className="underline decoration-dotted hover:text-cyan">resume</Link>
        </p>
      </div>
    </footer>
  )
}
