import { redirects } from './lib/redirects.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep `next dev` from adding its generated rules files to the repo.
  agentRules: false,
  async redirects() {
    return redirects
  },
}

export default nextConfig
