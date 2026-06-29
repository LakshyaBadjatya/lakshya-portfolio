import AboutContent from '@/components/pages/AboutContent'

export const metadata = {
  title: { absolute: 'About Lakshya Badjatya — CTO at Sammed Technosol & CS Applicant' },
  description:
    'About Lakshya Badjatya: Chief Technology Officer at Sammed Technosol and a Class 12 PCM student from Kota, India applying to international Computer Science bachelor programs for Fall 2027.',
  alternates: { canonical: '/about' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sukhma.in/' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://sukhma.in/about' },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }}
      />
      <AboutContent />
    </>
  )
}
