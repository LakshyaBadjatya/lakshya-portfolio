import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3867355433889969"
          crossOrigin="anonymous"
        ></script>

        {/* Primary SEO */}
        <title>Lakshya Badjatya | Student Portfolio</title>
        <meta
          name="description"
          content="Student portfolio showcasing projects, skills, and learning journey in computer science, web development, and game development."
        />

        {/* Open Graph */}
        <meta property="og:url" content="https://sukhma.in" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Lakshya Badjatya | Student Portfolio" />
        <meta
          property="og:description"
          content="Student portfolio showcasing projects, skills, and learning journey in computer science, web development, and game development."
        />
        <meta property="og:image" content="https://sukhma.in/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lakshya Badjatya | Student Portfolio" />
        <meta
          name="twitter:description"
          content="Student portfolio showcasing projects, skills, and learning journey in computer science, web development, and game development."
        />
        <meta name="twitter:image" content="https://sukhma.in/og-image.png" />

        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#000000" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
