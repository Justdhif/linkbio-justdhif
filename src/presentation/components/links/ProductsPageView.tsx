import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  MessageSquare,
  Flame,
  ShoppingBag,
  ShieldCheck,
  Bot,
  Smartphone,
  Layers,
  Sparkles,
  Tag,
  Percent,
  AlertCircle,
  Film,
  Palette,
  Tv,
  Eye,
  Music,
} from 'lucide-react'
import { PricelistItem } from '../../../domain/entities/store-features.entity'
import { useLanguage } from '../../../infrastructure/i18n/language-context'
import { isFridayInJakarta, calculateFridayDiscount } from '../../../core/utils/store-schedule'

interface ProductsPageViewProps {
  items: PricelistItem[]
  bannerUrl?: string
  whatsappNumber?: string
  onBack: () => void
}

type MainCategory = 'all' | 'aplikasi' | 'sewa-bot'

export const ProductsPageView: React.FC<ProductsPageViewProps> = ({
  items,
  bannerUrl = '/images/order-products-banner.jpg',
  whatsappNumber = '447762422507',
  onBack,
}) => {
  const { language, t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<MainCategory>('all')
  const [selectedAppFilter, setSelectedAppFilter] = useState<string>('all')

  const isFriday = isFridayInJakarta()
  const isId = language === 'id'

  const getWhatsAppUrl = (
    appName?: string,
    variantName?: string,
    price?: string,
    hasFridayPromo?: boolean
  ) => {
    const fullItemName =
      appName && variantName && !variantName.includes(appName)
        ? `${appName} (${variantName})`
        : appName || ''

    let orderText = ''
    if (isId) {
      if (fullItemName) {
        orderText = hasFridayPromo
          ? `Halo Justdhif Store, saya mau konfirmasi & pesan: ${fullItemName} (${price} • Promo Jumat Diskon 20%)`
          : `Halo Justdhif Store, saya mau konfirmasi & pesan: ${fullItemName} (${price})`
      } else {
        orderText = isFriday
          ? 'Halo Justdhif Store, saya mau konfirmasi & pesan produk (Promo Jumat Diskon 20%)'
          : 'Halo Justdhif Store, saya mau konfirmasi & pesan produk'
      }
    } else {
      if (fullItemName) {
        orderText = hasFridayPromo
          ? `Hello Justdhif Store, I'd like to confirm & order: ${fullItemName} (${price} • Friday Promo 20% OFF)`
          : `Hello Justdhif Store, I'd like to confirm & order: ${fullItemName} (${price})`
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
    const transMap = t.pricelist.items as Record<
      string,
      { name: string; price: string; note?: string; badge?: string }
    >
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

  // Group items by category
  const appItems = localizedItems.filter((i) => i.category === 'aplikasi')
  const botItems = localizedItems.filter((i) => i.category === 'sewa-bot')
  const otherItems = localizedItems.filter(
    (i) => i.category !== 'aplikasi' && i.category !== 'sewa-bot'
  )

  // Sub-group application items by appGroup
  const appGroupsMap = appItems.reduce((acc, item) => {
    const group = item.appGroup || (isId ? 'Lainnya' : 'Other')
    if (!acc[group]) {
      acc[group] = []
    }
    acc[group].push(item)
    return acc
  }, {} as Record<string, PricelistItem[]>)

  const appGroupNames = Object.keys(appGroupsMap)

  // App icon helper
  const getAppIcon = (groupName: string) => {
    switch (groupName.toLowerCase()) {
      case 'canva pro':
        return <Palette className="h-4 w-4 text-sky-500" />
      case 'capcut':
        return <Film className="h-4 w-4 text-emerald-500" />
      case 'alight motion':
        return <Sparkles className="h-4 w-4 text-pink-500" />
      case 'spotify':
        return <Music className="h-4 w-4 text-green-500" />
      case 'netflix':
        return <Tv className="h-4 w-4 text-red-500" />
      case 'wink':
        return <Eye className="h-4 w-4 text-purple-500" />
      case 'gemini pro':
        return <Sparkles className="h-4 w-4 text-blue-500" />
      default:
        return <Smartphone className="h-4 w-4 text-neutral-600" />
    }
  }

  // Extract clean localized variant name from item name
  const getDisplayVariantName = (fullName: string, groupName?: string) => {
    if (!groupName) return fullName
    const regex = new RegExp(`^(${groupName}|AM Prem|Sewa Bot|Bot Rental)\\s*[-–:]?\\s*`, 'i')
    const stripped = fullName.replace(regex, '').trim()
    if (stripped.startsWith('(') && stripped.endsWith(')')) {
      return stripped.slice(1, -1)
    }
    return stripped || fullName
  }

  const mainCategoriesConfig: {
    id: MainCategory
    label: string
    icon: React.ReactNode
    count: number
  }[] = [
    {
      id: 'all',
      label: t.pricelist.categories?.all || (isId ? 'Semua' : 'All'),
      icon: <Layers className="h-3.5 w-3.5" />,
      count: localizedItems.length,
    },
    {
      id: 'aplikasi',
      label: t.pricelist.categories?.aplikasi || (isId ? 'Aplikasi' : 'Applications'),
      icon: <Smartphone className="h-3.5 w-3.5" />,
      count: appItems.length,
    },
    {
      id: 'sewa-bot',
      label: t.pricelist.categories?.sewaBot || (isId ? 'Sewa Bot' : 'Bot Rental'),
      icon: <Bot className="h-3.5 w-3.5" />,
      count: botItems.length,
    },
  ]

  // Render individual variant row inside an app card or list
  const renderVariantRow = (item: PricelistItem, appName?: string) => {
    const discountedPrice = isFriday ? calculateFridayDiscount(item.price) : null
    const effectivePrice = discountedPrice || item.price
    const displayName = getDisplayVariantName(item.name, appName)

    return (
      <div
        key={item.id}
        className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl border border-black/8 bg-white transition-colors hover:bg-neutral-50/90"
      >
        <div className="flex-1 pr-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs sm:text-sm font-bold text-neutral-900">
              {displayName}
            </span>

            {/* Best seller badge */}
            {item.isPopular && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded-md">
                <Flame className="h-2.5 w-2.5 fill-rose-500" /> {t.pricelist.bestSeller}
              </span>
            )}

            {/* Custom badgeText for non-app or specific badge */}
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

        {/* Price & Order Action */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex flex-col items-end">
            {discountedPrice ? (
              <>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] line-through text-neutral-400 font-mono">
                    {item.price}
                  </span>
                  <span className="text-[9px] font-black text-rose-600 bg-rose-50 border border-rose-200 px-1 rounded">
                    -20%
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-mono font-black text-emerald-600">
                  {discountedPrice}
                </span>
              </>
            ) : (
              <span className="text-xs sm:text-sm font-mono font-extrabold text-emerald-600">
                {item.price}
              </span>
            )}
          </div>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={getWhatsAppUrl(appName || item.name, displayName, effectivePrice, !!discountedPrice)}
            target="_blank"
            rel="noopener noreferrer"
            title={`${t.pricelist.orderBtn} ${appName || item.name}`}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-black text-white text-xs font-bold transition-transform hover:bg-neutral-800"
          >
            <MessageSquare className="h-3 w-3" />
            <span className="hidden xs:inline sm:inline">{t.pricelist.orderBtn}</span>
          </motion.a>
        </div>
      </div>
    )
  }

  // Render grouped app card
  const renderAppGroupCard = (groupName: string, groupItems: PricelistItem[]) => {
    return (
      <div
        key={groupName}
        className="rounded-2xl border-2 border-black/10 bg-neutral-50/80 p-3 sm:p-3.5 transition-all hover:border-black/20 shadow-2xs"
      >
        {/* App Group Header */}
        <div className="mb-2.5 flex items-center justify-between border-b border-black/8 pb-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white border border-black/10 shadow-2xs">
              {getAppIcon(groupName)}
            </span>
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-neutral-900 tracking-tight">
                {groupName}
              </h4>
              <span className="text-[10px] font-medium text-neutral-500">
                {groupItems.length} {t.pricelist.packagesLabel}
              </span>
            </div>
          </div>
        </div>

        {/* List of variants under this app */}
        <div className="flex flex-col gap-1.5">
          {groupItems.map((variant) => renderVariantRow(variant, groupName))}
        </div>
      </div>
    )
  }

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
          <span>{isId ? 'Pesan via WA' : 'Order via WA'}</span>
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
          <div className="mb-3.5 pb-3 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-extrabold text-neutral-900 tracking-tight flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-emerald-600" />
              <span>{t.pricelist.title}</span>
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              {t.pricelist.subtitle}
            </p>
          </div>

          {/* REQUIRED NOTICE: Konfirmasi Dahulu Sebelum Membeli */}
          <div className="mb-4 p-3 rounded-2xl bg-amber-50/90 border-2 border-amber-400 text-amber-950 flex items-start gap-2.5 shadow-xs">
            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold text-xs block text-amber-950">
                {isId
                  ? '⚠️ Harap Konfirmasi Sebelum Membeli'
                  : '⚠️ Please Confirm Before Purchasing'}
              </span>
              <p className="text-[11px] text-amber-900 mt-0.5 font-medium leading-relaxed">
                {t.pricelist.confirmationNotice}
              </p>
            </div>
          </div>

          {/* Friday 20% Discount Banner */}
          {isFriday ? (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 flex items-start gap-2.5 shadow-xs">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white font-black text-sm shadow-xs">
                <Percent className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-extrabold text-xs sm:text-sm text-rose-950">
                    {t.pricelist.promo?.fridayActive}
                  </span>
                  <span className="text-[10px] font-black bg-rose-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                    {isId ? 'HEMAT 20%' : 'SAVE 20%'}
                  </span>
                </div>
                <p className="text-[11px] text-rose-800 mt-0.5 font-medium">
                  {t.pricelist.promo?.fridayNotice}
                </p>
              </div>
            </div>
          ) : (
            <div className="mb-4 p-2.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-950 flex items-center gap-2 text-xs">
              <Tag className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="text-[11px] text-emerald-800 font-medium">
                {t.pricelist.promo?.fridayNotice}
              </span>
            </div>
          )}

          {/* Category Filter Pills (Main Level) */}
          <div
            className="mb-3.5 flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {mainCategoriesConfig.map((cat) => {
              const isActive = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id)
                    setSelectedAppFilter('all')
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-black text-white shadow-neo-sm scale-102'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : 'bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Sub-Filter Pills for Apps (when inside Aplikasi or All) */}
          {(selectedCategory === 'all' || selectedCategory === 'aplikasi') && (
            <div
              className="mb-4 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-neutral-100 pb-2.5"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <span className="text-[11px] font-bold text-neutral-400 shrink-0 mr-0.5">
                {isId ? 'Aplikasi:' : 'Apps:'}
              </span>
              <button
                onClick={() => setSelectedAppFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors shrink-0 cursor-pointer ${
                  selectedAppFilter === 'all'
                    ? 'bg-sky-600 text-white shadow-2xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {isId ? 'Semua Aplikasi' : 'All Apps'}
              </button>
              {appGroupNames.map((appName) => {
                const isActive = selectedAppFilter === appName
                return (
                  <button
                    key={appName}
                    onClick={() => setSelectedAppFilter(appName)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-sky-600 text-white shadow-2xs'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {getAppIcon(appName)}
                    <span>{appName}</span>
                  </button>
                )
              })}
            </div>
          )}

          {/* Categorized Products List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${selectedAppFilter}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4 mb-4"
            >
              {/* SECTION: Aplikasi (Grouped per Application) */}
              {(selectedCategory === 'all' || selectedCategory === 'aplikasi') && (
                <div className="flex flex-col gap-2.5">
                  {/* Category Header */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-sky-900 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-lg w-fit">
                      <Smartphone className="h-3.5 w-3.5 text-sky-600" />
                      <span>{t.pricelist.categories?.aplikasi || (isId ? 'Aplikasi' : 'Applications')}</span>
                      <span className="text-[10px] font-semibold text-sky-700 bg-sky-100/70 px-1.5 py-0.2 rounded ml-1">
                        {isId ? 'Garansi 50%' : '50% Guarantee'}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-neutral-400">
                      {selectedAppFilter === 'all'
                        ? (isId
                            ? `${appGroupNames.length} Aplikasi • ${appItems.length} Paket`
                            : `${appGroupNames.length} Apps • ${appItems.length} Packages`)
                        : (isId
                            ? `${appGroupsMap[selectedAppFilter]?.length || 0} Paket`
                            : `${appGroupsMap[selectedAppFilter]?.length || 0} Packages`)}
                    </span>
                  </div>

                  {/* Render Grouped App Cards */}
                  <div className="flex flex-col gap-3">
                    {appGroupNames
                      .filter(
                        (appName) =>
                          selectedAppFilter === 'all' || selectedAppFilter === appName
                      )
                      .map((appName) =>
                        renderAppGroupCard(appName, appGroupsMap[appName])
                      )}
                  </div>
                </div>
              )}

              {/* SECTION: Sewa Bot */}
              {(selectedCategory === 'all' || selectedCategory === 'sewa-bot') &&
                selectedAppFilter === 'all' && (
                  <div className="flex flex-col gap-2.5 pt-2 border-t border-neutral-100">
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-lg w-fit">
                        <Bot className="h-3.5 w-3.5 text-purple-600" />
                        <span>{t.pricelist.categories?.sewaBot || (isId ? 'Sewa Bot' : 'Bot Rental')}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-neutral-400">
                        {isId
                          ? `${botItems.length} Pilihan Durasi`
                          : `${botItems.length} Duration Options`}
                      </span>
                    </div>

                    {/* Bot Card with duration variants */}
                    <div className="rounded-2xl border-2 border-black/10 bg-neutral-50/80 p-3 sm:p-3.5 shadow-2xs">
                      <div className="mb-2.5 flex items-center justify-between border-b border-black/8 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white border border-black/10 shadow-2xs">
                            <Bot className="h-4 w-4 text-purple-600" />
                          </span>
                          <div>
                            <h4 className="text-xs sm:text-sm font-extrabold text-neutral-900 tracking-tight">
                              {isId ? 'Sewa Bot WhatsApp' : 'WhatsApp Bot Rental'}
                            </h4>
                            <span className="text-[10px] font-medium text-neutral-500">
                              {isId
                                ? 'Layanan sewa bot otomatis'
                                : 'Automated bot rental service'}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md">
                          {isId ? 'Aktivasi Cepat' : 'Fast Setup'}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {botItems.map((item) =>
                          renderVariantRow(item, isId ? 'Sewa Bot' : 'Bot Rental')
                        )}
                      </div>
                    </div>
                  </div>
                )}

              {/* SECTION: Lain-lain (hanya jika ada item) */}
              {selectedCategory === 'all' &&
                selectedAppFilter === 'all' &&
                otherItems.length > 0 && (
                  <div className="flex flex-col gap-2.5 pt-2 border-t border-neutral-100">
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded-lg w-fit">
                        <Sparkles className="h-3.5 w-3.5 text-neutral-600" />
                        <span>{t.pricelist.categories?.lainLain || (isId ? 'Lain-lain' : 'Others')}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-neutral-400">
                        {otherItems.length} {isId ? 'item' : 'items'}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {otherItems.map((item) => renderVariantRow(item))}
                    </div>
                  </div>
                )}
            </motion.div>
          </AnimatePresence>

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
            <span>
              {isFriday
                ? `${t.pricelist.bannerCta} (${isId ? 'Diskon 20%' : '20% OFF'})`
                : t.pricelist.bannerCta}
            </span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
