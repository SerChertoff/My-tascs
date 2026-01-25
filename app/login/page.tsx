'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useBasePath } from '../../lib/useBasePath'
import { login } from '../../lib/auth'
import { toast } from '../../lib/toast'
import { useTranslation } from '../../lib/useTranslation'

export default function LoginPage() {
  const { t, isClient } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const basePath = useBasePath()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Валидация
    if (!email || !password) {
      setError('Пожалуйста, заполните все поля')
      toast.error('Пожалуйста, заполните все поля')
      setIsLoading(false)
      return
    }

    if (!validateEmail(email)) {
      setError('Введите корректный email')
      toast.error('Введите корректный email')
      setIsLoading(false)
      return
    }

    // Проверка логина
    const success = login(email, password)
    
    if (success) {
      toast.success('Вход выполнен успешно!')
      // Небольшая задержка для показа уведомления
      setTimeout(() => {
        window.location.href = `${basePath}/home`
      }, 500)
    } else {
      setError('Неверный email или пароль')
      toast.error('Неверный email или пароль')
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Декоративные элементы */}
      <div className="absolute top-[232px] left-[333px] w-[60px] h-[60px] bg-gradient-to-b from-[rgba(37,85,255,1)] to-[rgba(37,85,255,0.25)] rounded-full blur-[100px]" />
      <div className="absolute top-[424px] left-[76px] w-[58px] h-[58px] bg-gradient-to-b from-[rgba(70,189,240,1)] to-[rgba(70,179,240,0.15)] rounded-full blur-[100px]" />
      <div className="absolute top-[767px] left-[240px] w-[58px] h-[58px] bg-gradient-to-b from-[rgba(240,182,70,1)] to-[rgba(240,203,70,0.15)] rounded-full blur-[100px]" />
      <div className="absolute top-[126px] -left-[15px] w-[70px] h-[70px] bg-gradient-to-b from-[rgba(70,240,128,1)] to-[rgba(70,240,138,0.15)] rounded-full blur-[100px]" />
      <div className="absolute top-0 left-[263px] w-[70px] h-[70px] bg-gradient-to-b from-[rgba(237,240,70,1)] to-[rgba(240,233,70,0.15)] rounded-full blur-[100px]" />
      <div className="absolute top-[734px] left-[34px] w-[310px] h-[7px] bg-[#5F33E1] rounded-full blur-[30px]" />

      {/* Основной контент */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <Link href="/" className="absolute top-8 left-6">
          <svg
            className="w-6 h-6 text-[#24252C]"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M13.16 6L18 12L13.16 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <h1 className="text-2xl font-semibold text-[#24252C] mb-8 text-center" suppressHydrationWarning>
          {isClient ? t.auth.login : 'Login'}
        </h1>

        <form onSubmit={handleSubmit} className="w-full max-w-[331px] space-y-4 mb-6">
          {error && (
            <div className="text-sm text-red-500 text-center mb-2">
              {error}
            </div>
          )}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[52px] px-4 border border-[#5F33E1] rounded-[15px] text-sm placeholder:text-[#24252C] placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#5F33E1]"
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={t.auth.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[52px] px-4 pr-12 border border-[#5F33E1] rounded-[15px] text-sm placeholder:text-[#24252C] placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#5F33E1]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6A7C] hover:text-[#5F33E1] transition-colors"
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1751 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.481 9.80385 14.1962C9.51897 13.9113 9.29441 13.5719 9.14351 13.1984C8.9926 12.8249 8.91853 12.4247 8.92564 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88M1 1L23 23"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[52px] bg-[#5F33E1] rounded-[15px] text-white font-semibold text-lg flex items-center justify-center relative mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t.common.loading : t.auth.enter}
            <svg
              className="absolute right-[24px] w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M13.16 6L18 12L13.16 18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>

        <Link href="/registration" className="text-sm text-[#5F33E1]">
          {t.auth.registration}
        </Link>
      </div>
    </div>
  )
}
