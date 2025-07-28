'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Section, Pointer } from '@/types'

interface WhatYouLearnProps {
  section: Section
}

export function WhatYouLearn({ section }: WhatYouLearnProps) {
  const { language } = useLanguage()

  // Type guard to check if values are Pointer[]
  const isPointerArray = (values: any[]): values is Pointer[] => {
    return values.length > 0 && 'text' in values[0] && 'id' in values[0];
  }

  const pointerValues = section.values && isPointerArray(section.values) ? section.values : []

  return (
    <section className=" bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {section.name || (language === 'bn' ? 'কোর্স করে আপনি যা শিখবেন' : 'What you will learn by doing the course')}
          </h2>
        </div>

        <div className="border border-gray-200 rounded-lg bg-white p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pointerValues.map((point, index) => {
              const isLastRow = index >= pointerValues.length - 2; // Last row items (considering 2 columns)
              return (
                <div key={point.id} className={`flex items-start pb-6 ${!isLastRow ? 'border-b border-dashed border-gray-300' : ''}`}>
                  <div className="flex-shrink-0 mr-4 mt-1">
                    <svg 
                      className="w-5 h-5 text-blue-500" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 leading-relaxed">
                    {point.text}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
} 