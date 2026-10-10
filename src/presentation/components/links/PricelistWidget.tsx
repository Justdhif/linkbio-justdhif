import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Flame, ShoppingBag, ExternalLink, ShieldCheck, Percent, Tag } from 'lucide-react'
import { PricelistItem } from '../../../domain/entities/store-features.entity'
import { useLanguage } from '../../../infrastructure/i18n/language-context'
import { isFridayInJakarta, calculateFridayDiscount } from '../../../core/utils/store-schedule'

interface PricelistWidgetProps {
  items: PricelistItem[]
  bannerUrl?: string
  whatsappNumber?: string
}

export const PricelistWidget: React.FC<PricelistWidgetProps> = ({
  items,
  bannerUrl = '/images/order-products-banner.jpg',
  whatsappNumber = '447762422507',
}) => {
  const { language, t } = useLanguage()
  const isFriday = isFridayInJakarta()
  const isId = language === 'id'

  const getWhatsAppUrl = (itemName?: string, price?: string, hasFridayPromo?: boolean) => {
    let orderText = ''
    if (isId) {
      if (itemName) {
        orderText = hasFridayPromo
          ? `Halo Justdhif Store, saya mau konfirmasi & pesan: ${itemName} (${price} • Promo Jumat Diskon 20%)`
          : `Halo Justdhif Store, saya mau konfirmasi & pesan: ${itemName} (${price})`
      } else {
        orderText = isFriday
          ? 'Halo Justdhif Store, saya mau konfirmasi & pesan produk (Promo Jumat Diskon 20%)'
          : 'Halo Justdhif Store, saya mau konfirmasi & pesan produk'
      }
    } else {
      if (itemName) {
        orderText = hasFridayPromo
          ? `Hello Justdhif Store, I'd like to confirm & order: ${itemName} (${price} • Friday Promo 20% OFF)`
          : `Hello Justdhif Store, I'd like to confirm & order: ${itemName} (${price})`
      } else {
        orderText = isFriday
          ? 'Hello Justdhif Store, I want to confirm & order a product (Friday Promo 20% OFF)'
          : 'Hello Justdhif Store, I want to confirm & order a product'
      }
    }

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`
  }

  // Map item details from translation dictionary if available
  const localizedItems: PricelistItem[] = items.map((item) => {
    const transMap = t.pricelist.items as Record<string, { name: string; price: string; note?: string; badge?: string }>
    const transItem = transMap[item.id]
    if (transItem) {
      return {
        ...item,
        name: transItem.name,
        price: transItem.price,
        note: transItem.note,
        badgeText: transItem.badge || item.badgeText,
      }
    }
    return item
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="relative w-full overflow-hidden rounded-[28px] border-2 border-black bg-white shadow-neo transition-shadow duration-200 hover:shadow-neo-lg text-black"
    >
      {/* 1. Header Banner Image */}
      {bannerUrl && (
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 pb-0 group focus:outline-none"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-[20px] bg-neutral-100 border border-black/10">
            <img
              src={bannerUrl}
              alt="Justdhif Store Catalog"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-3">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                <ExternalLink className="h-3.5 w-3.5" /> {t.pricelist.bannerCta}
              </span>
            </div>
          </div>
        </a>
      )}

      {/* 2. Content Section */}
      <div className="p-4 sm:p-5 pt-3">
        {/* Header Title */}
        <div className="mb-3.5 flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
              <ShoppingBag className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-black uppercase tracking-wider">
                {t.pricelist.title}
              </h3>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {t.pricelist.badgeOpen}
          </span>
        </div>

        {/* Friday Promo Ribbon if Active */}
        {isFriday ? (
          <div className="mb-3 p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex items-center gap-2 text-xs">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white font-bold text-[10px]">
              <Percent className="h-3 w-3" />
            </span>
            <span className="font-bold text-[11px] text-amber-900">
              {t.pricelist.promo?.fridayActive}
            </span>
          </div>
        ) : (
          <div className="mb-3 p-2 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900 flex items-center gap-1.5 text-[11px]">
            <Tag className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>{t.pricelist.promo?.fridayNotice}</span>
          </div>
        )}

        {/* 3. Items List */}
        <div className="flex flex-col gap-2.5">
          {localizedItems.map((item) => {
            const discountedPrice = isFriday ? calculateFridayDiscount(item.price) : null
            const effectivePrice = discountedPrice || item.price

            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-2xl border border-black/10 bg-neutral-50/80 transition-colors hover:bg-neutral-100/90"
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
                    {item.badgeText && item.category !== 'aplikasi' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-md shadow-2xs">
                        <ShieldCheck className="h-3 w-3 text-emerald-600" />
                        <span>{item.badgeText}</span>
                      </span>
                    )}
                  </div>
                  {item.note && (
                    <p className="text-[11px] text-neutral-500 mt-0.5 font-medium">
                      {item.note}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="flex flex-col items-end">
                    {discountedPrice ? (
                      <>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] line-through text-neutral-400 font-mono">
                            {item.price}
                          </span>
                          <span className="text-[9px] font-extrabold text-rose-600 bg-rose-50 border border-rose-200 px-1 rounded">
                            -20%
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm font-mono font-black text-emerald-600">
                          {discountedPrice}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs sm:text-sm font-extrabold text-neutral-950 font-mono">
                        {item.price}
                      </span>
                    )}
                  </div>

                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={getWhatsAppUrl(item.name, effectivePrice, !!discountedPrice)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${t.pricelist.orderBtn} ${item.name}`}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-black text-white text-xs font-bold transition-transform hover:bg-neutral-800"
                  >
                    <MessageSquare className="h-3 w-3" />
                    <span>{t.pricelist.orderBtn}</span>
                  </motion.a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
