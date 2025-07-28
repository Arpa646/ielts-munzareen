import React from 'react'
import type { AppProps } from 'next/app'
import { LanguageProvider } from '@/contexts/LanguageContext'
import type { Language } from '@/types'
import '@/styles/globals.css'

interface PagePropsWithLanguage {
  language?: Language
  [key: string]: unknown
}

export default function App({ Component, pageProps }: AppProps) {
  const { language = 'en' } = pageProps as PagePropsWithLanguage

  return (
    <LanguageProvider initialLanguage={language}>
      <Component {...pageProps} />
    </LanguageProvider>
  )
} 