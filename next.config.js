/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/My-tascs' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/My-tascs' : '',
}

module.exports = nextConfig
