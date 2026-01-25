import type { MetadataRoute } from 'next'

const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com') + (process.env.NEXT_PUBLIC_BASE_PATH || '')
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
const prefix = (p: string) => (basePath ? `${basePath}${p}` : p)

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: prefix('/'),
      disallow: [
        prefix('/login'),
        prefix('/registration'),
        prefix('/home'),
        prefix('/tasks'),
        prefix('/calendar'),
        prefix('/profile'),
        prefix('/settings'),
        prefix('/new-task'),
        prefix('/notifications'),
        prefix('/pomodoro'),
        prefix('/time-blocking'),
        prefix('/menu'),
      ],
    },
    sitemap: `${base}/sitemap.xml`,
  }
}
