import React, { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Language } from '@/types'

export function Header() {
  const { language, setLanguage } = useLanguage()
  const [switchingLanguage, setSwitchingLanguage] = useState<Language | null>(null)

  const handleLanguageChange = (newLang: Language) => {
    if (newLang !== language) {
      console.log('🔄 User initiated language change:', { from: language, to: newLang })
      setSwitchingLanguage(newLang)
      setLanguage(newLang)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-2">
                10
              </div>
              <span className="text-xl font-bold text-gray-900">
                {language === 'bn' ? 'মিনিট স্কুল' : 'MINUTE SCHOOL'}
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              {language === 'bn' ? 'ক্লাস ৬-১২' : 'Class 6-12'}
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              {language === 'bn' ? 'স্কিল' : 'Skills'}
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              {language === 'bn' ? 'ভর্তি' : 'Admission'}
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              {language === 'bn' ? 'অনলাইন ব্যাচ' : 'Online Batch'}
            </Link>
          </nav>

          {/* Language Switcher & CTA */}
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1 relative">
              {switchingLanguage && (
                <div className="absolute inset-0 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <button
                onClick={() => handleLanguageChange('en')}
                disabled={switchingLanguage !== null}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                } ${switchingLanguage ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange('bn')}
                disabled={switchingLanguage !== null}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  language === 'bn'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                } ${switchingLanguage ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                বাং
              </button>
            </div>
            
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium">
              {language === 'bn' ? 'লগ-ইন' : 'Log in'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 