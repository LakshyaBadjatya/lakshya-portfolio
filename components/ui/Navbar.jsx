'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const LINKS = [
  { href: '/', label: 'Voyage' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <motion.nav
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
      className="glass fixed inset-x-0 top-0 z-50 border-x-0 border-t-0"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          LB<span className="text-cyan">.</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {LINKS.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={`relative rounded-full px-3 py-1.5 font-mono text-xs transition-colors sm:text-sm ${
                  active ? 'text-cyan' : 'text-dim hover:text-star'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-cyan/10 ring-1 ring-cyan/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}
