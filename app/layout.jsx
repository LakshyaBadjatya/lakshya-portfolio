import { Instrument_Serif, Schibsted_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { profile } from '@/content/profile'
import { schemaJson } from '@/lib/schema'
import './globals.css'

const serif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
})
const sans = Schibsted_Grotesk({ subsets: ['latin'], display: 'swap', variable: '--font-schibsted' })

const title = `${profile.name} — ${profile.role}`
const description =
  'Lakshya Badjatya is the Co-Founder & CTO of Sammed Technosol in Kota, India. He built SamLab, offline-first lab software used by labs and hospitals in India and internationally.'

export const metadata = {
  metadataBase: new URL(profile.url),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  authors: [{ name: profile.name, url: profile.url }],
  creator: profile.name,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'profile',
    url: profile.url,
    siteName: profile.name,
    locale: 'en_US',
    title,
    description,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] },
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
}

export const viewport = { themeColor: '#f2eee6' }

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson() }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
