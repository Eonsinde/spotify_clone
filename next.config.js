/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.papareact.com',
      },
      {
        protocol: 'https',
        hostname: '**.scdn.co',
      },
    ],
  },
}

module.exports = nextConfig
