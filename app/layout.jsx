import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { LenisProvider } from '@/lib/scroll'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import Cursor from '@/components/ui/Cursor'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export const metadata = {
  metadataBase: new URL('https://sukhma.in'),
  title: {
    default: 'Lakshya Badjatya — Developer & Aspiring Computer Scientist',
    template: '%s | Lakshya Badjatya',
  },
  description:
    'Lakshya Badjatya is a Class 12 PCM student from Kota, India who has shipped 7+ production apps across web, mobile, and desktop. Aspiring to study Computer Science internationally, Fall 2027.',
  authors: [{ name: 'Lakshya Badjatya' }],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Lakshya Badjatya — Student Developer Portfolio',
    description: 'A 3D voyage through the journey, projects, and skills of a self-taught student developer.',
    url: 'https://sukhma.in',
    type: 'website',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
}

export const viewport = { themeColor: '#050510' }

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Lakshya Badjatya',
  url: 'https://sukhma.in',
  email: 'lakshyabadjatya@gmail.com',
  sameAs: [
    'https://github.com/LakshyaBadjatya',
    'https://www.linkedin.com/in/lakshya-badjatya-a12a77399/',
    'https://dev.to/lakshyabadjatya',
    'https://medium.com/@lakshyabadjatya',
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Cursor />
        <Navbar />
        <LenisProvider>{children}</LenisProvider>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
