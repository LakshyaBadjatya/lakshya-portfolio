import ProjectsContent from '@/components/pages/ProjectsContent'

export const metadata = {
  title: { absolute: 'Projects — Lakshya Badjatya, CTO at Sammed Technosol' },
  description:
    'Projects by Lakshya Badjatya, CTO at Sammed Technosol — the Sammed Technosol corporate website he leads, plus Puzzle Cam, a gesture-controlled webcam game.',
  alternates: { canonical: '/projects' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sukhma.in/' },
    { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://sukhma.in/projects' },
  ],
}

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }}
      />
      <ProjectsContent />
    </>
  )
}
