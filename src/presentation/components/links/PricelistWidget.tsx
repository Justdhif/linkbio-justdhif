import React from 'react'
import { motion } from 'framer-motion'
import { Tag, MessageSquare, Flame } from 'lucide-react'
import { PricelistItem } from '../../../domain/entities/store-features.entity'

interface PricelistWidgetProps {
  items: PricelistItem[]
  whatsappNumber?: string
}

export const PricelistWidget: React.FC<PricelistWidgetProps> = ({
  items,
  whatsappNumber = '447762422507',
}) => {
  const getWhatsAppUrl = (itemName: string, price: string) => {
    const text = `Halo Justdhif Store, saya mau order: ${itemName} (${price})`
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full rounded-[28px] border-2 border-black bg-white p-4 sm:p-5 shadow-neo text-black"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
            <Tag className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-black uppercase tracking-wider">
              Pricelist Layanan
            </h3>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          Fast Process
        </span>
      </div>

      {/* Items List */}
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
    </motion.div>
  )
}
