/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/aboutme', destination: '/about', permanent: true },
      { source: '/articles', destination: '/', permanent: true },
      { source: '/case-studies', destination: '/', permanent: true },
      { source: '/download', destination: '/projects', permanent: true },
      { source: '/projects/flappy-bird', destination: '/projects', permanent: true },
    ]
  },
}

export default nextConfig
