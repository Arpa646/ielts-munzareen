import React from 'react'
import type { CourseData, Language } from '@/types'
import { Header } from './common/Header'
import { HeroSection } from './course/HeroSection'
import { InstructorSection } from './course/InstructorSection'
import { CourseFeatures } from './course/CourseFeatures'
import { CourseDetails } from './course/CourseDetails'
import { WhatYouLearn } from './course/WhatYouLearn'
import { ChecklistSection } from './course/ChecklistSection'
import { CourseEnrollmentCard } from './course/CourseEnrollmentCard'
import { CourseExclusiveFeature } from './course/CourseExclusiveFeature'
import { FaqSectionTest } from './course/FaqSectionTest'
import { StudentsOpinion } from './course/StudentsOpinion'
import { Footer } from './common/Footer'

interface CoursePageContentProps {
  courseData: CourseData
  initialLanguage: Language
}

export function CoursePageContent({ courseData, initialLanguage }: CoursePageContentProps) {
  // Debug received props - only log, don't render dynamic content
  console.log('📦 COURSE CONTENT DEBUG:', {
    initialLanguage,
    courseTitle: courseData.title,
    courseSectionsCount: courseData.sections?.length || 0,
    hasDescription: !!courseData.description
  })

  const instructorSection = courseData.sections.find(section => section.type === 'instructors')
  const featuresSection = courseData.sections.find(section => section.type === 'features')
  const pointersSection = courseData.sections.find(section => section.type === 'pointers')
  const aboutSection = courseData.sections.find(section => section.type === 'about')
  const featureExplanationsSection = courseData.sections.find(section => section.type === 'feature_explanations')
  const faqSection = courseData.sections.find(section => section.type === 'faq')
  const testimonialsSection = courseData.sections.find(section => section.type === 'testimonials')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section - Hidden on md screens and below */}
      <div className="hidden lg:block">
        <HeroSection 
          title={courseData.title}
          description={courseData.description}
          media={courseData.media}
          ctaText={courseData.cta_text}
        />
      </div>

      {/* Enrollment Card for md screens - Full width, not absolute */}
      <div className="block lg:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="w-full">
            <CourseEnrollmentCard courseData={courseData} isFullWidth={true} />
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content - Main Course Information */}
          <div className="lg:col-span-2 space-y-16">
            {instructorSection && (
              <InstructorSection section={instructorSection} />
            )}

            {featuresSection && (
              <CourseFeatures section={featuresSection} />
            )}

            {pointersSection && (
              <WhatYouLearn section={pointersSection} />
            )}

            {featureExplanationsSection && (
              <CourseExclusiveFeature section={featureExplanationsSection} />
            )}
              {faqSection && (
              <FaqSectionTest section={faqSection} />
            )}

            {/* {aboutSection && (
              <CourseDetails section={aboutSection} />
            )} */}

            {/* Checklist Section with Image */}
            <ChecklistSection checklist={courseData.checklist} />
          </div>

          {/* Right Sidebar - Enrollment Card (hidden on md and below) */}
          <div className="lg:col-span-1 hidden lg:block">
            <CourseEnrollmentCard courseData={courseData} isFullWidth={false} />
          </div>
        </div>
      </div>

      {/* Testimonials Section - Full Width */}
      {testimonialsSection && (
        <StudentsOpinion 
          section={{
            name: testimonialsSection.name,
            values: testimonialsSection.values as import('@/types').Testimonial[]
          }} 
        />
      )}

      <Footer />
    </div>
  )
} 