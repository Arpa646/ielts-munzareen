import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Section, FeatureExplanation } from '@/types'

interface CourseExclusiveFeatureProps {
  section: Section
}

export function CourseExclusiveFeature({ section }: CourseExclusiveFeatureProps) {
  const { language } = useLanguage()

  const features = (section.values as FeatureExplanation[]) || []

  return (
    <section className=" ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-start mb-12">
          <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">
            {section.name || (language === 'bn' ? 'কোর্স এক্সক্লুসিভ ফিচার' : 'Course Exclusive Features')}
          </h2>
          {section.description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {section.description}
            </p>
          )}
        </div>

        <div className="space-y-6 border border-gray-200 p-5">
          {features.map((feature, index) => (
            <div 
              key={feature.id || index} 
              className="  p-8  border-b border-gray-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Content */}
                <div>
                  {/* Feature Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {feature.title}
                  </h3>

                  {/* Feature Checklist */}
                  <div className="space-y-4">
                    {feature.checklist.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Image */}
                <div className="lg:ml-8">
                  <div className="relative rounded-xl overflow-hidden bg-gray-100">
                    <img 
                      src={feature.file_url} 
                      alt={feature.title}
                      className="w-full h-64 object-cover"
                    />
                    {feature.video_thumbnail && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 