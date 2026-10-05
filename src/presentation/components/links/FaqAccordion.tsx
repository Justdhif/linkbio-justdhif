import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronDown } from 'lucide-react'
import { FaqItem } from '../../../domain/entities/store-features.entity'

interface FaqAccordionProps {
  items: FaqItem[]
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null)

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full rounded-[28px] border-2 border-black bg-white p-4 sm:p-5 shadow-neo text-black"
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-white">
            <HelpCircle className="h-4 w-4" />
          </span>
          <h3 className="text-sm sm:text-base font-bold text-black uppercase tracking-wider">
            Tanya Jawab (FAQ)
          </h3>
        </div>
      </div>

      {/* Accordion List */}
      <div className="flex flex-col gap-2">
        {items.map((item) => {
          const isOpen = openId === item.id
          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-black/10 bg-neutral-50 transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="flex w-full items-center justify-between p-3.5 text-left text-xs sm:text-sm font-bold text-neutral-900 focus:outline-none"
              >
                <span className="pr-2">{item.question}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-200/80 text-neutral-700"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="border-t border-black/5 p-3.5 pt-2 text-xs sm:text-[13px] leading-relaxed text-neutral-600 bg-white/60">
                      {item.answer}
                      {item.id === 'faq-4' && (
                        <div className="mt-2.5">
                          <a
                            href="https://whatsapp.com/channel/0029VbDaoYe0wajpT6EOPx2b"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3 py-1 text-[11px] font-bold text-white shadow-sm hover:brightness-110 transition-all"
                          >
                            <span>📢 Masuk Saluran Testimoni WA</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
