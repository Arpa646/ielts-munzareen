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
        const response = await apiClient.get('/products/ielts-course', {
            params: { lang: language }
        })

        // Console log all the raw response data
        console.log('=== RAW API RESPONSE ===')
        console.log('Full response:', response)
        console.log('Response data:', response.data)
        console.log('Response status:', response.status)
        console.log('Response headers:', response.headers)

        const processedData = response.data.data || response.data

        // Console log the processed data
        console.log('=== PROCESSED DATA ===')
        console.log('Processed course data:', processedData)
        console.log('Data type:', typeof processedData)
        console.log('Data keys:', Object.keys(processedData))

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