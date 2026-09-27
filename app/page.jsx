import LenisProvider from '@/components/motion/LenisProvider'
import Nav from '@/components/site/Nav'
import FormStage from '@/components/three/FormStage'
import Hero from '@/components/site/Hero'
import Work from '@/components/site/Work'
import Profile from '@/components/site/Profile'
import CvSection from '@/components/site/CvSection'
import Contact from '@/components/site/Contact'
import Footer from '@/components/site/Footer'

export default function Home() {
  return (
    <LenisProvider>
      <Nav />
      <FormStage />
      <main id="main">
        <Hero />
        <Work />
        <Profile />
        <CvSection />
        <Contact />
      </main>
      <Footer />
    </LenisProvider>
  )
}
