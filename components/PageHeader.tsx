'use client'

import { useBasePath } from '../lib/useBasePath'

interface PageHeaderProps {
  title: string
  showBack?: boolean
  backUrl?: string
  rightAction?: React.ReactNode
}

export default function PageHeader({ title, showBack = true, backUrl, rightAction }: PageHeaderProps) {
  const basePath = useBasePath()
  const defaultBackUrl = `${basePath}/home`

  return (
    <div className="flex items-center justify-between px-6 pt-7 pb-4 border-b border-gray-100 bg-white sticky top-0 z-40">
      {showBack ? (
        <a
          href={backUrl || defaultBackUrl}
          className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity"
        >
          <svg
            className="w-6 h-6 text-[#24252C]"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      ) : (
        <div className="w-6 h-6" />
      )}
      <h1 className="text-lg font-semibold text-[#24252C]">{title}</h1>
      {rightAction || <div className="w-6 h-6" />}
    </div>
  )
}
