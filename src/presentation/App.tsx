import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useProfile } from './hooks/use-profile'
import { useClipboard } from './hooks/use-clipboard'
import { TopBar } from './components/common/TopBar'
import { TopographicBackground } from './components/common/TopographicBackground'
import { HeroAvatar } from './components/header/HeroAvatar'
import { ProfileHeader } from './components/header/ProfileHeader'
import { LinkList } from './components/links/LinkList'
import { ShareModal } from './components/common/ShareModal'
import { Toast } from './components/common/Toast'
import { Footer } from './components/footer/Footer'
import { LinkItem } from '../domain/entities/link.entity'
import { Loader2 } from 'lucide-react'

export const App: React.FC = () => {
  const { profile, isLoading, error } = useProfile()
  const { copy, isCopied } = useClipboard()

  const [shareModalState, setShareModalState] = useState<{
    isOpen: boolean
    title: string
    url: string
  }>({
    isOpen: false,
    title: '',
    url: '',
  })

  const [toastMessage, setToastMessage] = useState<string>('')
  const [showToast, setShowToast] = useState<boolean>(false)

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 2500)
  }

  const handleShareProfile = () => {
    if (!profile) return
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://justdhif.bio'
    setShareModalState({
      isOpen: true,
      title: `${profile.displayStyledName} | Official Bio Link`,
      url: currentUrl,
    })
  }

  const handleShareLink = (link: LinkItem) => {
    setShareModalState({
      isOpen: true,
      title: link.title,
      url: link.url,
    })
  }

  const handleCopy = async (url: string) => {
    const success = await copy(url)
    if (success) {
      triggerToast('Tautan berhasil disalin!')
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#346C4F] text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        >
          <Loader2 className="h-8 w-8 text-white/80" />
        </motion.div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#346C4F] p-4 text-white">
        <p className="text-lg font-semibold">Gagal memuat profil</p>
        <p className="text-sm text-white/70">{error}</p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full bg-[#28533d] sm:bg-[#234b37] font-sans antialiased selection:bg-white selection:text-black flex justify-center items-start sm:py-8 sm:px-4 overflow-hidden">
      {/* Outer Wallpaper Topographic Pattern for Desktop/Wide screens */}
      <TopographicBackground opacity="opacity-15" />

      {/* Toast Notification */}
      <Toast isVisible={showToast} message={toastMessage} />

      {/* Desktop Framed Profile Container */}
      <main className="relative w-full max-w-[580px] min-h-screen sm:min-h-0 sm:rounded-[36px] bg-[#346C4F] shadow-2xl overflow-hidden sm:border sm:border-white/10 flex flex-col justify-between">
        {/* Topographic Contour Curves Wallpaper */}
        <TopographicBackground opacity="opacity-35" />

        {/* TopBar attached nicely inside the card header */}
        <TopBar onShareClick={handleShareProfile} />

        <div className="flex flex-col relative z-10">
          {/* Hero Avatar Header */}
          <HeroAvatar
            imageUrl={profile.avatarHeroUrl}
            alt={profile.displayName}
          />

          {/* Profile Header (Name & Bio) positioned right over the organic fade */}
          <ProfileHeader
            styledName={profile.displayStyledName}
            plainName={profile.displayName}
            bio={profile.bio}
          />

          {/* Links & Gallery Container */}
          <div className="mt-4 sm:mt-5 relative z-10">
            <LinkList
              links={profile.links}
              galleries={profile.galleries}
              musicTrack={profile.musicTrack}
              onShareLink={handleShareLink}
            />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={shareModalState.isOpen}
        onClose={() => setShareModalState((prev) => ({ ...prev, isOpen: false }))}
        title={shareModalState.title}
        url={shareModalState.url}
        onCopy={handleCopy}
        isCopied={isCopied}
      />
    </div>
  )
}

export default App
