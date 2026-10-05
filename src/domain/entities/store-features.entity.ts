export interface PricelistItem {
  id: string
  name: string
  price: string
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
