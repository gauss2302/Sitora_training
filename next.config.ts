// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['cdn.dummyjson.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.dummyjson.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};

module.exports = nextConfig;
