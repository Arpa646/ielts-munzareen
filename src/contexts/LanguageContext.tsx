import React, { createContext, useContext, useState } from 'react'
import type { Language } from '@/types'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: React.ReactNode
  initialLanguage?: Language
}

export function LanguageProvider({ children, initialLanguage = 'en' }: LanguageProviderProps) {
  const [language, ] = useState<Language>(initialLanguage)

  // Debug language initialization (disabled for production)
  // console.log('🎯 LANGUAGE CONTEXT DEBUG:', {
  //   initialLanguage,
  //   currentLanguage: language
  // })

  const setLanguage = (lang: Language) => {
    console.log('🔄 LANGUAGE CHANGE:', {
      from: language,
      to: lang
    })
    
    // For SSR with Pages Router, we need to reload the page with new language
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.set('lang', lang)
      
      console.log('🌐 FULL PAGE RELOAD WITH NEW LANGUAGE:', url.toString())
      
      // Full page reload to trigger getServerSideProps with new language
      window.location.href = url.toString()
    }
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