import React from 'react'
import { motion } from 'framer-motion'
import { Share2 } from 'lucide-react'

interface TopBarProps {
  onShareClick: () => void
}

export const TopBar: React.FC<TopBarProps> = ({ onShareClick }) => {
  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none w-full">
      <div className="flex w-full items-center justify-between px-4 pt-4 pb-2 sm:px-6 sm:pt-5">
        {/* Brand Home Button with Favicon Logo */}
        <motion.button
          onClick={handleScrollTop}
          aria-label="Justdhif Store Home"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto relative flex h-10 w-10 items-center justify-center rounded-2xl bg-black/25 text-white backdrop-blur-md border border-white/25 shadow-md transition-colors hover:bg-black/35 group p-1.5"
        >
          <img
            src="/favicon.svg"
            alt="Justdhif Logo"
            className="h-full w-full object-contain drop-shadow-sm transition-transform group-hover:scale-105"
          />
        </motion.button>

        {/* Share profile button */}
        <motion.button
          onClick={onShareClick}
          aria-label="Share profile"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto relative flex h-10 w-10 items-center justify-center rounded-2xl bg-black/25 text-white backdrop-blur-md border border-white/25 shadow-md transition-colors hover:bg-black/35"
        >
          <Share2 className="h-5 w-5" />
        </motion.button>
      </div>
    </div>
  )
}
