'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { Language, LanguageContextType } from '@/types'

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const langParam = searchParams.get('lang') as Language
    if (langParam && (langParam === 'en' || langParam === 'bn')) {
      setLanguageState(langParam)
    }
  }, [searchParams])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.set('lang', lang)
    const search = current.toString()
    const query = search ? `?${search}` : ''
    router.push(`/${query}`)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 