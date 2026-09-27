import StillStage from '@/components/three/StillStage'

export const metadata = { title: 'Form still', robots: { index: false, follow: false } }

export default function StillPage() {
  return (
    <>
      <style>{'html,body{background:transparent!important}'}</style>
      <StillStage />
    </>
  )
}
