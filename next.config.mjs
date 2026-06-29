/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Canonical host: consolidate www → non-www so ranking signals don't split.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.sukhma.in' }],
        destination: 'https://sukhma.in/:path*',
        permanent: true,
      },
      { source: '/aboutme', destination: '/about', permanent: true },
      { source: '/articles', destination: '/', permanent: true },
      { source: '/case-studies', destination: '/', permanent: true },
      { source: '/download', destination: '/projects', permanent: true },
      { source: '/projects/flappy-bird', destination: '/projects', permanent: true },
      { source: '/instagram', destination: 'https://www.instagram.com/lakshyabadjatya/', permanent: true },
      { source: '/linkedin', destination: 'https://www.linkedin.com/in/lakshya-badjatya-a12a77399/', permanent: true },
      { source: '/dev', destination: 'https://dev.to/lakshyabadjatya', permanent: true },
      { source: '/medium', destination: 'https://medium.com/@lakshyabadjatya', permanent: true },
      { source: '/github', destination: 'https://github.com/LakshyaBadjatya', permanent: true },
    ]
  },
}

export default nextConfig
