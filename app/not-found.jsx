import Link from 'next/link'

export const metadata = { title: 'Page not found' }

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-center px-[5vw]">
      <p className="text-sm uppercase tracking-[0.18em] text-ink-2">404</p>
      <h1 className="mt-6 font-serif text-[length:clamp(3.5rem,11vw,9rem)] leading-[0.9] tracking-[-0.02em]">
        This page
        <br />
        isn’t here.
      </h1>
      <p className="mt-8 max-w-md text-lg text-ink-2">The address may be old. Everything now lives on one page.</p>
      <Link href="/" className="link mt-10 self-start text-lg text-accent">
        Go to the portfolio <span aria-hidden="true">→</span>
      </Link>
    </main>
  )
}
