import type { Metadata } from 'next'
import './globals.css'
import ToastContainer from '../components/ToastContainer'

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
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
