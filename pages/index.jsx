import Head from "next/head"

import Hero from '../components/sections/index/hero'
import Looking from '../components/sections/index/looking'
import About from '../components/sections/index/about'
import Technical from '../components/sections/index/technical'
import Career from '../components/sections/index/career'
import FeaturedProjects from '../components/sections/projects/featured'

import Color from '../components/utils/page.colors.util'
import colors from '../content/index/_colors.json'

export default function HomePage() {
  return (
    <>
      {/* 🔍 SEO */}
      <Head>
        <title>Lakshya Badjatya | Student Portfolio</title>
        <meta
          name="description"
          content="Lakshya Badjatya is a Class 11 PCM student interested in computer science, web development, and building real projects."
        />
        <meta
          name="keywords"
          content="Lakshya Badjatya, student portfolio, computer science student, web developer"
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
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:image" content="/og-image.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Page Content */}
      <Color colors={colors} />
      <Hero />
      {/* <Looking /> */}
      <FeaturedProjects />
      <About />
      <Technical />
      {/* <Career /> */}
    </>
  )
}
