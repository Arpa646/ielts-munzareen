import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Section, FaqItem } from '@/types'

interface CourseDetailsProps {
  section: Section
}

// For 'about' sections, we're working with FAQ items
type AccordionItem = FaqItem & {
  title: string // question mapped to title
  description: string // answer mapped to description
  icon: string // icon for display
}

export function CourseDetails({ section }: CourseDetailsProps) {
  const { language } = useLanguage()
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [isMounted, setIsMounted] = useState(false)

  // Mount detection to prevent hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Type guard for FAQ items (which are used in 'about' sections)
  const isFaqItem = (item: unknown): item is FaqItem => {
    return !!(item && 
           typeof item === 'object' &&
           'id' in item && typeof (item as Record<string, unknown>).id === 'string' && 
           'question' in item && typeof (item as Record<string, unknown>).question === 'string' && 
           'answer' in item && typeof (item as Record<string, unknown>).answer === 'string')
  }

  // Convert FAQ items to accordion items format
  const mapFaqToAccordion = (faqItem: FaqItem): AccordionItem => ({
    ...faqItem,
    title: faqItem.question,
    description: faqItem.answer,
    icon: '' // FAQ items don't have icons in the current schema
  })

  // Ensure consistent data structure and cast to proper type
  const safeSection = section || {}
  const safeValues = Array.isArray(safeSection.values) ? safeSection.values : []
  const faqItems = safeValues.filter(isFaqItem)
  const accordionItems: AccordionItem[] = faqItems.map(mapFaqToAccordion)

  const toggleItem = (id: string) => {
    if (!isMounted) return // Only allow interaction after mounting
    
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  const renderHtmlContent = (html: string) => {
    // Ensure we have a string and handle empty/undefined values consistently
    // Add extra validation to prevent hydration mismatches
    if (!html || typeof html !== 'string') {
      return { __html: '' }
    }
    const cleanHtml = html.trim()
    return { __html: cleanHtml }
  }

  if (!section || section.type !== 'about' || !accordionItems.length) {
    return null
  }

  return (
    <section className="py-16 bg-white" style={{ backgroundColor: section.bg_color || '#ffffff' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-start mb-12">
          <h2 className="text-3xl md:text-3xl font-bold mb-4">
            {section.name || ''}
          </h2>
          {section.description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {section.description}
            </p>
          )}
        </div>

        <div className='border border-gray-200 p-4 rounded-lg'>
          {accordionItems.map((item, index) => {
            const isOpen = isMounted && openItems.has(item.id)
            
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
                  disabled={!isMounted}
                >
                  <div className="flex items-center space-x-4">
                   
                    <div className="flex-1">
                      {isMounted ? (
                        <h3 
                          className="text-lg md:text-xl font-semibold text-gray-900 transition-colors duration-200"
                          dangerouslySetInnerHTML={renderHtmlContent(item.title)}
                        />
                      ) : (
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 transition-colors duration-200">
                          {item.title}
                        </h3>
                      )}
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