import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, ChevronRight, Sparkles } from 'lucide-react'
import { useLanguage } from '../../../infrastructure/i18n/language-context'

interface ProductsBannerCardProps {
  bannerUrl?: string
  totalItems?: number
  onNavigateToProducts: () => void
}

export const ProductsBannerCard: React.FC<ProductsBannerCardProps> = ({
  bannerUrl = '/images/order-products-banner.jpg',
  totalItems = 6,
  onNavigateToProducts,
}) => {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      onClick={onNavigateToProducts}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onNavigateToProducts()
        }
      }}
      className="group relative w-full overflow-hidden rounded-[28px] border-2 border-black bg-white shadow-neo transition-all duration-200 hover:shadow-neo-lg cursor-pointer text-black"
    >
      {/* Banner Image Preview */}
      <div className="relative aspect-[21/9] sm:aspect-[2.2/1] w-full overflow-hidden bg-neutral-100">
        <img
          src={bannerUrl}
          alt="Order My Products - Justdhif Store"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-5">
          <div className="flex items-center justify-between w-full">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3 py-1 text-xs font-bold text-white shadow-md backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-lime-300" />
              <span>Official Store • {totalItems} Services</span>
            </span>
            <span className="text-[11px] font-bold text-emerald-400 bg-black/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              {t.pricelist.badgeOpen}
            </span>
          </div>

          <h3 className="mt-2 text-base sm:text-lg font-extrabold text-white tracking-tight drop-shadow-sm flex items-center gap-2">
            <span>{t.pricelist.title}</span>
          </h3>
        </div>
      </div>

      {/* Bottom Action Strip */}
      <div className="flex items-center justify-between p-3.5 sm:p-4 bg-neutral-50 border-t border-black/10 group-hover:bg-neutral-100/90 transition-colors">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
            <ShoppingBag className="h-3.5 w-3.5" />
          </span>
          <span className="text-xs sm:text-sm font-bold text-neutral-800 group-hover:text-black">
            {t.pricelist.viewProductsCta}
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
