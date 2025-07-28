'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Section, Feature } from '@/types'

interface CourseFeaturesProps {
  section: Section
}

export function CourseFeatures({ section }: CourseFeaturesProps) {
  const { language } = useLanguage()


  // Use actual data from section.values instead of dummy data
  const features = (section.values as Feature[]) || []
  console.log("feature section",features)
  return (
    <section className=" ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-start mb-12">
          <h2 className="text-3xl md:text-3xl font-bold text-gray-700 mb-4">
            {section.name || (language === 'bn' ? 'কোর্সটি কীভাবে সাজানো হয়েছে' : 'How the Course is Laid Out')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {section.description 
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-br from-black via-black to-purple-900 ">
          {features.map((feature, index) => (
            <div key={feature.id || index} className=" rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12rounded-xl flex items-center justify-center">
                    {feature.icon && (
                      <img 
                        src={feature.icon} 
                        alt={feature.title}
                        className="w-8 h-8 object-contain"
                      />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {feature.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
} 