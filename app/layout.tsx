import type { Metadata } from 'next'
import './globals.css'
import ToastContainer from '../components/ToastContainer'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com') + (process.env.NEXT_PUBLIC_BASE_PATH || '')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Task Sync',
  description: 'Task management application',
  robots: { index: false, follow: false },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
