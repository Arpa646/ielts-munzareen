import React from 'react'
import { GetServerSideProps } from 'next'
import { CoursePageContent } from '@/components/CoursePageContent'
import { SEOHead } from '@/components/common/SEOHead'
import { fetchCourseData } from '@/services/api'
import { ieltsCourseSeoData } from '@/data/seoData'
import type { Language, CourseData } from '@/types'

interface PageProps {
  course: CourseData
  language: Language
}

export default function HomePage({ course, language }: PageProps) {
  return (
    <>
      <SEOHead 
        seoData={ieltsCourseSeoData} 
        canonicalUrl="https://10minuteschool.com/product/ielts-course"
      />
      <main className="min-h-screen">
        <CoursePageContent courseData={course} initialLanguage={language} />
      </main>
    </>
  )
}

// SSR with getServerSideProps (Pages Router)
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const lang = (context.query.lang as string) || 'en'
    
    // Debug SSR language (no timestamps)
    console.log('🏗️ SSR LANGUAGE DEBUG:', {
      queryParams: context.query,
      extractedLang: lang,
      rawLangParam: context.query.lang,
      url: context.req.url
    })
    
    const course = await fetchCourseData(lang as Language)

    console.log('✅ SSR SUCCESS:', {
      language: lang,
      courseTitle: course.title,
      sectionsCount: course.sections?.length || 0
    })

    return {
      props: {
        course,
        language: lang,
      },
    }
  } catch (error) {
    console.error('❌ SSR Fetch Error:', error)

    return {
      notFound: true, // Shows 404 page
    }
  }
} 