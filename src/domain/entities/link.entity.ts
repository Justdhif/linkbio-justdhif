export type LinkLayout = 'featured' | 'stack'

export type LinkType = 'classic' | 'gallery'

export interface LinkItem {
  id: string
  title: string
  url: string
  type: LinkType
  layout: LinkLayout
  thumbnailUrl?: string
  badgeText?: string
  subtitle?: string
  isPinned?: boolean
}
