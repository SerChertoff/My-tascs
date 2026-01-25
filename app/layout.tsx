import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Lexend_Deca } from 'next/font/google'
import './globals.css'

const lexendDeca = Lexend_Deca({ subsets: ['latin'], weight: ['400', '600'], display: 'swap' })

const ToastContainer = dynamic(() => import('../components/ToastContainer'), { ssr: false })

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
      <body className={lexendDeca.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
