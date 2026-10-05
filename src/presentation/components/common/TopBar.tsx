import React from 'react'
import { motion } from 'framer-motion'
import { Share2, Globe } from 'lucide-react'
import { useLanguage } from '../../../infrastructure/i18n/language-context'

interface TopBarProps {
  onShareClick: () => void
}

export const TopBar: React.FC<TopBarProps> = ({ onShareClick }) => {
  const { language, setLanguage, t } = useLanguage()

  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id')
  }

  return (
    <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none w-full">
      <div className="flex w-full items-center justify-between px-4 pt-4 pb-2 sm:px-6 sm:pt-5">
        {/* Brand Home Button with Favicon Logo */}
        <motion.button
          onClick={handleScrollTop}
          aria-label={t.topBar.homeAria}
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

        {/* Right side controls: Language switcher + Share button */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Language Toggle Button */}
          <motion.button
            onClick={toggleLanguage}
            title={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 h-10 rounded-2xl bg-black/25 text-white backdrop-blur-md border border-white/25 shadow-md transition-colors hover:bg-black/35 text-xs font-bold"
          >
            <Globe className="h-3.5 w-3.5 text-white/80" />
            <span className="uppercase tracking-wider">{language}</span>
          </motion.button>

          {/* Share profile button */}
          <motion.button
            onClick={onShareClick}
            aria-label={t.topBar.shareAria}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-black/25 text-white backdrop-blur-md border border-white/25 shadow-md transition-colors hover:bg-black/35"
          >
            <Share2 className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
