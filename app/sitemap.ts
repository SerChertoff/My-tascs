import type { MetadataRoute } from 'next'

const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com') + (process.env.NEXT_PUBLIC_BASE_PATH || '')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
