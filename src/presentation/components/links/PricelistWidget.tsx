import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Flame, ShoppingBag, ExternalLink, ShieldCheck } from 'lucide-react'
import { PricelistItem } from '../../../domain/entities/store-features.entity'

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
  const getWhatsAppUrl = (itemName?: string, price?: string) => {
    const text = itemName
      ? `Halo Justdhif Store, saya mau order: ${itemName} (${price})`
      : 'Halo Justdhif Store, saya mau order produk'
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="relative w-full overflow-hidden rounded-[28px] border-2 border-black bg-white shadow-neo transition-shadow duration-200 hover:shadow-neo-lg text-black"
    >
      {/* 1. Header Banner Image (Merged from 'order my products' card) */}
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
              alt="Order My Products - Justdhif Store"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-3">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                <ExternalLink className="h-3.5 w-3.5" /> Order via WhatsApp
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
                Order My Products • Pricelist
              </h3>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Open Order
          </span>
        </div>

        {/* 3. Items List */}
        <div className="flex flex-col gap-2.5">
          {items.map((item) => (
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
                      <Flame className="h-2.5 w-2.5 fill-rose-500" /> Best Seller
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
                  <span>Order</span>
                </motion.a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
