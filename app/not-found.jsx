import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="font-mono text-xs uppercase tracking-[0.35em] text-cyan">signal lost</div>
      <h1 className="gradient-text mt-4 font-display text-7xl font-bold md:text-9xl">404</h1>
      <p className="mt-4 max-w-md text-dim">
        This sector of space is uncharted. The page you&apos;re looking for drifted beyond the map.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-cyan/40 bg-cyan/10 px-7 py-2.5 font-mono text-sm text-cyan transition-colors hover:bg-cyan/20"
      >
        ← return to the voyage
      </Link>
    </main>
  )
}
