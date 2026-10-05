import React from 'react'
import { motion } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'
import { SocialLink } from '../../../domain/entities/store-features.entity'
import { LiveStatusBadge } from './LiveStatusBadge'
import { SocialIconsBar } from './SocialIconsBar'

interface ProfileHeaderProps {
  styledName: string
  plainName: string
  bio: string
  isOpenOrder?: boolean
  statusText?: string
  socials?: SocialLink[]
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  styledName,
  plainName,
  bio,
  isOpenOrder = true,
  statusText,
  socials = [],
}) => {
  return (
    <div className="relative z-10 px-6 text-center mt-0 sm:mt-1" id="profile-title">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-center justify-center"
      >
        {/* Title with styling & verified check */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          <h1
            aria-label={plainName}
            className="text-[2rem] sm:text-[2.35rem] font-bold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] select-text leading-tight"
          >
            {styledName}
          </h1>
          <span title="Verified Creator" className="text-white inline-flex items-center">
            <BadgeCheck className="h-6 w-6 text-white fill-white/20" />
          </span>
        </div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-1.5 max-w-[420px] text-sm sm:text-base font-normal sm:font-medium text-white/95 leading-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
        >
          {bio}
        </motion.p>

        {/* Live Status Badge */}
        <div className="mt-2.5">
          <LiveStatusBadge isOpen={isOpenOrder} statusText={statusText} />
        </div>

        {/* Social Icons Bar (TikTok, Instagram, Discord) */}
        {socials.length > 0 && <SocialIconsBar socials={socials} />}
      </motion.div>
    </div>
  )
}
