/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
	dest: "public",
})

module.exports = withPWA({
	reactStrictMode: true,
	swcMinify: true,
	compiler: {
		emotion: true,
	},
	images: {
		domains: ["placehold.it"],
	},
})