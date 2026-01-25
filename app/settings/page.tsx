'use client'

import { useState, useEffect } from 'react'
import { useBasePath } from '../../lib/useBasePath'
import { getCurrentUser, updateUser, getUsers, saveUser } from '../../lib/auth'
import { getPomodoroSettings, savePomodoroSettings, PomodoroSettings } from '../../lib/pomodoroSettings'
import { toast } from '../../lib/toast'
import { useTranslation } from '../../lib/useTranslation'
import { setLanguage, Language } from '../../lib/i18n'
import PageHeader from '../../components/PageHeader'
import BottomNavigation from '../../components/BottomNavigation'

export default function SettingsPage() {
  const { t, language } = useTranslation()
  const [user, setUser] = useState<{ email: string; name?: string; avatarUrl?: string } | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [pomodoroSettings, setPomodoroSettings] = useState<PomodoroSettings>(getPomodoroSettings())
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const basePath = useBasePath()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      window.location.href = `${basePath}/login`
    } else {
      setUser(currentUser)
      setEmail(currentUser.email)
      setName(currentUser.name || '')
      setPomodoroSettings(getPomodoroSettings())
    }
  }, [basePath])

  const handleSaveProfile = () => {
    setIsSaving(true)
    setSaveMessage('')
    
    try {
      // Обновляем имя
      if (name.trim()) {
        updateUser({ name: name.trim() })
        setUser({ ...user!, name: name.trim() })
      }
      
      // Обновляем пароль, если он был введен
      if (password.trim()) {
        if (password.length < 6) {
          toast.error(t.auth.passwordMinLength)
          setIsSaving(false)
          return
        }
        const users = getUsers()
        const userIndex = users.findIndex(u => u.email === email)
        if (userIndex >= 0) {
          users[userIndex].password = password
          saveUser(users[userIndex])
          setPassword('') // Очищаем поле после сохранения
        }
      }
      
      toast.success(t.settings.profileSaved)
      setSaveMessage(t.settings.profileSaved)
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      toast.error(t.settings.saveError)
      setSaveMessage(t.settings.saveError)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSavePomodoro = () => {
    if (pomodoroSettings.workInterval < 1 || pomodoroSettings.workInterval > 60) {
      toast.error(t.settings.workIntervalRange)
      return
    }
    if (pomodoroSettings.breakInterval < 1 || pomodoroSettings.breakInterval > 30) {
      toast.error(t.settings.breakIntervalRange)
      return
    }
    if (pomodoroSettings.intervalCount < 1 || pomodoroSettings.intervalCount > 10) {
      toast.error(t.settings.intervalCountRange)
      return
    }

    setIsSaving(true)
    setSaveMessage('')
    
    try {
      savePomodoroSettings(pomodoroSettings)
      toast.success(t.settings.pomodoroSaved)
      setSaveMessage(t.settings.pomodoroSaved)
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      toast.error(t.settings.saveError)
      setSaveMessage(t.settings.saveError)
    } finally {
      setIsSaving(false)
    }
  }

  if (!user) {
    return null
  }

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    // setLanguage сохраняет в localStorage и вызывает window.location.reload()
  }

  return (
    <div className="relative min-h-screen w-full bg-white pb-24">
      <PageHeader title={t.settings.settings} />

      <div className="px-6 py-6 space-y-6">
        {saveMessage && (
          <div className={`p-4 rounded-[15px] ${
            saveMessage.includes(t.settings.saveError) || saveMessage.includes('Error')
              ? 'bg-red-50 text-red-600' 
              : 'bg-green-50 text-green-600'
          }`}>
            <p className="text-sm font-semibold">{saveMessage}</p>
          </div>
        )}

        {/* Profile Section */}
        <div className="bg-white rounded-[15px] p-6 shadow-[0px_4px_32px_rgba(0,0,0,0.04)]">
          <h3 className="text-lg font-semibold text-[#24252C] mb-4">{t.settings.profile}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#6E6A7C] mb-2">{t.auth.email}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                  className="w-full h-[40px] px-4 border border-gray-300 rounded-[15px] text-sm bg-gray-50 text-[#6E6A7C] focus:outline-none"
                />
                <p className="text-xs text-[#6E6A7C] mt-1">{t.settings.emailCannotBeChanged}</p>
              </div>
              <div>
                <label className="block text-sm text-[#6E6A7C] mb-2">{t.auth.password}</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.settings.newPassword}
                    className="w-full h-[40px] px-4 pr-12 border border-[#5F33E1] rounded-[15px] text-sm focus:outline-none focus:ring-2 focus:ring-[#5F33E1]"
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
                <p className="text-xs text-[#6E6A7C] mt-1">{t.settings.minimumCharacters}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#6E6A7C] mb-2">{t.auth.name}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.auth.name}
                className="w-full h-[40px] px-4 border border-[#5F33E1] rounded-[15px] text-sm focus:outline-none focus:ring-2 focus:ring-[#5F33E1]"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="w-full h-[40px] bg-[#5F33E1] rounded-[15px] text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? t.settings.saving : t.settings.saveProfile}
            </button>
          </div>
        </div>

        {/* Pomodoro Section */}
        <div className="bg-white rounded-[15px] p-6 shadow-[0px_4px_32px_rgba(0,0,0,0.04)]">
          <h3 className="text-lg font-semibold text-[#24252C] mb-4">{t.settings.pomodoro}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#6E6A7C] mb-2">{t.settings.workInterval}</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={pomodoroSettings.workInterval}
                  onChange={(e) => setPomodoroSettings({
                    ...pomodoroSettings,
                    workInterval: parseInt(e.target.value) || 25
                  })}
                  className="w-full h-[40px] px-4 border border-[#5F33E1] rounded-[15px] text-sm focus:outline-none focus:ring-2 focus:ring-[#5F33E1]"
                />
                <p className="text-xs text-[#6E6A7C] mt-1">{t.settings.minutes}</p>
              </div>
              <div>
                <label className="block text-sm text-[#6E6A7C] mb-2">{t.settings.intervalCount}</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={pomodoroSettings.intervalCount}
                  onChange={(e) => setPomodoroSettings({
                    ...pomodoroSettings,
                    intervalCount: parseInt(e.target.value) || 4
                  })}
                  className="w-full h-[40px] px-4 border border-[#5F33E1] rounded-[15px] text-sm focus:outline-none focus:ring-2 focus:ring-[#5F33E1]"
                />
                <p className="text-xs text-[#6E6A7C] mt-1">{t.settings.intervals}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#6E6A7C] mb-2">{t.settings.breakInterval}</label>
              <input
                type="number"
                min="1"
                max="30"
                value={pomodoroSettings.breakInterval}
                onChange={(e) => setPomodoroSettings({
                  ...pomodoroSettings,
                  breakInterval: parseInt(e.target.value) || 5
                })}
                className="w-full h-[40px] px-4 border border-[#5F33E1] rounded-[15px] text-sm focus:outline-none focus:ring-2 focus:ring-[#5F33E1]"
              />
              <p className="text-xs text-[#6E6A7C] mt-1">{t.settings.minutes}</p>
            </div>
            <button
              onClick={handleSavePomodoro}
              disabled={isSaving}
              className="w-full h-[40px] bg-[#5F33E1] rounded-[15px] text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? t.settings.saving : t.settings.savePomodoro}
            </button>
          </div>
        </div>

        {/* Language Section */}
        <div className="bg-white rounded-[15px] p-6 shadow-[0px_4px_32px_rgba(0,0,0,0.04)]">
          <h3 className="text-lg font-semibold text-[#24252C] mb-4">{t.settings.language}</h3>
          <div className="space-y-3">
            <p className="text-sm text-[#6E6A7C] mb-3">{t.settings.selectLanguage}</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`flex-1 h-[48px] rounded-[15px] font-semibold text-sm transition-all ${
                  language === 'en'
                    ? 'bg-[#5F33E1] text-white shadow-lg'
                    : 'bg-gray-100 text-[#6E6A7C] hover:bg-gray-200'
                }`}
              >
                {t.settings.english}
              </button>
              <button
                onClick={() => handleLanguageChange('ru')}
                className={`flex-1 h-[48px] rounded-[15px] font-semibold text-sm transition-all ${
                  language === 'ru'
                    ? 'bg-[#5F33E1] text-white shadow-lg'
                    : 'bg-gray-100 text-[#6E6A7C] hover:bg-gray-200'
                }`}
              >
                {t.settings.russian}
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
