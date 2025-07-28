import { Suspense } from 'react'
import { CoursePageContent } from '@/components/CoursePageContent'
import { fetchCourseData } from '@/services/api'
import type { Language } from '@/types'
import type { Metadata } from 'next'

interface PageProps {
  searchParams: { lang?: Language }
}

// Generate metadata dynamically based on language
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const language: Language = searchParams.lang || 'en'
  
  try {
    const courseData = await fetchCourseData(language)
    
    return {
      title: courseData.seo?.title || courseData.title || 'IELTS Course by Munzereen Shahid - 10 Minute School',
      description: courseData.seo?.description || courseData.description || 'Get complete preparation of Academic IELTS and General Training IELTS in one course!',
      keywords: courseData.seo?.keywords || 'IELTS, English, Course, Preparation, Academic, General Training',
      openGraph: {
        title: courseData.seo?.og_title || courseData.title || 'IELTS Course by Munzereen Shahid',
        description: courseData.seo?.og_description || courseData.description || 'Complete IELTS preparation course',
        images: courseData.seo?.og_image ? [courseData.seo.og_image] : [],
      },
    }
  } catch (error) {
    console.error('Failed to generate metadata:', error)
    return {
      title: 'IELTS Course by Munzereen Shahid - 10 Minute School',
      description: 'Get complete preparation of Academic IELTS and General Training IELTS in one course!',
    }
  }
}

// Force static generation for specific language combinations
export async function generateStaticParams() {
  // Pre-generate static pages for common languages
  return [
    { lang: 'en' },
    { lang: 'bn' }
  ]
}

export default async function Page({ searchParams }: PageProps) {
  const language: Language = searchParams.lang || 'en'
  
  let courseData = null
  let error = null

  try {
    courseData = await fetchCourseData(language)
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch course data'
    console.error('Failed to fetch course data:', err)
  }

  if (error || !courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Course</h1>
          <p className="text-gray-600 mb-4">{error || 'Course data not available'}</p>
          <a 
            href="/" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
          >
            Retry
          </a>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }>
        <CoursePageContent courseData={courseData} initialLanguage={language} />
      </Suspense>
    </main>
  )
}

// ISR Configuration
// Revalidate every 30 minutes (1800 seconds) for fresher content
export const revalidate = 1800

// Enable static generation for better performance
export const dynamic = 'force-static'

// Cache control for CDN
export const fetchCache = 'force-cache' 