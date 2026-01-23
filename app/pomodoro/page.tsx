'use client'

import { useState, useEffect, useRef } from 'react'
import { useBasePath } from '../../lib/useBasePath'
import { getCurrentUser } from '../../lib/auth'
import { getPomodoroSettings } from '../../lib/pomodoroSettings'
import { useTranslation } from '../../lib/useTranslation'
import PageHeader from '../../components/PageHeader'
import BottomNavigation from '../../components/BottomNavigation'

type TimerMode = 'work' | 'shortBreak' | 'longBreak'

export default function PomodoroPage() {
  const { t } = useTranslation()
  const [user, setUser] = useState<{ email: string; name?: string; avatarUrl?: string } | null>(null)
  const [settings, setSettings] = useState(getPomodoroSettings())
  const [timeLeft, setTimeLeft] = useState(settings.workInterval * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState<TimerMode>('work')
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const basePath = useBasePath()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      window.location.href = `${basePath}/login`
    } else {
      setUser(currentUser)
      const currentSettings = getPomodoroSettings()
      setSettings(currentSettings)
      setTimeLeft(currentSettings.workInterval * 60)
    }
  }, [basePath])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const handleTimerComplete = () => {
    setIsRunning(false)
    if (mode === 'work') {
      const newCompleted = completedPomodoros + 1
      setCompletedPomodoros(newCompleted)
      // После заданного количества помодоро - длинный перерыв, иначе короткий
      if (newCompleted % settings.intervalCount === 0) {
        setMode('longBreak')
        setTimeLeft(settings.breakInterval * 2 * 60) // Длинный перерыв = 2x обычного
      } else {
        setMode('shortBreak')
        setTimeLeft(settings.breakInterval * 60)
      }
    } else {
      // После перерыва возвращаемся к работе
      setMode('work')
      setTimeLeft(settings.workInterval * 60)
    }
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    if (mode === 'work') {
      setTimeLeft(settings.workInterval * 60)
    } else if (mode === 'shortBreak') {
      setTimeLeft(settings.breakInterval * 60)
    } else {
      setTimeLeft(settings.breakInterval * 2 * 60)
    }
  }

  const selectMode = (newMode: TimerMode) => {
    setIsRunning(false)
    setMode(newMode)
    if (newMode === 'work') {
      setTimeLeft(settings.workInterval * 60)
    } else if (newMode === 'shortBreak') {
      setTimeLeft(settings.breakInterval * 60)
    } else {
      setTimeLeft(settings.breakInterval * 2 * 60)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = () => {
    const total = mode === 'work' 
      ? settings.workInterval * 60 
      : mode === 'shortBreak' 
      ? settings.breakInterval * 60 
      : settings.breakInterval * 2 * 60
    return ((total - timeLeft) / total) * 100
  }

  if (!user) {
    return null
  }

  return (
    <div className="relative min-h-screen w-full bg-white pb-24">
      <PageHeader title={t.pomodoro.pomodoro} />

      <div className="px-6 py-6 space-y-6">
        {/* Timer Display */}
        <div className="flex flex-col items-center py-8">
          {/* Circular Progress */}
          <div className="relative w-64 h-64 mb-8">
            <svg className="transform -rotate-90 w-full h-full">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="#E5E5E5"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="#5F33E1"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 120}`}
                strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress() / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-semibold text-[#24252C] mb-2">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-[#6E6A7C]">
                {mode === 'work' ? t.pomodoro.focusTime : mode === 'shortBreak' ? t.pomodoro.shortBreak : t.pomodoro.longBreak}
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={toggleTimer}
              className="w-16 h-16 bg-[#5F33E1] rounded-full flex items-center justify-center shadow-lg"
            >
              {isRunning ? (
                <svg
                  className="w-8 h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" />
                  <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 text-white ml-1"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M8 5V19L19 12L8 5Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={resetTimer}
              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-[#6E6A7C]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8V12L15 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Mode Selector */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => selectMode('work')}
              className={`px-4 py-2 rounded-[7px] text-sm font-semibold transition-colors ${
                mode === 'work'
                  ? 'bg-[#5F33E1] text-white'
                  : 'bg-gray-100 text-[#6E6A7C]'
              }`}
            >
              {t.pomodoro.work}
            </button>
            <button
              onClick={() => selectMode('shortBreak')}
              className={`px-4 py-2 rounded-[7px] text-sm font-semibold transition-colors ${
                mode === 'shortBreak'
                  ? 'bg-[#5F33E1] text-white'
                  : 'bg-gray-100 text-[#6E6A7C]'
              }`}
            >
              {t.pomodoro.shortBreak}
            </button>
            <button
              onClick={() => selectMode('longBreak')}
              className={`px-4 py-2 rounded-[7px] text-sm font-semibold transition-colors ${
                mode === 'longBreak'
                  ? 'bg-[#5F33E1] text-white'
                  : 'bg-gray-100 text-[#6E6A7C]'
              }`}
            >
              {t.pomodoro.longBreak}
            </button>
          </div>

          {/* Completed Pomodoros */}
          <div className="text-center">
            <p className="text-sm text-[#6E6A7C] mb-2">{t.pomodoro.completedPomodoros}</p>
            <p className="text-2xl font-semibold text-[#24252C]">{completedPomodoros}</p>
          </div>
        </div>

        {/* Time Blocks Visualization */}
        <div className="bg-white rounded-[15px] p-6 shadow-[0px_4px_32px_rgba(0,0,0,0.04)]">
          <h3 className="text-lg font-semibold text-[#24252C] mb-4">{t.pomodoro.todaySessions}</h3>
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`h-12 flex-1 min-w-[40px] rounded-[7px] ${
                  i < completedPomodoros
                    ? 'bg-[#5F33E1]'
                    : i === completedPomodoros && isRunning && mode === 'work'
                    ? 'bg-[#8B6FE8]'
                    : 'bg-gray-100'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
