export interface PricelistItem {
  id: string
  name: string
  price: string
  category?: 'aplikasi' | 'sewa-bot' | 'lain-lain' | string
  appGroup?: string
  variantName?: string
  note?: string
  isPopular?: boolean
  badgeText?: string
}

export interface SocialLink {
  platform: 'tiktok' | 'instagram' | 'discord'
  url: string
  label: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}
