'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useBasePath } from '../../../lib/useBasePath'
import { setSessionFromOAuth, apiGetMe, isApiAuthEnabled } from '../../../lib/authApi'
import type { ApiUser } from '../../../lib/authApi'

function AuthCallbackContent() {
  const searchParams = useSearchParams()
  const basePath = useBasePath()
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!isApiAuthEnabled()) {
      setStatus('error')
      setMessage('Авторизация через бэкенд не настроена.')
      return
    }

    const token = searchParams.get('token')
    const userParam = searchParams.get('user')
    const errorParam = searchParams.get('error')

    if (errorParam) {
      setStatus('error')
      setMessage(decodeURIComponent(errorParam) || 'Ошибка входа через Google.')
      return
    }

    if (!token) {
      setStatus('error')
      setMessage('Токен не получен. Попробуйте войти снова.')
      return
    }

    let decodedUser: ApiUser | null = null
    if (userParam) {
      try {
        const json = atob(userParam.replace(/-/g, '+').replace(/_/g, '/'))
        decodedUser = JSON.parse(json) as ApiUser
      } catch {
        // игнорируем, получим пользователя через apiGetMe
      }
    }

    (async () => {
      try {
        // Временно сохраняем токен, чтобы apiGetMe мог его использовать
        if (typeof window !== 'undefined') {
          localStorage.setItem('task-sync-auth-token', token)
        }
        const user = decodedUser ?? (await apiGetMe())
        setSessionFromOAuth(user, token)
        setStatus('ok')
        window.location.href = `${basePath}/home`
      } catch (e) {
        setStatus('error')
        setMessage(e instanceof Error ? e.message : 'Не удалось завершить вход.')
      }
    })()
  }, [searchParams, basePath])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
        <p className="text-[#24252C]">Вход через Google…</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
        <p className="text-red-600 text-center mb-4">{message}</p>
        <Link
          href={`${basePath}/login`}
          className="text-[#5F33E1] font-medium underline"
        >
          Вернуться на страницу входа
        </Link>
      </div>
    )
  }

  return null
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
          <p className="text-[#24252C]">Вход через Google…</p>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  )
}
