import axios from 'axios'
import type { CourseData, Language } from '@/types'

const API_BASE_URL = 'https://api.10minuteschool.com/discovery-service/api/v1'

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'X-TENMS-SOURCE-PLATFORM': 'web',
        'accept': 'application/json',
    },
})

export async function fetchCourseData(language: Language = 'en'): Promise<CourseData> {
    try {
        // Debug language parameter (no timestamps)
        console.log('🌐 LANGUAGE DEBUG:', {
            receivedLanguage: language,
            languageType: typeof language,
            defaultUsed: language === 'en' ? 'YES (default)' : 'NO (custom)',
            validLanguages: ['en', 'bn']
        })

        // Ensure language is valid
        const validLanguage = (['en', 'bn'] as Language[]).includes(language) ? language : 'en'

        if (validLanguage !== language) {
            console.warn(`⚠️ Invalid language "${language}" provided, falling back to "en"`)
        }

        const response = await apiClient.get('/products/ielts-course', {
            params: {
                lang: validLanguage,
                // Add additional parameters that might be needed
                platform: 'web'
            }
        })

        // Debug request details (simplified)
        console.log('🚀 API REQUEST DEBUG:')
        console.log('- Language requested:', validLanguage)
        console.log('- Response status:', response.status)

        const processedData = response.data.data || response.data

        // Validate that we received course data
        if (!processedData || typeof processedData !== 'object') {
            throw new Error('Invalid course data received from API')
        }

        // Console log the processed data (simplified)
        console.log('=== PROCESSED DATA ===')
        console.log('- Language requested:', validLanguage)
        console.log('- Course title:', processedData.title)
        console.log('- Sections count:', processedData.sections?.length || 0)
        console.log('- Has Bengali content:', /[\u0980-\u09FF]/.test(JSON.stringify(processedData)))

        return processedData
    } catch (error) {
        console.error('API Error:', error)

        if (axios.isAxiosError(error)) {
            if (error.code === 'ECONNABORTED') {
                throw new Error('Request timeout - please try again')
            }
            if (error.response?.status === 404) {
                throw new Error('Course not found')
            }
            if (error.response && error.response.status >= 500) {
                throw new Error('Server error - please try again later')
            }
        }

        throw new Error('Failed to fetch course data')
    }
} 