import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import type { Language } from '@/types'

export async function POST(request: NextRequest) {
    try {

        const authHeader = request.headers.get('authorization')
        const secret = process.env.REVALIDATION_SECRET || 'your-secret-key'

        if (authHeader !== `Bearer ${secret}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { language, tag } = await request.json()

        if (tag) {

            revalidateTag(tag)
            return NextResponse.json({
                revalidated: true,
                tag,
                timestamp: new Date().toISOString()
            })
        }

        if (language) {

            const validLanguages: Language[] = ['en', 'bn']
            if (!validLanguages.includes(language)) {
                return NextResponse.json({ error: 'Invalid language' }, { status: 400 })
            }

            revalidateTag(`course-${language}`)
            return NextResponse.json({
                revalidated: true,
                language,
                timestamp: new Date().toISOString()
            })
        }


        const languages: Language[] = ['en', 'bn']
        languages.forEach(lang => {
            revalidateTag(`course-${lang}`)
        })

        return NextResponse.json({
            revalidated: true,
            languages,
            timestamp: new Date().toISOString()
        })

    } catch (error) {
        console.error('Revalidation error:', error)
        return NextResponse.json(
            { error: 'Failed to revalidate' },
            { status: 500 }
        )
    }
}


export async function GET() {
    return NextResponse.json({
        status: 'ok',
        endpoint: 'revalidation',
        timestamp: new Date().toISOString()
    })
} 