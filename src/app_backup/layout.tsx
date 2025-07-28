

import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

const baseUrl = 'https://ielts-hicy954mb-arpa646s-projects.vercel.app/'
const title = 'munzareen class'
const description = 'Take Best IELTS preparation with us, This Course is one of the Best IELTS Course in Bangladesh, which includes mock tests, and a premium study book.'

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: 'munzareen class',
    description: 'Take Best IELTS preparation to next level with IELTS preparation Course. This Course is one of the Best IELTS Course in Bangladesh.',
    siteName: '10 Minute School',
    url: `${baseUrl}/product/ielts-course`,
    images: [
      {
        url: 'https://cdn.10minuteschool.com/images/thumbnails/IELTS_new_16_9.png',
        width: 1200,
        height: 630,
        alt: 'Best IELTS Preparation Course in Bangladesh',
        type: 'image/png',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@10minuteschool',
    creator: '@10minuteschool',
    title,
    description,
    images: {
      url: 'https://cdn.10minuteschool.com/images/thumbnails/IELTS_new_16_9.png',
      alt: 'Best IELTS Preparation Course in Bangladesh',
    },
  },
  other: {
    // Course specific meta tags
    'course:title': title,
    'course:description': description,
    'course:image': 'https://cdn.10minuteschool.com/images/thumbnails/IELTS_new_16_9.png',
    'course:instructor': 'Munzereen Shahid',
    'course:price': '5000',
    'course:currency': 'BDT',
    // Additional social media meta tags
    'og:image:type': 'image/png',
    'og:image:width': '1200',
    'og:image:height': '630',
  },
  keywords: [
    'IELTS Course',
    'IELTS Course in BD',
    'IELTS Preparation',
    'IELTS Bangladesh',
    'Munzereen Shahid',
    '10 Minute School'
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
} 