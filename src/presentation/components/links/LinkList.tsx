import React from 'react'
import { motion } from 'framer-motion'
import { LinkItem } from '../../../domain/entities/link.entity'
import { GalleryItem } from '../../../domain/entities/gallery.entity'
import { MusicTrack } from '../../../domain/entities/music.entity'
import { PricelistItem, FaqItem } from '../../../domain/entities/store-features.entity'
import { ClassicButton } from './ClassicButton'
import { GalleryWidget } from './GalleryWidget'
import { MusicPlayerWidget } from './MusicPlayerWidget'
import { ProductsBannerCard } from './ProductsBannerCard'
import { AchimoBannerCard } from './AchimoBannerCard'
import { FaqAccordion } from './FaqAccordion'

interface LinkListProps {
  links: LinkItem[]
  galleries: GalleryItem[]
  musicTrack?: MusicTrack
  pricelist?: PricelistItem[]
  faqs?: FaqItem[]
  onShareLink: (link: LinkItem) => void
  onNavigateToProducts: () => void
  onNavigateToAchimo: () => void
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
  pricelist = [],
  faqs = [],
  onShareLink,
  onNavigateToProducts,
  onNavigateToAchimo,
}) => {
  const classicLinks = links.filter((l) => l.layout === 'stack')

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-3.5 sm:gap-4 px-4 pb-12 w-full max-w-[580px] mx-auto z-10"
    >
      {/* 1. Interactive Music Player Widget */}
      {musicTrack && <MusicPlayerWidget track={musicTrack} />}

      {/* 2. Paid Edit by Achimoo Banner Card (Click to open Dedicated Price List) */}
      <AchimoBannerCard onNavigate={onNavigateToAchimo} />

      {/* 3. Products Banner Card (Click to open Dedicated Products Page) */}
      {pricelist.length > 0 && (
        <ProductsBannerCard
          onNavigateToProducts={onNavigateToProducts}
        />
      )}

      {/* 4. Classic Links (Testi & Support) */}
      {classicLinks.map((link) => (
        <ClassicButton key={link.id} link={link} onShareClick={onShareLink} />
      ))}

      {/* 5. Interactive Extension Galleries (wishlist car) */}
      {galleries.map((gallery) => (
        <GalleryWidget key={gallery.id} gallery={gallery} />
      ))}

      {/* 6. FAQ Accordion */}
      {faqs.length > 0 && <FaqAccordion items={faqs} />}
    </motion.div>
  )
}
