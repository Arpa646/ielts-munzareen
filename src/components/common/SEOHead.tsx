import React from 'react'
import Head from 'next/head'
import { ComprehensiveSeo } from '@/types'

interface SEOHeadProps {
  seoData: ComprehensiveSeo
  canonicalUrl?: string
}

export function SEOHead({ seoData, canonicalUrl }: SEOHeadProps) {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords.join(', ')} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph and Social Media Meta Tags */}
      {seoData.defaultMeta.map((meta, index) => {
        if (meta.type === 'property') {
          return (
            <meta
              key={`${meta.value}-${index}`}
              property={meta.value}
              content={meta.content}
            />
          )
        } else {
          return (
            <meta
              key={`${meta.value}-${index}`}
              name={meta.value}
              content={meta.content}
            />
          )
        }
      })}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      
      {/* Find Twitter image from defaultMeta */}
      {seoData.defaultMeta
        .filter(meta => meta.value === 'og:image')
        .map((meta, index) => (
          <meta
            key={`twitter-image-${index}`}
            name="twitter:image"
            content={meta.content}
          />
        ))
      }
      
      {/* Structured Data (JSON-LD) */}
      {seoData.schema
        .filter(schema => schema.meta_value && schema.meta_value.trim() !== '')
        .map((schema, index) => (
          <script
            key={`schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: schema.meta_value
            }}
          />
        ))
      }
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    </Head>
  )
} 