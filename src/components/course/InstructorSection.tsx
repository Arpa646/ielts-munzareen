import React from 'react'
import type { Section, Instructor } from '@/types'

interface InstructorSectionProps {
  section: Section
}

export function InstructorSection({ section }: InstructorSectionProps) {
  // console.log("instructor section", section)

  // Get the first instructor from the values array with proper typing
  const instructor = (section.values as Instructor[])?.[0]
  
  if (!instructor) {
    return null // Don't render if no instructor data
  }

  return (
    <section className=" ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {section.name}
          </h2>
          
          <div className="bg-gray-50 rounded-lg p-6  border border-gray-400">
            <div className="flex items-center gap-4">
              {/* Instructor Photo */}
              <div className="flex-shrink-0">
                <img 
                  src={instructor.image || "/instructor-placeholder.jpg"} 
                  alt={instructor.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>

              {/* Instructor Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-black">
                    {instructor.name}
                  </h3>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                
                <div 
                  className="text-sm text-black prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: instructor.description || ''
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 