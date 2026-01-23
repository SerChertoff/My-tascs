'use client'

import { useEffect, useState } from 'react'
import { useBasePath } from '../lib/useBasePath'
import { getCurrentUser } from '../lib/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const basePath = useBasePath()

  useEffect(() => {
    const user = getCurrentUser()
    setIsAuthenticated(user !== null)
    
    if (!user) {
      window.location.href = `${basePath}/login`
    }
  }, [basePath])

  if (isAuthenticated === null) {
    // Показываем загрузку во время проверки
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#5F33E1] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-[#6E6A7C]">Загрузка...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
