'use client'

import { useState, useEffect } from 'react'

export function useBasePath(): string {
  const [basePath, setBasePath] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname
      if (path.startsWith('/My-tascs')) {
        setBasePath('/My-tascs')
      } else {
        setBasePath('')
      }
    }
  }, [])

  return basePath
}
