const base = 'https://sukhma.in'

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
