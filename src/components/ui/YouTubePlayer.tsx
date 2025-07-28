import React from 'react'

interface YouTubePlayerProps {
  url?: string
  videoId?: string
  className?: string
  width?: string | number
  height?: string | number
  autoplay?: boolean
}

export function YouTubePlayer({ 
  url, 
  videoId,
  className = '', 
  width = '100%', 
  height = '315',
  autoplay = false 
}: YouTubePlayerProps) {
  // Extract video ID from URL or use provided videoId
  let extractedVideoId = videoId
  
  if (url && !videoId) {
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/)
    extractedVideoId = match ? match[1] : ''
  }

  if (!extractedVideoId) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`} style={{ width, height }}>
        <span className="text-gray-500">Invalid video</span>
      </div>
    )
  }

  const embedUrl = `https://www.youtube.com/embed/${extractedVideoId}${autoplay ? '?autoplay=1' : ''}`

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <iframe
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
} 