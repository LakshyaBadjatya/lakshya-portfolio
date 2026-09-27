// Old URLs keep working: every retired page points at the closest section of the new page.
export const redirects = [
  {
    source: '/:path*',
    has: [{ type: 'host', value: 'www.sukhma.in' }],
    destination: 'https://sukhma.in/:path*',
    permanent: true,
  },
  { source: '/about', destination: '/#profile', permanent: true },
  { source: '/aboutme', destination: '/#profile', permanent: true },
  { source: '/projects', destination: '/#work', permanent: true },
  { source: '/projects/:slug*', destination: '/#work', permanent: true },
  { source: '/case-studies', destination: '/#work', permanent: true },
  { source: '/resume', destination: '/#cv', permanent: true },
  { source: '/articles', destination: '/', permanent: true },
  { source: '/download', destination: '/', permanent: true },
  { source: '/downloads/:file*', destination: '/', permanent: true },
  { source: '/instagram', destination: 'https://www.instagram.com/lakshyabadjatya/', permanent: true },
  { source: '/linkedin', destination: 'https://www.linkedin.com/in/lakshya-badjatya/', permanent: true },
  { source: '/dev', destination: 'https://dev.to/lakshyabadjatya', permanent: true },
  { source: '/medium', destination: 'https://medium.com/@lakshyabadjatya', permanent: true },
  { source: '/github', destination: 'https://github.com/LakshyaBadjatya', permanent: true },
]
