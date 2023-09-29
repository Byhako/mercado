/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    urlImports: ['https://bot.dialogflow.com'],
  },
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
