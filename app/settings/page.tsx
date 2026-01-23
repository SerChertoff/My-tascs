'use client'

import { useState, useEffect } from 'react'
import { useBasePath } from '../../lib/useBasePath'
import { getCurrentUser, updateUser, getUsers, saveUser } from '../../lib/auth'
import { getPomodoroSettings, savePomodoroSettings, PomodoroSettings } from '../../lib/pomodoroSettings'
import PageHeader from '../../components/PageHeader'
import BottomNavigation from '../../components/BottomNavigation'

export default function SettingsPage() {
  const [user, setUser] = useState<{ email: string; name?: string; avatarUrl?: string } | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
      if (password.trim() && password.length >= 6) {
        const users = getUsers()
        const userIndex = users.findIndex(u => u.email === email)
        if (userIndex >= 0) {
          users[userIndex].password = password
          saveUser(users[userIndex])
          setPassword('') // Очищаем поле после сохранения
        }
      }
      
      setSaveMessage('Настройки профиля сохранены')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      setSaveMessage('Ошибка при сохранении')
    } finally {
      setIsSaving(false)
    }
  }

  const handleSavePomodoro = () => {
    setIsSaving(true)
    setSaveMessage('')
    
    try {
      savePomodoroSettings(pomodoroSettings)
      setSaveMessage('Настройки Pomodoro сохранены')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      setSaveMessage('Ошибка при сохранении')
    } finally {
      setIsSaving(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="relative min-h-screen w-full bg-white pb-24">
      <PageHeader title="Settings" />

      <div className="px-6 py-6 space-y-6">
        {saveMessage && (
          <div className={`p-4 rounded-[15px] ${
            saveMessage.includes('Ошибка') 
              ? 'bg-red-50 text-red-600' 
              : 'bg-green-50 text-green-600'
          }`}>
            <p className="text-sm font-semibold">{saveMessage}</p>
          </div>
        )}

        {/* Profile Section */}
        <div className="bg-white rounded-[15px] p-6 shadow-[0px_4px_32px_rgba(0,0,0,0.04)]">
          <h3 className="text-lg font-semibold text-[#24252C] mb-4">Profile</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#6E6A7C] mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                  className="w-full h-[40px] px-4 border border-gray-300 rounded-[15px] text-sm bg-gray-50 text-[#6E6A7C] focus:outline-none"
                />
                <p className="text-xs text-[#6E6A7C] mt-1">Email нельзя изменить</p>
              </div>
              <div>
                <label className="block text-sm text-[#6E6A7C] mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Новый пароль"
                  className="w-full h-[40px] px-4 border border-[#5F33E1] rounded-[15px] text-sm focus:outline-none focus:ring-2 focus:ring-[#5F33E1]"
                />
                <p className="text-xs text-[#6E6A7C] mt-1">Минимум 6 символов</p>
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#6E6A7C] mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                className="w-full h-[40px] px-4 border border-[#5F33E1] rounded-[15px] text-sm focus:outline-none focus:ring-2 focus:ring-[#5F33E1]"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="w-full h-[40px] bg-[#5F33E1] rounded-[15px] text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Сохранение...' : 'Сохранить профиль'}
            </button>
          </div>
        </div>

        {/* Pomodoro Section */}
        <div className="bg-white rounded-[15px] p-6 shadow-[0px_4px_32px_rgba(0,0,0,0.04)]">
          <h3 className="text-lg font-semibold text-[#24252C] mb-4">Pomodoro</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#6E6A7C] mb-2">Work Interval</label>
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
                <p className="text-xs text-[#6E6A7C] mt-1">минут</p>
              </div>
              <div>
                <label className="block text-sm text-[#6E6A7C] mb-2">Interval Count</label>
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
                <p className="text-xs text-[#6E6A7C] mt-1">интервалов</p>
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#6E6A7C] mb-2">Break Interval</label>
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
              <p className="text-xs text-[#6E6A7C] mt-1">минут</p>
            </div>
            <button
              onClick={handleSavePomodoro}
              disabled={isSaving}
              className="w-full h-[40px] bg-[#5F33E1] rounded-[15px] text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Сохранение...' : 'Сохранить настройки Pomodoro'}
            </button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
