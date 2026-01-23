'use client'

import { useState, useEffect } from 'react'
import { useBasePath } from '../../lib/useBasePath'
import { getCurrentUser, logout, updateUser } from '../../lib/auth'
import { getTaskStats } from '../../lib/tasks'
import PageHeader from '../../components/PageHeader'
import BottomNavigation from '../../components/BottomNavigation'

export default function ProfilePage() {
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null)
  const [stats, setStats] = useState(getTaskStats())
  const [name, setName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const basePath = useBasePath()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      window.location.href = `${basePath}/login`
    } else {
      setUser(currentUser)
      setName(currentUser.name || '')
      setStats(getTaskStats())
    }
  }, [basePath])

  const handleSaveName = () => {
    if (name.trim()) {
      updateUser({ name: name.trim() })
      setUser({ ...user!, name: name.trim() })
      setIsEditing(false)
    }
  }

  const handleLogout = () => {
    logout()
    window.location.href = `${basePath}/`
  }

  if (!user) {
    return null
  }

  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0

  return (
    <div className="relative min-h-screen w-full bg-white pb-24">
      <PageHeader title="Profile" />

      {/* Profile Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Avatar and Name */}
        <div className="flex flex-col items-center py-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-4">
            <img
              src={`${basePath}/images/avatar.png`}
              alt="Avatar"
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
          {isEditing ? (
            <div className="flex items-center gap-2 w-full max-w-[200px]">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="flex-1 h-[40px] px-4 border border-[#5F33E1] rounded-[15px] text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#5F33E1]"
                autoFocus
              />
              <button
                onClick={handleSaveName}
                className="w-10 h-10 bg-[#5F33E1] rounded-[15px] flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  setName(user.name || '')
                  setIsEditing(false)
                }}
                className="w-10 h-10 bg-gray-100 rounded-[15px] flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 text-[#6E6A7C]"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-xl font-semibold text-[#24252C]">
                {user.name || user.email}
              </h2>
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-[#5F33E1] font-semibold"
              >
                Edit name
              </button>
            </div>
          )}
          <p className="text-xs text-[#6E6A7C] mt-2">{user.email}</p>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-[15px] p-6 shadow-[0px_4px_32px_rgba(0,0,0,0.04)]">
          <h3 className="text-lg font-semibold text-[#24252C] mb-4">Statistics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6E6A7C]">Total Tasks</span>
              <span className="text-lg font-semibold text-[#24252C]">{stats.total}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6E6A7C]">Completed</span>
              <span className="text-lg font-semibold text-[#5F33E1]">{stats.completed}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6E6A7C]">Pending</span>
              <span className="text-lg font-semibold text-[#24252C]">
                {stats.total - stats.completed}
              </span>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#6E6A7C]">Completion Rate</span>
                <span className="text-lg font-semibold text-[#5F33E1]">{completionRate}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#5F33E1] rounded-full transition-all duration-300"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#5F33E1] rounded-[15px] p-4 shadow-[0px_4px_32px_rgba(0,0,0,0.04)]">
            <p className="text-sm text-white mb-2">Today Tasks</p>
            <p className="text-[32px] font-semibold text-white leading-none">{stats.today}</p>
          </div>
          <div className="bg-white rounded-[15px] p-4 shadow-[0px_4px_32px_rgba(0,0,0,0.04)]">
            <p className="text-sm text-[#24252C] mb-2">Week Tasks</p>
            <p className="text-[32px] font-semibold text-[#24252C] leading-none">{stats.week}</p>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-[15px] p-6 shadow-[0px_4px_32px_rgba(0,0,0,0.04)]">
          <h3 className="text-lg font-semibold text-[#24252C] mb-4">Settings</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between py-3">
              <span className="text-sm text-[#24252C]">Notifications</span>
              <svg
                className="w-5 h-5 text-[#6E6A7C]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="w-full flex items-center justify-between py-3">
              <span className="text-sm text-[#24252C]">Theme</span>
              <svg
                className="w-5 h-5 text-[#6E6A7C]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="w-full flex items-center justify-between py-3">
              <span className="text-sm text-[#24252C]">Language</span>
              <svg
                className="w-5 h-5 text-[#6E6A7C]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full h-[52px] bg-red-50 border-2 border-red-200 rounded-[14px] text-red-600 font-semibold text-lg flex items-center justify-center"
        >
          Logout
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0px_-4px_32px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-around px-4 py-3">
          <a href={`${basePath}/home`} className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path
                  d="M9.02 2.84L3.63 7.04C2.73 7.74 2 9.23 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.77V10.36C22 9.23 21.27 7.74 20.37 7.05L14.98 2.84C13.54 1.74 11.46 1.74 10.02 2.84Z"
                  stroke="#6E6A7C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>
          <a href={`${basePath}/calendar`} className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path
                  d="M8 2V6"
                  stroke="#6E6A7C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 2V6"
                  stroke="#6E6A7C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 10H21"
                  stroke="#6E6A7C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="18"
                  rx="2"
                  stroke="#6E6A7C"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </a>
          <a href={`${basePath}/new-task`} className="flex flex-col items-center">
            <div className="w-11 h-11 bg-[#5F33E1] rounded-full flex items-center justify-center shadow-[2px_10px_18px_rgba(95,51,225,0.49)]">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>
          <a href={`${basePath}/tasks`} className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path
                  d="M14.68 2.02L14.68 2.02C14.68 2.02 6.75 12.25 6.75 12.25L14.68 16.25L14.68 16.25"
                  stroke="#6E6A7C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>
          <a href={`${basePath}/profile`} className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path
                  d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                  stroke="#5F33E1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22"
                  stroke="#5F33E1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
