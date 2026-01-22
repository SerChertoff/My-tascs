'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Registration() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Декоративные элементы */}
      <div className="absolute top-[232px] left-[333px] w-[60px] h-[60px] bg-gradient-to-b from-[rgba(37,85,255,1)] to-[rgba(37,85,255,0.25)] rounded-full blur-[100px]" />
      <div className="absolute top-[424px] left-[76px] w-[58px] h-[58px] bg-gradient-to-b from-[rgba(70,189,240,1)] to-[rgba(70,179,240,0.15)] rounded-full blur-[100px]" />
      <div className="absolute top-[767px] left-[240px] w-[58px] h-[58px] bg-gradient-to-b from-[rgba(240,182,70,1)] to-[rgba(240,203,70,0.15)] rounded-full blur-[100px]" />
      <div className="absolute top-[126px] -left-[15px] w-[70px] h-[70px] bg-gradient-to-b from-[rgba(70,240,128,1)] to-[rgba(70,240,138,0.15)] rounded-full blur-[100px]" />
      <div className="absolute top-0 left-[263px] w-[70px] h-[70px] bg-gradient-to-b from-[rgba(237,240,70,1)] to-[rgba(240,233,70,0.15)] rounded-full blur-[100px]" />
      <div className="absolute top-[734px] left-[34px] w-[310px] h-[7px] bg-primary rounded-full blur-[30px]" />

      {/* Изображения */}
      <div className="absolute top-[147px] left-[131px] w-[159px] h-[184px] opacity-80">
        <Image
          src="/images/woman-laptop.png"
          alt="Woman with laptop"
          width={159}
          height={184}
          className="object-contain"
        />
      </div>
      <div className="absolute top-[279px] left-[79px] w-[36px] h-[52px] opacity-80">
        <Image
          src="/images/vase-tulips.png"
          alt="Vase with tulips"
          width={36}
          height={52}
          className="object-contain"
        />
      </div>
      <div className="absolute top-[69px] left-[104px] w-[40px] h-[50px] opacity-80">
        <Image
          src="/images/stopwatch.png"
          alt="Stopwatch"
          width={40}
          height={50}
          className="object-contain"
        />
      </div>
      <div className="absolute top-[225px] left-[245px] w-[62px] h-[42px] opacity-80">
        <Image
          src="/images/notifications.png"
          alt="Notifications"
          width={62}
          height={42}
          className="object-contain"
        />
      </div>
      <div className="absolute top-[180px] left-[84px] w-[26px] h-[26px] opacity-80">
        <Image
          src="/images/pie-chart.png"
          alt="Pie chart"
          width={26}
          height={26}
          className="object-contain"
        />
      </div>
      <div className="absolute top-[310px] left-[67px] w-[18px] h-[22px] opacity-80">
        <Image
          src="/images/coffee-cup.png"
          alt="Coffee cup"
          width={18}
          height={22}
          className="object-contain"
        />
      </div>
      <div className="absolute top-[136px] left-[276px] w-[36px] h-[33px] opacity-80">
        <Image
          src="/images/calendar.png"
          alt="Calendar"
          width={36}
          height={33}
          className="object-contain"
        />
      </div>

      {/* Основной контент */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <Link href="/login" className="absolute top-8 left-6">
          <svg
            className="w-6 h-6 text-black"
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

        <h1 className="text-2xl font-semibold text-black mb-8 text-center">
          Registration
        </h1>

        <div className="w-full max-w-[331px] space-y-4 mb-6">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[30px] px-4 py-2 border border-primary rounded-[15px] text-sm placeholder:text-black placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[30px] px-4 py-2 border border-primary rounded-[15px] text-sm placeholder:text-black placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <button className="w-[331px] h-[52px] bg-primary rounded-[14px] text-white font-semibold text-lg flex items-center justify-center relative mb-4">
          Enter
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

        <Link href="/login" className="text-sm text-primary">
          Login
        </Link>
      </div>
    </div>
  )
}
