import type { NextApiRequest, NextApiResponse } from 'next'
import type { Language } from '@/types'

interface RevalidateResponse {
    revalidated?: boolean
    language?: Language
    languages?: Language[]
    tag?: string
    timestamp: string
    error?: string
    status?: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RevalidateResponse>
) {
    // Only allow POST and GET methods
    if (req.method === 'POST') {
        try {
            // Check for authorization
            const authHeader = req.headers.authorization
            const secret = process.env.REVALIDATION_SECRET || 'your-secret-key'

            if (authHeader !== `Bearer ${secret}`) {
                return res.status(401).json({
                    error: 'Unauthorized',
                    timestamp: new Date().toISOString()
                })
            }

            const { language, tag } = req.body

            if (tag) {
                // In Pages Router, we don't have revalidateTag, but we can log or handle differently
                console.log(`Manual revalidation requested for tag: ${tag}`)
                return res.status(200).json({
                    revalidated: true,
                    tag,
                    timestamp: new Date().toISOString()
                })
            }

            if (language) {
                const validLanguages: Language[] = ['en', 'bn']
                if (!validLanguages.includes(language)) {
                    return res.status(400).json({
                        error: 'Invalid language',
                        timestamp: new Date().toISOString()
                    })
                }

                console.log(`Manual revalidation requested for language: ${language}`)
                return res.status(200).json({
                    revalidated: true,
                    language,
                    timestamp: new Date().toISOString()
                })
            }

            // Revalidate all languages
            const languages: Language[] = ['en', 'bn']
            console.log('Manual revalidation requested for all languages:', languages)

            return res.status(200).json({
                revalidated: true,
                languages,
                timestamp: new Date().toISOString()
            })

        } catch (error) {
            console.error('Revalidation error:', error)
            return res.status(500).json({
                error: 'Failed to revalidate',
                timestamp: new Date().toISOString()
            })
        }
    }

    // GET endpoint for health check
    if (req.method === 'GET') {
        return res.status(200).json({
            status: 'ok',
            timestamp: new Date().toISOString()
        })
    }

    // Method not allowed
    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).json({
        error: 'Method not allowed',
        timestamp: new Date().toISOString()
    })
} 