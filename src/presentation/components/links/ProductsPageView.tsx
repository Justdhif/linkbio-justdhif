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

        <span className="text-xs font-bold text-emerald-400 bg-black/40 border border-emerald-400/30 px-3 py-1 rounded-full">
          {t.pricelist.badgeOpen}
        </span>
      </div>

      {/* Main Content Box */}
      <div className="relative w-full overflow-hidden rounded-[28px] border-2 border-black bg-white shadow-neo text-black">
        {/* Banner Image Header */}
        {bannerUrl && (
          <div className="relative aspect-[21/9] sm:aspect-[2.2/1] w-full overflow-hidden bg-neutral-100 border-b border-black/10">
            <img
              src={bannerUrl}
              alt="Order My Products - Justdhif Store"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-5">
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                {t.pricelist.title}
              </h2>
              <p className="text-xs text-white/80 mt-0.5">
                {language === 'id' ? 'Pilih produk di bawah untuk order via WhatsApp' : 'Select a product below to order via WhatsApp'}
              </p>
            </div>
          </div>
        )}

        {/* Product Items List */}
        <div className="p-4 sm:p-5">
          <div className="mb-3.5 flex items-center justify-between border-b border-neutral-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-white">
                <ShoppingBag className="h-4 w-4" />
              </span>
              <h3 className="text-sm sm:text-base font-bold text-black uppercase tracking-wider">
                {language === 'id' ? 'Daftar Layanan & Harga' : 'Services & Pricelist'}
              </h3>
            </div>
            <span className="text-xs font-semibold text-neutral-500">
              {localizedItems.length} {language === 'id' ? 'Layanan' : 'Items'}
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {localizedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-black/10 bg-neutral-50/80 transition-colors hover:bg-neutral-100/90"
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
                    <p className="text-[11px] text-neutral-500 mt-0.5 font-medium">
                      {item.note}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs sm:text-sm font-extrabold text-neutral-950 font-mono">
                    {item.price}
                  </span>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={getWhatsAppUrl(item.name, item.price)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Order ${item.name}`}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-black text-white text-xs font-bold transition-transform hover:bg-neutral-800"
                  >
                    <MessageSquare className="h-3 w-3" />
                    <span>{t.pricelist.orderBtn}</span>
                  </motion.a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
