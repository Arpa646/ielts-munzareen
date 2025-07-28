'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Checklist } from '@/types'

interface ChecklistSectionProps {
  checklist: Checklist[]
}

export function ChecklistSection({ checklist }: ChecklistSectionProps) {
  const { language } = useLanguage()

  return (
    <section className="py-16 bg-gradient-to-br from-black via-black to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side content */}
          <div className="order-2 lg:order-1">
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {language === 'bn' ? 'IELTS সাকসেস গাইড' : 'IELTS Success Guide'}
              </h2>
              <p className="text-lg text-gray-200 mb-8">
                {language === 'bn'
                  ? 'আপনার IELTS স্বপ্ন পূরণের জন্য বিশেষজ্ঞদের পরামর্শ ও কৌশল'
                  : 'Expert tips and strategies to fulfill your IELTS dreams'
                }
              </p>
            </div>

            {/* Content highlights */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">
                {language === 'bn' ? 'IELTS Confirm 7+ Score' : 'IELTS Confirm 7+ Score'}
              </h3>
              <p className="text-gray-200 mb-6">
                {language === 'bn' 
                  ? 'বিশেষজ্ঞ কৌশল ও গাইডলাইন সহ সম্পূর্ণ প্রস্তুতি' 
                  : 'Complete preparation with expert strategies and guidelines'
                }
              </p>
              
              {/* Features list */}
             
            </div>

          </div>

          {/* Right side image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img
                src="https://cdn.10minuteschool.com/images/catalog/product/pointer/Thumbnail_for_IELTS_Course_by_MS_1732621023962.jpg"
                alt={language === 'bn' ? 'IELTS কোর্স গাইডলাইন' : 'IELTS Course Guidelines'}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
             
           
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 