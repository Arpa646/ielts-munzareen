'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Medium, CtaText } from '@/types'

interface HeroSectionProps {
  title: string
  description: string
  media: Medium[]
  ctaText: CtaText
}

export function HeroSection({ title, description, media, ctaText }: HeroSectionProps) {
  const { language } = useLanguage()

  return (
    <section className="bg-gradient-to-br from-black via-black to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 items-center">
          {/* Content */}
          <div className="space-y-6   ">
            <div className="flex items-center space-x-2 text-yellow-400">
              <span className="text-2xl">⭐</span>
              <span className="font-medium">
                {language === 'bn' ? '৮১.৮% শিক্ষার্থী কোর্স শেষে ৫ ব্যান্ড পেয়েছেন' : '81.8% students got 5+ bands after course'}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold leading-tight">
              {title}
            </h1>

            <div 
              className="text-lg md:text-xl text-gray-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: description }}
            />

          </div>

          {/* Media/Images */}
        
        </div>
      </div>
    </section>
  )
} 