import { profile } from '@/content/profile'

export default function manifest() {
  return {
    name: `${profile.name} — ${profile.role}`,
    short_name: profile.name,
    description: `Portfolio and CV of ${profile.name}, ${profile.role}.`,
    start_url: '/',
    display: 'standalone',
    background_color: '#f2eee6',
    theme_color: '#f2eee6',
    icons: [
      { src: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/favicon/android-chrome-384x384.png', sizes: '384x384', type: 'image/png' },
    ],
  }
}
