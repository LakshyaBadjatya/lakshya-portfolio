module.exports = {
	reactStrictMode: true,

	env: {
		dir: '/',
	},

	async redirects() {
		return [
			{
				source: '/instagram',
				destination: 'https://www.instagram.com/lakshyabadjatya/',
				permanent: true,
			},
			{
				source: '/linkedin',
				destination: 'https://www.linkedin.com/in/lakshya-badjatya-a12a77399/',
				permanent: true,
			},
			{
				source: '/dev',
				destination: 'https://dev.to/lakshyabadjatya',
				permanent: true,
			},
			{
				source: '/medium',
				destination: 'https://medium.com/@lakshyabadjatya',
				permanent: true,
			},
			{
				source: '/github',
				destination: 'https://github.com/LakshyaBadjatya',
				permanent: true,
			},
		]
	},

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.vercel.app',
				pathname: '/api/**',
			},
			{
				protocol: 'https',
				hostname: '**.vercel.app',
				pathname: '?app=portfolio-theme-jqe0jhmif-atlamors.vercel.app',
			},
			{
				protocol: 'https',
				hostname: '**.shields.io',
				pathname: '/badge/**',
			},
			{
				protocol: 'https',
				hostname: '**.shields.io',
				pathname: '/github/**',
			},
			{
				protocol: 'https',
				hostname: '**.githubusercontent.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: '**.medium.com',
				pathname: '/**',
			},
		],
	},
}
