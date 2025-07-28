import React from 'react'

import { ChevronLeft, ChevronRight, Play, Quote } from 'lucide-react'

interface Testimonial {
  description: string
  id: string
  name: string
  profile_image: string
  testimonial: string
  thumb?: string
  video_type: string
  video_url: string
}

interface StudentsOpinionProps {
  section: {
    name: string
    values?: Testimonial[]
  }
}

export function StudentsOpinion({ section }: StudentsOpinionProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [selectedVideo, setSelectedVideo] = React.useState<string | null>(null)

  const testimonials = section.values || []
  const testimonialsPerPage = 2
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const getCurrentTestimonials = () => {
    const start = currentIndex * testimonialsPerPage
    return testimonials.slice(start, start + testimonialsPerPage)
  }

  const handleVideoClick = (videoUrl: string) => {
    if (videoUrl) {
      setSelectedVideo(videoUrl)
    }
  }

  const closeVideo = () => {
    setSelectedVideo(null)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          {section.name}
        </h2>

        {/* Testimonials Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200"
            disabled={currentIndex === totalPages - 1}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-16">
            {getCurrentTestimonials().map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Video or Text Content */}
                {testimonial.video_url ? (
                  <div className="relative">
                    <div
                      className="relative aspect-video bg-gray-100 cursor-pointer group"
                      onClick={() => handleVideoClick(testimonial.video_url)}
                    >
                      {testimonial.thumb ? (
                        <img
                          src={testimonial.thumb}
                          alt={`${testimonial.name} testimonial`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <Play className="w-16 h-16 text-white" />
                        </div>
                      )}
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors duration-200">
                        <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-200">
                          <Play className="w-8 h-8 text-red-500 fill-current" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="relative">
                      <Quote className="absolute top-0 left-0 w-8 h-8 text-red-200 -mt-2 -ml-2" />
                      <p className="text-gray-700 leading-relaxed text-sm line-clamp-6 relative z-10">
                        {testimonial.testimonial}
                      </p>
                    </div>
                  </div>
                )}

                {/* Student Info */}
                <div className="p-6 flex items-center space-x-4">
                  <img
                    src={testimonial.profile_image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-red-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="relative bg-white rounded-lg overflow-hidden max-w-4xl w-full">
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                  title="Student Testimonial"
                  className="w-full h-full"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
} 