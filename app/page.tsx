'use client'

import { useBasePath } from '../lib/useBasePath'
import { useTranslation } from '../lib/useTranslation'

export default function Page() {
  const { t } = useTranslation()
  const basePath = useBasePath()
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Декоративные элементы - эллипсы с градиентами */}
      <div className="absolute top-[232px] left-[333px] w-[60px] h-[60px] bg-gradient-to-b from-[rgba(37,85,255,1)] to-[rgba(37,85,255,0.25)] rounded-full blur-[100px]" />
      <div className="absolute top-[424px] left-[76px] w-[58px] h-[58px] bg-gradient-to-b from-[rgba(70,189,240,1)] to-[rgba(70,179,240,0.15)] rounded-full blur-[100px]" />
      <div className="absolute top-[767px] left-[240px] w-[58px] h-[58px] bg-gradient-to-b from-[rgba(240,182,70,1)] to-[rgba(240,203,70,0.15)] rounded-full blur-[100px]" />
      <div className="absolute top-[126px] -left-[15px] w-[70px] h-[70px] bg-gradient-to-b from-[rgba(70,240,128,1)] to-[rgba(70,240,138,0.15)] rounded-full blur-[100px]" />
      <div className="absolute top-0 left-[263px] w-[70px] h-[70px] bg-gradient-to-b from-[rgba(237,240,70,1)] to-[rgba(240,233,70,0.15)] rounded-full blur-[100px]" />
      <div className="absolute top-[734px] left-[34px] w-[310px] h-[7px] bg-[#5F33E1] rounded-full blur-[30px]" />

      {/* Декоративные точки */}
      <div className="absolute top-[383px] left-[250px] w-2 h-2 bg-[#EAED2A] rounded-full" />
      <div className="absolute top-[391px] left-[138px] w-2 h-2 bg-[#FFD7E4] rounded-full" />
      <div className="absolute top-[73px] left-[252px] w-2 h-2 bg-[#92DEFF] rounded-full" />
      <div className="absolute top-[92px] left-[202px] w-1 h-1 bg-[#BE9FFF] rounded-full" />
      <div className="absolute top-[362px] left-[281px] w-1 h-1 bg-[#7FFCAA] rounded-full" />
      <div className="absolute top-[405px] left-[176px] w-1 h-1 bg-[#A4E7F9] rounded-full" />

      {/* Изображения с анимациями */}
      <div className="absolute top-[147px] left-[131px] w-[159px] h-[184px] animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <img
          src={`${basePath}/images/woman-laptop.png`}
          alt="Woman with laptop"
          width={159}
          height={184}
          className="object-contain drop-shadow-lg"
        />
      </div>
      <div className="absolute top-[279px] left-[79px] w-[36px] h-[52px] animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <img
          src={`${basePath}/images/vase-tulips.png`}
          alt="Vase with tulips"
          width={36}
          height={52}
          className="object-contain drop-shadow-md"
        />
      </div>
      <div className="absolute top-[69px] left-[104px] w-[40px] h-[50px] animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <img
          src={`${basePath}/images/stopwatch.png`}
          alt="Stopwatch"
          width={40}
          height={50}
          className="object-contain drop-shadow-md"
        />
      </div>
      <div className="absolute top-[225px] left-[245px] w-[62px] h-[42px] animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <img
          src={`${basePath}/images/notifications.png`}
          alt="Notifications"
          width={62}
          height={42}
          className="object-contain drop-shadow-md"
        />
      </div>
      <div className="absolute top-[180px] left-[84px] w-[26px] h-[26px] animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <img
          src={`${basePath}/images/pie-chart.png`}
          alt="Pie chart"
          width={26}
          height={26}
          className="object-contain drop-shadow-md"
        />
      </div>
      <div className="absolute top-[310px] left-[67px] w-[18px] h-[22px] animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <img
          src={`${basePath}/images/coffee-cup.png`}
          alt="Coffee cup"
          width={18}
          height={22}
          className="object-contain drop-shadow-md"
        />
      </div>
      <div className="absolute top-[136px] left-[276px] w-[36px] h-[33px] animate-fade-in" style={{ animationDelay: '0.7s' }}>
        <img
          src={`${basePath}/images/calendar.png`}
          alt="Calendar"
          width={36}
          height={33}
          className="object-contain drop-shadow-md"
        />
      </div>

      {/* Основной контент */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <h1 className="text-2xl font-semibold text-[#24252C] mb-4 text-center">
          {t.start.taskSync}
        </h1>
        <p className="text-sm text-[#6E6A7C] text-center mb-8 max-w-[266px] leading-relaxed">
          {t.start.description}
        </p>
        <a
          href={`${basePath}/login`}
          className="w-[331px] h-[52px] bg-[#5F33E1] rounded-[14px] text-white font-semibold text-lg flex items-center justify-center relative"
        >
          {t.start.letsStart}
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
        </a>
      </div>
    </div>
  )
}
