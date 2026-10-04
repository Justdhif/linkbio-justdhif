import { LinkItem } from './link.entity'
import { GalleryItem } from './gallery.entity'
import { MusicTrack } from './music.entity'

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
  links: LinkItem[]
  galleries: GalleryItem[]
  musicTrack?: MusicTrack
}
