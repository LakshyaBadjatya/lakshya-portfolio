import CvDocument from '@/components/cv/CvDocument'
import { profile } from '@/content/profile'
import { cvFingerprint } from '@/lib/cvFingerprint'

export const metadata = { title: 'CV', robots: { index: false, follow: false } }

export default function CvPrintPage() {
  return (
    <>
      <meta name="cv-fingerprint" content={cvFingerprint(profile)} />
      <CvDocument profile={profile} />
    </>
  )
}
