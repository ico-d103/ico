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

	async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://k8d103.p.ssafy.io/api/:path*",
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/(.*)',
        destination: `https://http://k8d103.p.ssafy.io/`,
        has: [
          {
            type: 'host',
            value: 'k8d103.p.ssafy.io',
          },
        ],
      },
    ];
  },
})

module.exports = {
	...module.exports,
	compilerOptions: {
		target: "es2015",
	},

	async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://k8d103.p.ssafy.io/api/:path*",
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/(.*)',
        destination: `https://http://k8d103.p.ssafy.io/`,
        has: [
          {
            type: 'host',
            value: 'k8d103.p.ssafy.io',
          },
        ],
      },
    ];
  },
}
