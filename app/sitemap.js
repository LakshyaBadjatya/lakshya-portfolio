const base = 'https://sukhma.in'

export default function sitemap() {
  const now = new Date()
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/resume`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
  ]
}
