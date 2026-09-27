import { profile } from '@/content/profile'

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/og', '/still', '/cv/print'] },
    sitemap: `${profile.url}/sitemap.xml`,
    host: profile.url,
  }
}
