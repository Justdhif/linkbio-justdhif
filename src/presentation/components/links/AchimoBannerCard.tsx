import React from 'react'
import { motion } from 'framer-motion'
import { Video, ChevronRight } from 'lucide-react'
import { useLanguage } from '../../../infrastructure/i18n/language-context'

interface AchimoBannerCardProps {
  bannerUrl?: string
  onNavigate: () => void
}

export const AchimoBannerCard: React.FC<AchimoBannerCardProps> = ({
  bannerUrl = 'https://ugc.production.linktr.ee/b771e888-1178-4737-97ef-4aebe9207e5e_WhatsApp-Image-2026-10-04-at-09.00.26.jpeg',
  onNavigate,
}) => {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      onClick={onNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onNavigate()
        }
      }}
      className="group relative w-full overflow-hidden rounded-[28px] border-2 border-black bg-white shadow-neo transition-all duration-200 hover:shadow-neo-lg cursor-pointer text-black"
    >
      {/* Banner Image Preview matching exact 16:9 ratio */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
        <img
          src={bannerUrl}
          alt="Paid Edit by Achimoo"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Bottom Action Strip */}
      <div className="flex items-center justify-between p-3.5 sm:p-4 bg-neutral-50 border-t border-black/10 group-hover:bg-neutral-100/90 transition-colors">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500 text-white shadow-xs">
            <Video className="h-3.5 w-3.5" />
          </span>
          <span className="text-xs sm:text-sm font-bold text-neutral-800 group-hover:text-black">
            {t.achimoPricelist.viewProductsCta}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-black">
          <span className="hidden sm:inline text-neutral-500 group-hover:text-black transition-colors">
            Detail
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:translate-x-1">
            <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.div>
  )
}
