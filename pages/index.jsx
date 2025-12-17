import Head from "next/head"

import Hero from '../components/sections/index/hero'
import About from '../components/sections/index/about'
import Technical from '../components/sections/index/technical'
import FeaturedProjects from '../components/sections/projects/featured'

import Color from '../components/utils/page.colors.util'
import colors from '../content/index/_colors.json'

export default function HomePage() {
  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>Lakshya Badjatya | Student Portfolio & Developer</title>
        <meta
          name="description"
          content="Lakshya Badjatya is a Class 11 PCM student showcasing projects, skills, and learning in computer science, web development, and game development."
        />
        <meta name="author" content="Lakshya Badjatya" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Lakshya Badjatya | Student Portfolio" />
        <meta
          property="og:description"
          content="Student portfolio showcasing projects, skills, and learning journey in computer science."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sukhma.in" />
        <meta property="og:image" content="https://sukhma.in/og-image.png" />

        {/* Social Profile Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Lakshya Badjatya",
              "url": "https://sukhma.in",
              "sameAs": [
                "https://github.com/LakshyaBadjatya",
                "https://www.linkedin.com/in/lakshya-badjatya-a12a77399/",
                "https://dev.to/lakshyabadjatya",
                "https://medium.com/@lakshyabadjatya"
              ]
            })
          }}
        />
      </Head>

      {/* Page Content */}
      <Color colors={colors} />
      <Hero />
      <FeaturedProjects />
      <About />
      <Technical />
    </>
  )
}
