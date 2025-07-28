import React, { useState, useEffect } from 'react'

import { VideoModal } from '@/components/ui/VideoModal'
import { useLanguage } from '@/contexts/LanguageContext'
import type { CourseData } from '@/types'

interface CourseEnrollmentCardProps {
  courseData: CourseData
  isFullWidth?: boolean
}

export function CourseEnrollmentCard({ courseData, isFullWidth = false }: CourseEnrollmentCardProps) {
  const { language } = useLanguage()
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showStickyButton, setShowStickyButton] = useState(false)
  const [showFixedCard, setShowFixedCard] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Filter videos from media array
  const videos = courseData.media.filter(item => item.resource_type === 'video')
  
  // Get the first video for the main trailer (initially)
  const defaultMainVideo = videos.find(video => video.name === 'preview_gallery') || videos[0]
  
  // State for the current main video
  const [mainVideo, setMainVideo] = useState(defaultMainVideo)

  // Carousel settings
  const videosPerSlide = 4
  const maxSlides = Math.ceil(videos.length / videosPerSlide)

  // Mount detection to prevent hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Scroll detection for sticky button and fixed card - only after mounting
  useEffect(() => {
    if (!isMounted) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      
      if (window.innerWidth < 1024) { // lg breakpoint
        // Show sticky button after scrolling 1.5 viewport heights on small screens
        setShowStickyButton(scrollY > viewportHeight * 1.5)
        setShowFixedCard(false)
      } else {
        // Show fixed card after scrolling on larger screens
        setShowFixedCard(scrollY > viewportHeight * 1.5)
        setShowStickyButton(false)
      }
    }

    const checkScreenSize = () => {
      handleScroll() // Check initial position
      window.addEventListener('scroll', handleScroll)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [isMounted])

  const openVideoModal = (videoId: string) => {
    setSelectedVideoId(videoId)
    setIsModalOpen(true)
  }

  const closeVideoModal = () => {
    setIsModalOpen(false)
    setSelectedVideoId(null)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides)
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex)
  }

  // Handle carousel video click to change main video
  const handleCarouselVideoClick = (video: typeof videos[0]) => {
    setMainVideo(video)
  }

  // Sample pricing data (you can modify this based on your needs)
  const pricing = {
    current: language === 'bn' ? '৳৩৮৫০' : '৳3850',
    original: language === 'bn' ? '৳৫০০০' : '৳5000',
    discount: language === 'bn' ? '১১৫০ টাকা' : '1150 Taka',
    discountPercent: '23%'
  }

 

  // Conditional wrapper classes based on isFullWidth
  const wrapperClasses = isFullWidth 
    ? "w-full" 
    : "absolute top-[200px] right-4 md:right-12 lg:right-0 xl:right-0  2xl:right-[100px]  w-72 md:w-80 lg:w-96 xl:w-[500px] z-20"

  const cardClasses = isFullWidth
    ? "bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 max-w-4xl mx-auto"
    : "bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"

  // Video height classes based on layout
  const videoHeightClasses = isFullWidth ? "h-64 md:h-80" : "h-40 md:h-44 lg:h-48"

  return (
    <>
      <div className={wrapperClasses}>
        <div className={cardClasses}>
          {/* Main Video Trailer */}
          {mainVideo && (
            <div className="relative">
              <div 
                className="relative cursor-pointer group"
                onClick={() => openVideoModal(mainVideo.resource_value)}
              >
                <img
                  src={mainVideo.thumbnail_url}
                  alt="Course trailer"
                  className={`w-full ${videoHeightClasses} object-cover`}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                  <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {language === 'bn' ? 'কোর্স ট্রেইলার' : 'Course Trailer'}
                </div>
              </div>

              {/* Carousel Navigation Arrows on Video */}
              {videos.length > 1 && maxSlides > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200 z-10"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200 z-10"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          )}

          {/* Video Carousel */}
          {videos.length > 1 && (
            <div className="p-3 md:p-4 border-b">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-700">
                  {language === 'bn' ? 'প্রিভিউ ভিডিও' : 'Preview Videos'}
                </h4>
                {maxSlides > 1 && (
                  <div className="flex gap-1">
                    {Array.from({ length: maxSlides }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <div className="relative">
                {/* Carousel Container */}
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {Array.from({ length: maxSlides }).map((_, slideIndex) => (
                      <div key={slideIndex} className="w-full flex-shrink-0">
                        <div className="grid grid-cols-4 gap-2">
                          {videos
                            .slice(slideIndex * videosPerSlide, (slideIndex + 1) * videosPerSlide)
                            .map((video, videoIndex) => {
                              const isSelected = mainVideo?.resource_value === video.resource_value
                              return (
                                <div
                                  key={slideIndex * videosPerSlide + videoIndex}
                                  className="cursor-pointer group"
                                  onClick={() => handleCarouselVideoClick(video)}
                                >
                                  <div className={`relative aspect-video rounded overflow-hidden transition-all duration-200 ${
                                    isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : ''
                                  }`}>
                                    <img
                                      src={video.thumbnail_url}
                                      alt={`Preview ${slideIndex * videosPerSlide + videoIndex + 1}`}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                    />
                                    <div className={`absolute inset-0 transition-all duration-200 flex items-center justify-center ${
                                      isSelected 
                                        ? 'bg-blue-500 bg-opacity-20' 
                                        : 'bg-black bg-opacity-30 group-hover:bg-opacity-50'
                                    }`}>
                                      <svg className={`w-3 h-3 transition-colors ${
                                        isSelected ? 'text-blue-200' : 'text-white'
                                      }`} fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                      </svg>
                                    </div>
                                    {isSelected && (
                                      <div className="absolute top-1 right-1 bg-blue-500 rounded-full p-1">
                                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>


              </div>
            </div>
          )}

          {/* Hero Section Content - Only for full width layout */}
          {isFullWidth && (
            <div className="p-6 border-b bg-gradient-to-br from-blue-50 to-purple-50">
              {/* Success Rate Badge */}
              <div className="flex items-center justify-center space-x-2 text-blue-600 mb-4">
                <span className="text-2xl">⭐</span>
                <span className="font-medium text-sm md:text-base">
                  {language === 'bn' ? '৮১.৮% শিক্ষার্থী কোর্স শেষে ৫ ব্যান্ড পেয়েছেন' : '81.8% students got 5+ bands after course'}
                </span>
              </div>

              {/* Course Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4 leading-tight">
                {courseData.title}
              </h1>

              {/* Course Description */}
              <div 
                className="text-gray-600 text-center leading-relaxed mb-6 text-sm md:text-base"
                dangerouslySetInnerHTML={{ __html: courseData.description }}
              />

              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-blue-600">33K+</div>
                  <div className="text-xs md:text-sm text-gray-600">
                    {language === 'bn' ? 'শিক্ষার্থী' : 'Students'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-blue-600">50+</div>
                  <div className="text-xs md:text-sm text-gray-600">
                    {language === 'bn' ? 'ঘন্টা' : 'Hours'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-blue-600">54</div>
                  <div className="text-xs md:text-sm text-gray-600">
                    {language === 'bn' ? 'ভিডিও' : 'Videos'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-blue-600">⭐ 4.9</div>
                  <div className="text-xs md:text-sm text-gray-600">
                    {language === 'bn' ? 'রেটিং' : 'Rating'}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="p-4 md:p-5 lg:p-6 space-y-4 md:space-y-5 lg:space-y-6">
            {/* Pricing Section */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 md:gap-3">
                <span className="text-2xl md:text-3xl font-bold text-gray-900">{pricing.current}</span>
                <span className="text-base md:text-lg text-gray-500 line-through">{pricing.original}</span>
                <span className="bg-red-500 text-white px-1.5 md:px-2 py-1 rounded text-xs md:text-sm font-medium">
                  {pricing.discount} {language === 'bn' ? 'ছাড়' : 'off'}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 md:py-4 px-4 md:px-6 rounded-lg text-base md:text-lg transition-colors duration-200 transform hover:scale-105">
              {courseData?.cta_text?.primary || (language === 'bn' ? 'এনরোল করুন' : 'Enroll')}
            </button>

            {/* Course Info Header */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'bn' ? 'এই কোর্সে যা থাকছে' : 'What\'s included'}
              </h3>

              {/* Stats/Checklist */}
              <div className="space-y-3">
                {courseData.checklist.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-gray-700">
                    <img 
                      src={item.icon} 
                      alt="" 
                      className="w-5 h-5 object-contain"
                      style={{ filter: item.color === 'black' ? 'brightness(0.3)' : undefined }}
                    />
                    <div className="flex-1">
                      <span className="text-sm" style={{ color: item.color }}>
                        {item.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-t pt-4 text-center">
              <p className="text-sm text-gray-600 mb-2">
                {language === 'bn' ? 'কোনো সমস্যা হলে বিস্তারিত জানতে' : 'For any questions, contact us'}
              </p>
              <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                <span>📞</span>
                <span>{language === 'bn' ? 'ফোন করুন' : 'Call'} (16910)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Right Side Enrollment Card (No Video) */}
      {showFixedCard && !isFullWidth && (
        <div className="fixed top-0 right-4 md:right-12 lg:right-12 xl:right-80 w-72 md:w-80 lg:w-96 xl:w-[500px] z-50 hidden lg:block">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-4 md:p-5 lg:p-6 space-y-4 md:space-y-5 lg:space-y-6">
              {/* Pricing Section */}
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2 md:gap-3">
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">{pricing.current}</span>
                  <span className="text-base md:text-lg text-gray-500 line-through">{pricing.original}</span>
                  <span className="bg-red-500 text-white px-1.5 md:px-2 py-1 rounded text-xs md:text-sm font-medium">
                    {pricing.discount} {language === 'bn' ? 'ছাড়' : 'off'}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 md:py-4 px-4 md:px-6 rounded-lg text-base md:text-lg transition-colors duration-200 transform hover:scale-105">
                {courseData?.cta_text?.primary || (language === 'bn' ? 'এনরোল করুন' : 'Enroll')}
              </button>

              {/* Course Info Header */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {language === 'bn' ? 'এই কোর্সে যা থাকছে' : 'What\'s included'}
                </h3>

                {/* Stats/Checklist */}
                <div className="space-y-3">
                  {courseData.checklist.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-gray-700">
                      <img 
                        src={item.icon} 
                        alt="" 
                        className="w-5 h-5 object-contain"
                        style={{ filter: item.color === 'black' ? 'brightness(0.3)' : undefined }}
                      />
                      <div className="flex-1">
                        <span className="text-sm" style={{ color: item.color }}>
                          {item.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t pt-4 text-center">
                <p className="text-sm text-gray-600 mb-2">
                  {language === 'bn' ? 'কোনো সমস্যা হলে বিস্তারিত জানতে' : 'For any questions, contact us'}
                </p>
                <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                  <span>📞</span>
                  <span>{language === 'bn' ? 'ফোন করুন' : 'Call'} (16910)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideoId && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={closeVideoModal}
          videoId={selectedVideoId}
          title={language === 'bn' ? 'কোর্স ভিডিও' : 'Course Video'}
        />
      )}

      {/* Sticky Bottom Enrollment Button for Small Screens */}
      {showStickyButton && (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
          <div className="bg-white border-t shadow-lg px-4 py-3 space-y-3">
            {/* Price Section */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl font-bold text-gray-900">{pricing.current}</span>
              <span className="text-sm text-gray-500 line-through">{pricing.original}</span>
              <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                {pricing.discount} {language === 'bn' ? 'ছাড়' : 'off'}
              </span>
            </div>
            
            {/* Full Width Enroll Button */}
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg text-base transition-colors duration-200">
              {courseData?.cta_text?.primary || (language === 'bn' ? 'এনরোল করুন' : 'Enroll')}
            </button>
          </div>
        </div>
      )}
    </>
  )
} 