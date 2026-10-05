import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, MessageSquare, Flame, ShoppingBag, ShieldCheck } from 'lucide-react'
import { PricelistItem } from '../../../domain/entities/store-features.entity'
import { useLanguage } from '../../../infrastructure/i18n/language-context'

interface ProductsPageViewProps {
  items: PricelistItem[]
  bannerUrl?: string
  whatsappNumber?: string
  onBack: () => void
}

export const ProductsPageView: React.FC<ProductsPageViewProps> = ({
  items,
  bannerUrl = '/images/order-products-banner.jpg',
  whatsappNumber = '447762422507',
  onBack,
}) => {
  const { language, t } = useLanguage()

  const getWhatsAppUrl = (itemName?: string, price?: string) => {
    const text = language === 'id'
      ? (itemName
          ? `Halo Justdhif Store, saya mau order: ${itemName} (${price})`
          : 'Halo Justdhif Store, saya mau order produk')
      : (itemName
          ? `Hello Justdhif Store, I'd like to order: ${itemName} (${price})`
          : 'Hello Justdhif Store, I want to order a product')

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
  }

  // Map item details from translation dictionary if available
  const localizedItems: PricelistItem[] = items.map((item) => {
    const itemKeyMap: Record<string, keyof typeof t.pricelist.items> = {
      'price-1': 'nokos',
      'price-2': 'jasbug',
      'price-3': 'jasban',
      'price-4': 'murban',
      'price-5': 'amprem',
      'price-6': 'jokitugas',
    }

    const key = itemKeyMap[item.id]
    if (key && t.pricelist.items[key]) {
      const transItem = t.pricelist.items[key]
      return {
        ...item,
        name: transItem.name,
        price: transItem.price,
        note: transItem.note,
        badgeText: 'badge' in transItem ? (transItem as { badge?: string }).badge : item.badgeText,
      }
    }
    return item
  })

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 px-4 pb-12 w-full max-w-[580px] mx-auto z-10 pt-4"
    >
      {/* Top Navigation Bar with Back Button */}
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-xs sm:text-sm font-bold text-black shadow-neo-sm transition-transform hover:bg-neutral-100"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t.pricelist.backToHome}</span>
        </motion.button>

        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-transform hover:scale-105"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Order via WA</span>
        </a>
      </div>

      {/* Main Container Card */}
      <div className="relative w-full overflow-hidden rounded-[28px] border-2 border-black bg-white shadow-neo text-black">
        {/* Banner Preview matching exact 16:9 ratio */}
        {bannerUrl && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100 border-b border-black/10">
            <img
              src={bannerUrl}
              alt="Order My Products - Justdhif Store"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        )}

        {/* Content Section */}
        <div className="p-4 sm:p-5">
          {/* Header Title */}
          <div className="mb-4 pb-3 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-extrabold text-neutral-900 tracking-tight flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-emerald-600" />
              <span>{t.pricelist.title}</span>
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              {t.pricelist.subtitle}
            </p>
          </div>

          {/* Section: Products & Services */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg w-fit">
                <ShoppingBag className="h-3.5 w-3.5 text-emerald-600" />
                <span>{t.pricelist.sectionTitle}</span>
              </div>
              <span className="text-xs font-semibold text-neutral-400">
                {localizedItems.length} {language === 'id' ? 'Layanan' : 'Items'}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {localizedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-2xl border border-black/10 bg-neutral-50 transition-colors hover:bg-neutral-100/80"
                >
                  <div className="flex-1 pr-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs sm:text-sm font-bold text-neutral-900">
                        {item.name}
                      </span>
                      {item.isPopular && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded-md">
                          <Flame className="h-2.5 w-2.5 fill-rose-500" /> {t.pricelist.bestSeller}
                        </span>
                      )}
                      {item.badgeText && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-md shadow-2xs">
                          <ShieldCheck className="h-3 w-3 text-emerald-600" />
                          <span>{item.badgeText}</span>
                        </span>
                      )}
                    </div>
                    {item.note && (
                      <p className="text-[11px] text-neutral-500 mt-1 font-medium">
                        {item.note}
                      </p>
                    )}
                  </div>

                  <span className="text-xs sm:text-sm font-mono font-extrabold text-emerald-600 shrink-0">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct WhatsApp Order Button */}
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-black bg-emerald-600 py-3 text-xs sm:text-sm font-bold text-white shadow-neo-sm transition-colors hover:bg-emerald-700"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{t.pricelist.bannerCta}</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
