export interface GalleryPhoto {
  id: string
  image: string
  title?: string
  description?: string
  url?: string
}

export interface GalleryItem {
  id: string
  title: string
  photos: GalleryPhoto[]
}
