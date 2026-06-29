import ResumeContent from '@/components/pages/ResumeContent'

export const metadata = {
  title: { absolute: 'Resume — Lakshya Badjatya, CTO at Sammed Technosol' },
  description:
    'Resume of Lakshya Badjatya — Chief Technology Officer at Sammed Technosol and a Class 12 student who has shipped 7+ production apps, applying for international Computer Science undergraduate admission (Fall 2027).',
  alternates: { canonical: '/resume' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sukhma.in/' },
    { '@type': 'ListItem', position: 2, name: 'Resume', item: 'https://sukhma.in/resume' },
  ],
}

export default function ResumePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }}
      />
      <ResumeContent />
    </>
  )
}
