"use client";

import Link from "next/link";
import { useTranslation } from "../lib/useTranslation";

export default function LandingClient() {
  const { t, isClient } = useTranslation();
  const staticBase = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <div className="min-h-screen w-full overflow-hidden bg-white flex justify-center">
      {/* Контейнер лендинга: на десктопе фиксированная ширина по центру, чтобы картинки не уезжали */}
      <div className="relative min-h-screen w-full max-w-[420px] min-w-0">
        {/* Декоративные элементы - эллипсы с градиентами */}
        <div className="absolute top-[125px] left-[333px] w-[60px] h-[60px] bg-gradient-to-b from-[rgba(37,85,255,1)] to-[rgba(37,85,255,0.25)] rounded-full blur-[100px]" />
        <div className="absolute top-[317px] left-[76px] w-[58px] h-[58px] bg-gradient-to-b from-[rgba(70,189,240,1)] to-[rgba(70,179,240,0.15)] rounded-full blur-[100px]" />
        <div className="absolute top-[660px] left-[240px] w-[58px] h-[58px] bg-gradient-to-b from-[rgba(240,182,70,1)] to-[rgba(240,203,70,0.15)] rounded-full blur-[100px]" />
        <div className="absolute top-[19px] -left-[15px] w-[70px] h-[70px] bg-gradient-to-b from-[rgba(70,240,128,1)] to-[rgba(70,240,138,0.15)] rounded-full blur-[100px]" />
        <div className="absolute top-[-107px] left-[263px] w-[70px] h-[70px] bg-gradient-to-b from-[rgba(237,240,70,1)] to-[rgba(240,233,70,0.15)] rounded-full blur-[100px]" />
        <div className="absolute top-[627px] left-[34px] w-[310px] h-[7px] bg-[#5F33E1] rounded-full blur-[30px]" />

        {/* Декоративные точки */}
        <div className="absolute top-[276px] left-[250px] w-2 h-2 bg-[#EAED2A] rounded-full" />
        <div className="absolute top-[284px] left-[138px] w-2 h-2 bg-[#FFD7E4] rounded-full" />
        <div className="absolute top-[-34px] left-[252px] w-2 h-2 bg-[#92DEFF] rounded-full" />
        <div className="absolute top-[-15px] left-[202px] w-1 h-1 bg-[#BE9FFF] rounded-full" />
        <div className="absolute top-[255px] left-[281px] w-1 h-1 bg-[#7FFCAA] rounded-full" />
        <div className="absolute top-[298px] left-[176px] w-1 h-1 bg-[#A4E7F9] rounded-full" />

        {/* Изображения с анимациями */}
        <div className="absolute top-[40px] left-[131px] w-[159px] h-[184px] animate-fade-in">
          <img
            src={`${staticBase}/images/woman-laptop.png`}
            alt=""
            width={159}
            height={184}
            fetchPriority="high"
            className="object-contain drop-shadow-lg"
          />
        </div>
        <div
          className="absolute top-[172px] left-[79px] w-[36px] h-[52px] animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <img
            src={`${staticBase}/images/vase-tulips.png`}
            alt=""
            width={36}
            height={52}
            loading="lazy"
            className="object-contain drop-shadow-md"
          />
        </div>
        <div
          className="absolute top-[29px] left-[104px] w-[40px] h-[50px] animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <img
            src={`${staticBase}/images/stopwatch.png`}
            alt=""
            width={40}
            height={50}
            loading="lazy"
            className="object-contain drop-shadow-md"
          />
        </div>
        <div
          className="absolute top-[118px] left-[245px] w-[62px] h-[42px] animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <img
            src={`${staticBase}/images/notifications.png`}
            alt=""
            width={62}
            height={42}
            loading="lazy"
            className="object-contain drop-shadow-md"
          />
        </div>
        <div
          className="absolute top-[73px] left-[84px] w-[26px] h-[26px] animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <img
            src={`${staticBase}/images/pie-chart.png`}
            alt=""
            width={26}
            height={26}
            loading="lazy"
            className="object-contain drop-shadow-md"
          />
        </div>
        <div
          className="absolute top-[203px] left-[67px] w-[18px] h-[22px] animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <img
            src={`${staticBase}/images/coffee-cup.png`}
            alt=""
            width={18}
            height={22}
            loading="lazy"
            className="object-contain drop-shadow-md"
          />
        </div>
        <div
          className="absolute top-[29px] left-[276px] w-[36px] h-[33px] animate-fade-in"
          style={{ animationDelay: "0.7s" }}
        >
          <img
            src={`${staticBase}/images/calendar.png`}
            alt=""
            width={36}
            height={33}
            loading="lazy"
            className="object-contain drop-shadow-md"
          />
        </div>

        {/* Основной контент */}
        <div className="relative z-10 flex flex-col items-center justify-end min-h-screen px-6 pb-16">
          <h1
            className="text-2xl font-semibold text-[#24252C] mb-4 text-center"
            suppressHydrationWarning
          >
            {isClient ? t.start.taskSync : "Task Sync"}
          </h1>
          <p
            className="text-sm text-[#6E6A7C] text-center mb-8 max-w-[266px] leading-relaxed"
            suppressHydrationWarning
          >
            {isClient
              ? t.start.description
              : "This productive tool is designed to help you better manage your task project-wise conveniently!"}
          </p>
          <Link
            href="/login"
            className="w-full max-w-[331px] h-[52px] bg-[#5F33E1] rounded-[15px] text-white font-semibold text-lg flex items-center justify-center relative"
            suppressHydrationWarning
          >
            {isClient ? t.start.letsStart : "Let's Start"}
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
          </Link>
        </div>
      </div>
    </div>
  );
}
