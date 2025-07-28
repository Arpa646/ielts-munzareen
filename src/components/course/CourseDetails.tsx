'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Section } from '@/types'

interface CourseDetailsProps {
  section: Section
}

interface AccordionItem {
  id: string
  title: string
  description: string
  icon: string
}

export function CourseDetails({ section }: CourseDetailsProps) {
  const { language } = useLanguage()
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  // Type guard to ensure we have accordion items
  const isAccordionItem = (item: any): item is AccordionItem => {
    return item && 
           typeof item.id === 'string' && 
           typeof item.title === 'string' && 
           typeof item.description === 'string'
  }

  const accordionItems = Array.isArray(section.values) 
    ? (section.values as unknown as AccordionItem[]).filter(isAccordionItem)
    : []

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  const renderHtmlContent = (html: string) => {
    return { __html: html }
  }

  if (!section || section.type !== 'about' || !accordionItems.length) {
    return null
  }

  return (
    <section className="py-16 bg-white" style={{ backgroundColor: section.bg_color || '#ffffff' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-start mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {section.name}
          </h2>
          {section.description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {section.description}
            </p>
          )}
        </div>

        <div className='border border-gray-200 p-4 rounded-lg'>
          {accordionItems.map((item, index) => {
            const isOpen = openItems.has(item.id)
            
            return (
              <div
                key={item.id}
                className={`${index === 0 ? 'border-b border-dashed border-gray-300' : ''}`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-5 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between group"
                  aria-expanded={isOpen}
                  aria-controls={`accordion-content-${item.id}`}
                >
                  <div className="flex items-center space-x-4">
                   
                    <div className="flex-1">
                      <h3 
                        className="text-lg md:text-xl font-semibold text-gray-900  transition-colors duration-200"
                        dangerouslySetInnerHTML={renderHtmlContent(item.title)}
                      />
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <svg
                      className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
                        isOpen ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                
                {isOpen && (
                  <div className="px-6 py-6 bg-white">
                    <div 
                      className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={renderHtmlContent(item.description)}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Course Summary */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'bn' ? 'আজই শুরু করুন আপনার IELTS প্রস্তুতি!' : 'Start Your IELTS Preparation Today!'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {language === 'bn' 
              ? 'সম্পূর্ণ কোর্স সম্পর্কে জানতে এবং ভর্তি হতে নিচের বাটনে ক্লিক করুন'
              : 'Click the button below to learn more about the complete course and enroll'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
              {language === 'bn' ? 'এখনই ভর্তি হন' : 'Enroll Now'}
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200">
              {language === 'bn' ? 'ফ্রি প্রিভিউ দেখুন' : 'Free Preview'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 