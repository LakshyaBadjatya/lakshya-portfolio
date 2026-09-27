import { profile } from '@/content/profile'

const ITEMS = [
  { href: '#work', label: 'Work' },
  { href: '#profile', label: 'Profile' },
  { href: '#cv', label: 'CV' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-rule bg-paper print:hidden">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-[5vw]">
        <a href="#top" aria-label={`LB, ${profile.name}: back to top`} className="font-serif text-2xl leading-none">
          LB
        </a>
        <div className="flex items-center gap-5 text-sm sm:gap-8">
          <ul className="hidden items-center gap-8 sm:flex">
            {ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/Lakshya-Badjatya-CV.pdf"
            download
            className="rounded-full border border-ink px-4 py-1.5 transition-colors hover:bg-ink hover:text-paper"
          >
            Download CV
          </a>
        </div>
      </nav>
    </header>
  )
}
