import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Task Sync',
  description: 'Task management application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
