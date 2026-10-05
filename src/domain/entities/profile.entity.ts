import { LinkItem } from './link.entity'
import { GalleryItem } from './gallery.entity'
import { MusicTrack } from './music.entity'
import { PricelistItem, SocialLink, FaqItem } from './store-features.entity'

export interface ProfileTheme {
  backgroundColor: string
  buttonBgColor: string
  buttonTextColor: string
  buttonBorderColor: string
  buttonShadowColor: string
  fontFamily: string
}

export interface Profile {
  username: string
  displayName: string
  displayStyledName: string
  bio: string
  avatarHeroUrl: string
  theme: ProfileTheme
  isOpenOrder?: boolean
  statusText?: string
  socials?: SocialLink[]
  pricelist?: PricelistItem[]
  faqs?: FaqItem[]
  links: LinkItem[]
  galleries: GalleryItem[]
  musicTrack?: MusicTrack
}
