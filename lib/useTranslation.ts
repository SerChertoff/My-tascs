'use client'

import { useState, useEffect } from 'react'
import { getLanguage, getTranslations, Language, Translations } from './i18n'

export function useTranslation() {
  // Начальное значение всегда 'en' для избежания проблем с гидратацией
  const [language, setLanguageState] = useState<Language>('en')
  const [translations, setTranslations] = useState<Translations>(getTranslations('en'))
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Устанавливаем флаг, что мы на клиенте
    setIsClient(true)
    // Загружаем язык из localStorage только на клиенте
    const currentLanguage = getLanguage()
    setLanguageState(currentLanguage)
    setTranslations(getTranslations(currentLanguage))
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    setTranslations(getTranslations(lang))
    if (typeof window !== 'undefined') {
      localStorage.setItem('task-sync-language', lang)
    }
  }

  return {
    t: translations,
    language,
    setLanguage,
    isClient,
  }
}
