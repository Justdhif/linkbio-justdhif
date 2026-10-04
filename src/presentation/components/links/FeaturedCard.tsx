import React from 'react'
import { motion } from 'framer-motion'
import { MoreVertical, ExternalLink } from 'lucide-react'
import { LinkItem } from '../../../domain/entities/link.entity'

interface FeaturedCardProps {
  link: LinkItem
  onShareClick: (link: LinkItem) => void
}

export const FeaturedCard: React.FC<FeaturedCardProps> = ({ link, onShareClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98, y: 0 }}
      className="group relative w-full overflow-hidden rounded-[28px] border-2 border-black bg-white shadow-neo transition-shadow duration-200 hover:shadow-neo-lg"
    >
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus:outline-none"
      >
        {/* Featured Video / Image Thumbnail */}
        {link.thumbnailUrl && (
          <div className="relative aspect-video w-full overflow-hidden p-3 pb-0">
            <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-neutral-100 border border-black/10">
              <img
                src={link.thumbnailUrl}
                alt={link.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-3">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-white bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  <ExternalLink className="h-3.5 w-3.5" /> Buka Tautan
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Title bar / Button bottom */}
        <div className="relative flex min-h-[58px] items-center justify-between px-6 py-3.5">
          <div className="flex-1 pr-4 text-center">
            <span className="block text-sm sm:text-base font-semibold text-black tracking-tight line-clamp-1">
              {link.title}
            </span>
          </div>
        </div>
      </a>

      {/* Share / 3 dots button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onShareClick(link)
        }}
        aria-label={`Share ${link.title}`}
        className="absolute right-3.5 bottom-3.5 z-10 flex h-8 w-8 items-center justify-center rounded-full text-black/60 transition-colors hover:bg-neutral-100 hover:text-black focus:outline-none"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
    </motion.div>
  )
}
