/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const repoName = 'My-tascs'

const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  // Static export only in production — dev server needs normal mode
  ...(isProd && { output: 'export' }),
  ...(isProd && { trailingSlash: true }),
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}` : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repoName}` : '',
  },
}

module.exports = nextConfig
