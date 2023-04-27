/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	compiler: {
		emotion: true,
	},
	images: {
		domains: ["placehold.it"],
	},
}

module.exports = nextConfig
