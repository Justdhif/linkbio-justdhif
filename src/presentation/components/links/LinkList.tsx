import React from 'react'
import { motion } from 'framer-motion'
import { LinkItem } from '../../../domain/entities/link.entity'
import { GalleryItem } from '../../../domain/entities/gallery.entity'
import { MusicTrack } from '../../../domain/entities/music.entity'
import { FeaturedCard } from './FeaturedCard'
import { ClassicButton } from './ClassicButton'
import { GalleryWidget } from './GalleryWidget'
import { MusicPlayerWidget } from './MusicPlayerWidget'

interface LinkListProps {
  links: LinkItem[]
  galleries: GalleryItem[]
  musicTrack?: MusicTrack
  onShareLink: (link: LinkItem) => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

export const LinkList: React.FC<LinkListProps> = ({
  links,
  galleries,
  musicTrack,
  onShareLink,
}) => {
  const featuredLinks = links.filter((l) => l.layout === 'featured')
  const classicLinks = links.filter((l) => l.layout === 'stack')

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-3.5 sm:gap-4 px-4 pb-12 w-full max-w-[580px] mx-auto z-10"
    >
      {/* 1. Interactive Music Player Widget (Di Atas Card Paid Edit) */}
      {musicTrack && <MusicPlayerWidget track={musicTrack} />}

      {/* 2. Featured Cards (TikTok Portfolio & WhatsApp Order) */}
      {featuredLinks.map((link) => (
        <FeaturedCard key={link.id} link={link} onShareClick={onShareLink} />
      ))}

      {/* 3. Classic Links (Testi & Support) */}
      {classicLinks.map((link) => (
        <ClassicButton key={link.id} link={link} onShareClick={onShareLink} />
      ))}

      {/* 4. Interactive Extension Galleries (wishlist car) */}
      {galleries.map((gallery) => (
        <GalleryWidget key={gallery.id} gallery={gallery} />
      ))}
    </motion.div>
  )
}
