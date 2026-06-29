import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { LenisProvider } from '@/lib/scroll'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import Cursor from '@/components/ui/Cursor'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
const grotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap', variable: '--font-space-grotesk' })
const mono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-jetbrains' })

export const metadata = {
  metadataBase: new URL('https://sukhma.in'),
  title: {
    default: 'Lakshya Badjatya — CTO at Sammed Technosol | Student Developer & CS Applicant',
    template: '%s | Lakshya Badjatya',
  },
  description:
    'Lakshya Badjatya is the CTO of Sammed Technosol and a Class 12 PCM student from Kota, India who has shipped 7+ production apps. He is applying to international Computer Science bachelor programs for Fall 2027.',
  authors: [{ name: 'Lakshya Badjatya', url: 'https://sukhma.in' }],
  creator: 'Lakshya Badjatya',
  keywords: [
    'Lakshya Badjatya',
    'CTO of Sammed Technosol',
    'Sammed Technosol CTO',
    'Sammed Technosol',
    'Lakshya Badjatya developer',
    'Lakshya Badjatya portfolio',
    'student developer Kota',
  ],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: 'Lakshya Badjatya — CTO at Sammed Technosol & Aspiring Computer Scientist',
    description:
      'CTO of Sammed Technosol and a Class 12 student from Kota, India shipping production software — applying to study Computer Science abroad, Fall 2027.',
    url: 'https://sukhma.in',
    siteName: 'Lakshya Badjatya',
    locale: 'en_US',
    type: 'profile',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Lakshya Badjatya — CTO at Sammed Technosol & Student Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lakshya Badjatya — CTO at Sammed Technosol & Student Developer',
    description:
      'CTO of Sammed Technosol and a Class 12 student from Kota, India applying to study CS abroad, Fall 2027.',
    images: ['/og-image.jpg'],
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
  '@type': 'Person',
  '@id': 'https://sukhma.in/#lakshya',
  name: 'Lakshya Badjatya',
  url: 'https://sukhma.in',
  mainEntityOfPage: 'https://sukhma.in',
  image: 'https://sukhma.in/img/profile-photo.webp',
  email: 'mailto:lakshyabadjatya@gmail.com',
  jobTitle: 'Chief Technology Officer',
  description:
    'Chief Technology Officer at Sammed Technosol and a Class 12 PCM student from Kota, India applying to international Computer Science bachelor programs for Fall 2027.',
  worksFor: {
    '@type': 'Organization',
    '@id': 'https://www.samtechnos.com/#organization',
    name: 'Sammed Technosol',
    url: 'https://www.samtechnos.com',
  },
  affiliation: { '@id': 'https://www.samtechnos.com/#organization' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kota',
    addressRegion: 'Rajasthan',
    addressCountry: 'IN',
  },
  nationality: { '@type': 'Country', name: 'India' },
  knowsAbout: [
    'Software Architecture',
    'Web Development',
    'Next.js',
    'React',
    'TypeScript',
    'Flutter',
    'Firebase',
    'Technical Leadership',
    'Computer Science',
  ],
  knowsLanguage: ['English', 'Hindi'],
  sameAs: [
    'https://github.com/LakshyaBadjatya',
    'https://www.linkedin.com/in/lakshya-badjatya-a12a77399/',
    'https://dev.to/lakshyabadjatya',
    'https://medium.com/@lakshyabadjatya',
  ],
}

const organizationSchema = {
  '@type': 'Organization',
  '@id': 'https://www.samtechnos.com/#organization',
  name: 'Sammed Technosol',
  url: 'https://www.samtechnos.com',
  description:
    'Sammed Technosol is a technology company building software products and digital platforms for real business problems, based in Kota, India.',
  foundingDate: '2026',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kota',
    addressRegion: 'Rajasthan',
    addressCountry: 'IN',
  },
  employee: { '@id': 'https://sukhma.in/#lakshya' },
}

const websiteSchema = {
  '@type': 'WebSite',
  '@id': 'https://sukhma.in/#website',
  url: 'https://sukhma.in',
  name: 'Lakshya Badjatya — Portfolio',
  description:
    'Portfolio of Lakshya Badjatya, CTO at Sammed Technosol and a Class 12 student applying to international Computer Science bachelor programs.',
  publisher: { '@id': 'https://sukhma.in/#lakshya' },
  inLanguage: 'en',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [personSchema, organizationSchema, websiteSchema],
            }).replace(/</g, '\\u003c'),
          }}
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
