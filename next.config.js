/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const repoName = 'My-tascs'

const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}` : '',
}

module.exports = nextConfig
