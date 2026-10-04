import React from 'react'
import { motion } from 'framer-motion'
import { MoreVertical } from 'lucide-react'
import { LinkItem } from '../../../domain/entities/link.entity'

interface ClassicButtonProps {
  link: LinkItem
  onShareClick: (link: LinkItem) => void
}

export const ClassicButton: React.FC<ClassicButtonProps> = ({ link, onShareClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      whileTap={{ scale: 0.98, y: 0 }}
      className="group relative flex w-full items-center justify-between overflow-hidden rounded-[28px] border-2 border-black bg-white shadow-neo transition-shadow duration-200 hover:shadow-neo-lg"
    >
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full min-h-[58px] items-center px-4 py-2.5 focus:outline-none"
      >
        {/* Left Thumbnail (if available) */}
        {link.thumbnailUrl ? (
          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-black/10 bg-neutral-100">
            <img
              src={link.thumbnailUrl}
              alt={link.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-10 flex-shrink-0" />
        )}

        {/* Title Centered */}
        <div className="flex-1 px-3 text-center">
          <span className="block text-sm sm:text-base font-semibold text-black tracking-tight line-clamp-1 group-hover:underline">
            {link.title}
          </span>
        </div>

        {/* Spacer for symmetry with left thumbnail */}
        <div className="w-10 flex-shrink-0" />
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
        className="absolute right-3.5 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-black/60 transition-colors hover:bg-neutral-100 hover:text-black focus:outline-none"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
    </motion.div>
  )
}
