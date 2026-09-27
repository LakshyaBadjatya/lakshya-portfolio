import { profile } from '@/content/profile'

export default function sitemap() {
  return [{ url: `${profile.url}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }]
}
