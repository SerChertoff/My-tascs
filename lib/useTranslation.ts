'use client'

import { useState, useEffect } from 'react'
import { getLanguage, getTranslations, Language, Translations } from './i18n'

export function useTranslation() {
  const [language, setLanguageState] = useState<Language>(getLanguage())
  const [translations, setTranslations] = useState<Translations>(getTranslations(language))

  useEffect(() => {
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
  }
}
