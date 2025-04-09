import { useState } from 'react'
import { FiX } from 'react-icons/fi'

function PackageGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)

  const openLightbox = (index) => {
    setActiveIndex(index)
    setShowLightbox(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setShowLightbox(false)
    document.body.style.overflow = 'auto'
  }

  const goToPrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Image */}
        <div className="md:col-span-2">
          <img
            src={images[0].url}
            alt={images[0].alt}
            className="w-full h-80 md:h-96 object-cover rounded-lg cursor-pointer"
            onClick={() => openLightbox(0)}
          />
        </div>
        
        {/* Thumbnail Images */}
        {images.slice(1).map((image, index) => (
          <div key={index + 1} className="h-40 md:h-48">
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              onClick={() => openLightbox(index + 1)}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
            onClick={closeLightbox}
          >
            <FiX className="w-6 h-6" />
          </button>
          
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
            onClick={goToPrevious}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <img
            src={images[activeIndex].url}
            alt={images[activeIndex].alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
            onClick={goToNext}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="bg-black bg-opacity-50 px-4 py-2 rounded-full text-white text-sm">
              {activeIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PackageGallery
