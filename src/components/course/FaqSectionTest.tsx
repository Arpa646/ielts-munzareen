'use client'

import React, { useState } from 'react'
import type { Section, FaqItem } from '@/types'

interface FaqSectionProps {
  section: Section;
}

export function FaqSectionTest({ section }: FaqSectionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const faqItems = section.values as FaqItem[]

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  if (!faqItems || faqItems.length === 0) {
    return null
  }

  return (
    <section className="py-8  rounded-lg">
      <div className="mb-8 px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {section.name}
        </h2>
        {section.description && (
          <p className="text-lg text-gray-600">
            {section.description}
          </p>
        )}
      </div>

      <div className='border border-gray-200 p-4'>
        {faqItems.map((item, index) => (
          <div
            key={item.id}
            className={` ${index < faqItems.length - 1 ? 'border-b border-dashed border-gray-300' : ''}`}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              aria-expanded={openItems.has(item.id)}
            >
              <h3 className="text-lg font-semibold text-gray-900 pr-4">
                {item.question}
              </h3>
              <div className="flex-shrink-0">
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                    openItems.has(item.id) ? 'rotate-180' : ''
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
            
            {openItems.has(item.id) && (
              <div className="px-6 pb-4">
                <div
                  className="text-gray-700 prose prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
} 