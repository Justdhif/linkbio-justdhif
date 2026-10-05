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
      {/* Featured Banner Thumbnail with Linktree Inset Frame */}
      <div className="relative aspect-video w-full overflow-hidden p-3 pb-0 sm:p-3.5 sm:pb-0">
        <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-neutral-100 border border-black/10">
          <img
            src={bannerUrl}
            alt="Paid Edit by Achimoo"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>

      {/* Bottom Action Strip */}
      <div className="flex items-center justify-between px-5 py-3 sm:py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500 text-white shrink-0 shadow-xs">
            <Video className="h-3.5 w-3.5" />
          </span>
          <div className="flex flex-col text-left">
            <span className="text-sm font-extrabold text-neutral-900 tracking-tight group-hover:text-black line-clamp-1">
              Paid Edit by Achimoo
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-neutral-500 group-hover:text-neutral-700">
              {t.achimoPricelist.viewProductsCta}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-black">
          <span className="hidden sm:inline text-neutral-400 group-hover:text-black transition-colors text-xs font-semibold">
            Detail
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:translate-x-1 shadow-sm">
            <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.div>
  )
}
