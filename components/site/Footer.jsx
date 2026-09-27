import { profile } from '@/content/profile'

// Module scope, so rendering stays pure. The page is built statically anyway.
const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 border-t border-rule px-[5vw] py-8 text-sm text-ink-2 print:hidden">
      <p>
        © {YEAR} {profile.name} · {profile.location}
      </p>
      <a href="#top" className="link">
        Back to top <span aria-hidden="true">↑</span>
      </a>
    </footer>
  )
}
