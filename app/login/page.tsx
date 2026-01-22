'use client'

import { useState } from 'react'
import { useBasePath } from '../../lib/useBasePath'
import { login } from '../../lib/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const basePath = useBasePath()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Простая валидация
    if (!email || !password) {
      setError('Пожалуйста, заполните все поля')
      setIsLoading(false)
      return
    }

    // Проверка логина
    const success = login(email, password)
    
    if (success) {
      // Редирект на главную страницу
      window.location.href = `${basePath}/home`
    } else {
      setError('Неверный email или пароль')
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
        <a href={`${basePath}/`} className="absolute top-8 left-6">
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
        </a>

        <h1 className="text-2xl font-semibold text-[#24252C] mb-8 text-center">
          Login
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
              className="w-full h-[30px] px-4 py-2 border border-[#5F33E1] rounded-[15px] text-sm placeholder:text-[#24252C] placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#5F33E1]"
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[30px] px-4 py-2 border border-[#5F33E1] rounded-[15px] text-sm placeholder:text-[#24252C] placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#5F33E1]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-[331px] h-[52px] bg-[#5F33E1] rounded-[14px] text-white font-semibold text-lg flex items-center justify-center relative mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Вход...' : 'Enter'}
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

        <a href={`${basePath}/registration`} className="text-sm text-[#5F33E1]">
          Registration
        </a>
      </div>
    </div>
  )
}
