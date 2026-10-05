import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { GalleryItem, GalleryPhoto } from '../../../domain/entities/gallery.entity'

interface GalleryWidgetProps {
  gallery: GalleryItem
}

export const GalleryWidget: React.FC<GalleryWidgetProps> = ({ gallery }) => {
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null)
  const [photoIndex, setPhotoIndex] = useState<number>(0)

  // Lock body scroll when modal photo preview is open
  useEffect(() => {
    if (activePhoto) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [activePhoto])

  const handleOpenPhoto = (photo: GalleryPhoto, index: number) => {
    setActivePhoto(photo)
    setPhotoIndex(index)
  }

  const handleClose = () => {
    setActivePhoto(null)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    const nextIdx = (photoIndex - 1 + gallery.photos.length) % gallery.photos.length
    setPhotoIndex(nextIdx)
    setActivePhoto(gallery.photos[nextIdx])
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    const nextIdx = (photoIndex + 1) % gallery.photos.length
    setPhotoIndex(nextIdx)
    setActivePhoto(gallery.photos[nextIdx])
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full rounded-[28px] border-2 border-black bg-white p-4 shadow-neo"
      >
        {/* Header Widget */}
        <div className="mb-3 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-white">
              <Car className="h-4 w-4" />
            </span>
            <span className="text-sm sm:text-base font-bold text-black uppercase tracking-wider">
              {gallery.title}
            </span>
          </div>
        </div>

        {/* Horizontal Photo Grid / Carousel */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {gallery.photos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleOpenPhoto(photo, idx)}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-black/10 bg-neutral-100 shadow-sm"
            >
              <img
                src={photo.image}
                alt={`Photo ${idx + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox Modal via Portal */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {activePhoto && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-h-[90vh] max-w-[500px] w-full overflow-hidden rounded-3xl border-2 border-white/20 bg-neutral-900 shadow-2xl text-white"
                >
                  {/* Close Button */}
                  <button
                    onClick={handleClose}
                    aria-label="Tutup"
                    className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/90"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {/* Image Preview */}
                  <div className="relative aspect-video sm:aspect-square w-full bg-black">
                    <img
                      src={activePhoto.image}
                      alt={activePhoto.title || 'Preview'}
                      className="h-full w-full object-contain"
                    />

                    {/* Left & Right navigation */}
                    {gallery.photos.length > 1 && (
                      <>
                        <button
                          onClick={handlePrev}
                          className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={handleNext}
                          className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Caption */}
                  <div className="p-4 bg-neutral-950 text-center">
                    <h3 className="text-lg font-bold">
                      {activePhoto.title || `Foto ${photoIndex + 1}`}
                    </h3>
                    {activePhoto.description && (
                      <p className="mt-1 text-xs text-neutral-400">
                        {activePhoto.description}
                      </p>
                    )}
                    <div className="mt-2 text-[11px] text-neutral-500">
                      {photoIndex + 1} dari {gallery.photos.length}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}
