import React, { createContext, useContext, useState, useEffect } from 'react'
import idTranslations from './locales/id.json'
import enTranslations from './locales/en.json'

export type Language = 'id' | 'en'
export type TranslationType = typeof idTranslations

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationType
}

const translations: Record<Language, TranslationType> = {
  id: idTranslations,
  en: enTranslations,
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('justdhif_lang') as Language
      if (savedLang === 'id' || savedLang === 'en') {
        return savedLang
      }
      // Check browser preference
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('en')) {
        return 'en'
      }
    }
    return 'id'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('justdhif_lang', lang)
    }
  }

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
