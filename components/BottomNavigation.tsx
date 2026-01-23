'use client'

import { useState, useEffect } from 'react'
import { useBasePath } from '../lib/useBasePath'

export default function BottomNavigation() {
  const basePath = useBasePath()
  const [currentPath, setCurrentPath] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname.replace(basePath, ''))
    }
  }, [basePath])

  const isActive = (path: string) => {
    return currentPath === path || currentPath.startsWith(path + '/')
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0px_-4px_32px_rgba(0,0,0,0.04)] z-50">
      <div className="flex items-center justify-around px-4 py-3">
        <a
          href={`${basePath}/home`}
          className="flex flex-col items-center transition-opacity hover:opacity-70"
        >
          <div className="w-6 h-6 mb-1">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path
                d="M9.02 2.84L3.63 7.04C2.73 7.74 2 9.23 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.77V10.36C22 9.23 21.27 7.74 20.37 7.05L14.98 2.84C13.54 1.74 11.46 1.74 10.02 2.84Z"
                stroke={isActive('/home') ? '#5F33E1' : '#6E6A7C'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className={`text-[10px] ${isActive('/home') ? 'text-[#5F33E1]' : 'text-[#6E6A7C]'}`}>
            Home
          </span>
        </a>
        <a
          href={`${basePath}/calendar`}
          className="flex flex-col items-center transition-opacity hover:opacity-70"
        >
          <div className="w-6 h-6 mb-1">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path
                d="M8 2V6"
                stroke={isActive('/calendar') ? '#5F33E1' : '#6E6A7C'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 2V6"
                stroke={isActive('/calendar') ? '#5F33E1' : '#6E6A7C'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 10H21"
                stroke={isActive('/calendar') ? '#5F33E1' : '#6E6A7C'}
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
                stroke={isActive('/calendar') ? '#5F33E1' : '#6E6A7C'}
                strokeWidth="2"
              />
            </svg>
          </div>
          <span className={`text-[10px] ${isActive('/calendar') ? 'text-[#5F33E1]' : 'text-[#6E6A7C]'}`}>
            Calendar
          </span>
        </a>
        <a
          href={`${basePath}/new-task`}
          className="flex flex-col items-center transition-transform hover:scale-110"
        >
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
        <a
          href={`${basePath}/tasks`}
          className="flex flex-col items-center transition-opacity hover:opacity-70"
        >
          <div className="w-6 h-6 mb-1">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path
                d="M14.68 2.02L14.68 2.02C14.68 2.02 6.75 12.25 6.75 12.25L14.68 16.25L14.68 16.25"
                stroke={isActive('/tasks') ? '#5F33E1' : '#6E6A7C'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className={`text-[10px] ${isActive('/tasks') ? 'text-[#5F33E1]' : 'text-[#6E6A7C]'}`}>
            Tasks
          </span>
        </a>
        <a
          href={`${basePath}/profile`}
          className="flex flex-col items-center transition-opacity hover:opacity-70"
        >
          <div className="w-6 h-6 mb-1">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path
                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                stroke={isActive('/profile') ? '#5F33E1' : '#6E6A7C'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22"
                stroke={isActive('/profile') ? '#5F33E1' : '#6E6A7C'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className={`text-[10px] ${isActive('/profile') ? 'text-[#5F33E1]' : 'text-[#6E6A7C]'}`}>
            Profile
          </span>
        </a>
      </div>
    </div>
  )
}
