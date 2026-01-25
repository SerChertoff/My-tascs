import type { Metadata } from 'next'
import LandingClient from '../components/LandingClient'

export const metadata: Metadata = {
  title: 'Task Sync — управление задачами, календарь, Pomodoro',
  description: 'Удобное приложение для управления задачами: планирование, календарь, Pomodoro-таймер и блоки времени. Бесплатный органайзер для проектов и личных дел.',
  keywords: ['задачи', 'таск-менеджер', 'управление задачами', 'календарь', 'pomodoro', 'органайзер', 'планирование', 'to-do'],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Task Sync — управление задачами, календарь, Pomodoro',
    description: 'Удобное приложение для управления задачами: планирование, календарь, Pomodoro-таймер и блоки времени.',
    images: ['/images/woman-laptop.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Task Sync — управление задачами, календарь, Pomodoro',
    description: 'Удобное приложение для управления задачами: планирование, календарь, Pomodoro-таймер и блоки времени.',
    images: ['/images/woman-laptop.png'],
  },
}

export default function Page() {
  return <LandingClient />
}
