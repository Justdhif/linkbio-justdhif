import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, ChevronRight } from 'lucide-react'
import { useLanguage } from '../../../infrastructure/i18n/language-context'

interface ProductsBannerCardProps {
  bannerUrl?: string
  onNavigateToProducts: () => void
}

export const ProductsBannerCard: React.FC<ProductsBannerCardProps> = ({
  bannerUrl = '/images/order-products-banner.jpg',
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
      {/* Banner Image Preview with exact 16:9 ratio */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
        <img
          src={bannerUrl}
          alt="Order My Products - Justdhif Store"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
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
