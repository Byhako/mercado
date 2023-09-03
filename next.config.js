/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'http2.mlstatic.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
