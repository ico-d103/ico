/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
	dest: "public",
	disable: process.env.NODE_ENV === "development",
})

module.exports = withPWA({
	reactStrictMode: false,
	swcMinify: true,
	compiler: {
		emotion: true,
	},
	images: {
		domains: ["placehold.it", "placeimg.com", "d3bkfkkihwj5ql.cloudfront.net"],
	},
})

module.exports = {
	...module.exports,
	typescript: {
		ignoreBuildErrors: true,
	},
	compilerOptions: {
		target: "es2015",
	},
}
