import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, MessageCircle, CheckCircle2, Film, Image as ImageIcon, Wand2 } from 'lucide-react'
import { useLanguage } from '../../../infrastructure/i18n/language-context'

interface AchimoPageViewProps {
  bannerUrl?: string
  tiktokUrl?: string
  onBack: () => void
}

interface AchimoServiceItem {
  id: string
  name: string
  price: string
  category: 'preset' | 'banner' | 'media'
  note?: string
}

export const AchimoPageView: React.FC<AchimoPageViewProps> = ({
  bannerUrl = 'https://ugc.production.linktr.ee/b771e888-1178-4737-97ef-4aebe9207e5e_WhatsApp-Image-2026-10-04-at-09.00.26.jpeg',
  tiktokUrl = 'https://www.tiktok.com/@acyash_?_r=1&_t=ZS-9AGJIkH4ic0',
  onBack,
}) => {
  const { t } = useLanguage()

  const presetItems: AchimoServiceItem[] = [
    { id: 'p-1', name: 'JJ Biasa', price: '3k', category: 'preset' },
    { id: 'p-2', name: 'JJ Duo, Trio dst.', price: '4k', category: 'preset' },
    { id: 'p-3', name: 'JJ Gameplay', price: '5k', category: 'preset' },
    { id: 'p-4', name: 'Mentahan ML (Is, Hs, Lobby) dst.', price: '1k', category: 'preset' },
    { id: 'p-5', name: 'CC (Bisa Req Warna)', price: '2k – 3k', category: 'preset' },
  ]

  const bannerItems: AchimoServiceItem[] = [
    {
      id: 'b-1',
      name: 'Edit Banner',
      price: '5k – 15k',
      category: 'banner',
      note: 'Bisa req warna • Karakter / Tema • Revisi sampai hasil maksimal',
    },
  ]

  const mediaItems: AchimoServiceItem[] = [
    { id: 'm-1', name: 'HD Foto', price: '1k / foto', category: 'media' },
    { id: 'm-2', name: 'HD Video', price: '2k – 4k / video', category: 'media' },
  ]

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
          <span>{t.achimoPricelist.backToHome}</span>
        </motion.button>

        <a
          href={tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full bg-pink-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-transform hover:scale-105"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          <span>{t.achimoPricelist.orderDmBtn}</span>
        </a>
      </div>

      {/* Main Container Card */}
      <div className="relative w-full overflow-hidden rounded-[28px] border-2 border-black bg-white shadow-neo text-black">
        {/* Banner Preview matching exact 16:9 ratio */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100 border-b border-black/10">
          <img
            src={bannerUrl}
            alt="Paid Edit by Achimoo Banner"
            className="h-full w-full object-cover object-top"
            loading="eager"
          />
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-5">
          {/* Header Title */}
          <div className="mb-4 pb-3 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-extrabold text-neutral-900 tracking-tight flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-pink-500" />
              <span>{t.achimoPricelist.title}</span>
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              {t.achimoPricelist.subtitle}
            </p>
          </div>

          {/* Group 1: Preset */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-pink-700 bg-pink-50 px-2.5 py-1 rounded-lg w-fit mb-2">
              <Wand2 className="h-3.5 w-3.5" />
              <span>{t.achimoPricelist.presetSection}</span>
            </div>
            <div className="flex flex-col gap-2">
              {presetItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-2xl border border-black/10 bg-neutral-50 transition-colors hover:bg-neutral-100/80"
                >
                  <span className="text-xs sm:text-sm font-bold text-neutral-900">
                    {item.name}
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-extrabold text-pink-600">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Note Box */}
            <div className="mt-2 rounded-xl bg-pink-50/70 p-2.5 border border-pink-200/60 text-[11px] text-pink-900 leading-relaxed font-medium">
              <CheckCircle2 className="h-3.5 w-3.5 inline mr-1 text-pink-600" />
              {t.achimoPricelist.note}
            </div>
          </div>

          {/* Group 2: Edit Banner */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg w-fit mb-2">
              <ImageIcon className="h-3.5 w-3.5" />
              <span>{t.achimoPricelist.bannerSection}</span>
            </div>
            <div className="flex flex-col gap-2">
              {bannerItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl border border-black/10 bg-neutral-50 transition-colors hover:bg-neutral-100/80"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-neutral-900">
                      {item.name}
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-extrabold text-purple-600">
                      {item.price}
                    </span>
                  </div>
                  {item.note && (
                    <p className="text-[11px] text-neutral-500 mt-1 font-medium">
                      {item.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Group 3: Edit Photo / Video */}
          <div className="mb-5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg w-fit mb-2">
              <Film className="h-3.5 w-3.5" />
              <span>{t.achimoPricelist.mediaSection}</span>
            </div>
            <div className="flex flex-col gap-2">
              {mediaItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-2xl border border-black/10 bg-neutral-50 transition-colors hover:bg-neutral-100/80"
                >
                  <span className="text-xs sm:text-sm font-bold text-neutral-900">
                    {item.name}
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-extrabold text-indigo-600">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct TikTok DM Button */}
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-black bg-pink-500 py-3 text-xs sm:text-sm font-bold text-white shadow-neo-sm transition-colors hover:bg-pink-600"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{t.achimoPricelist.orderDmBtn}</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
