import { redirects } from './lib/redirects.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't let `next dev` write AGENTS.md / CLAUDE.md into the repo.
  agentRules: false,
  async redirects() {
    return redirects
  },
}

export default nextConfig
