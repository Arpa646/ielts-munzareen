import { GetServerSideProps } from 'next'
import { CoursePageContent } from '@/components/CoursePageContent'
import { fetchCourseData } from '@/services/api'
import type { Language, CourseData } from '@/types'

interface PageProps {
  course: CourseData
  language: Language
}

export default function HomePage({ course, language }: PageProps) {
  return (
    <main className="min-h-screen">
      <CoursePageContent courseData={course} initialLanguage={language} />
    </main>
  )
}

// SSR with getServerSideProps (Pages Router)
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const lang = (context.query.lang as string) || 'en'
    const course = await fetchCourseData(lang as Language)

    return {
      props: {
        course,
        language: lang,
      },
    }
  } catch (error) {
    console.error('SSR Fetch Error:', error)

    return {
      notFound: true, // Shows 404 page
    }
  }
} 