import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check, Share2, MessageCircle, Send, Twitter } from 'lucide-react'
import { useLanguage } from '../../../infrastructure/i18n/language-context'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  url: string
  onCopy: (url: string) => void
  isCopied: boolean
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  url,
  onCopy,
  isCopied,
}) => {
  const { t } = useLanguage()

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareChannels = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-[#25D366] text-white',
    },
    {
      name: 'Telegram',
      icon: Send,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-[#229ED9] text-white',
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'bg-black text-white',
    },
  ]

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        })
      } catch {
        // Ignored if cancelled
      }
    }
  }

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[480px] rounded-t-[32px] sm:rounded-[32px] border-2 border-black bg-white p-6 shadow-2xl text-black"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <h3 className="text-lg font-bold text-neutral-900 tracking-tight">
              {t.shareModal.title}
            </h3>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="h-5 w-5 text-neutral-500" />
            </button>
          </div>

          <div className="py-4">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              Judul
            </p>
            <p className="text-sm font-semibold text-neutral-800 line-clamp-2 mb-4 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
              {title}
            </p>

            {/* Copy Link Input */}
            <div className="flex items-center gap-2 rounded-full border-2 border-black p-1.5 pl-4 bg-neutral-50 shadow-neo-sm">
              <span className="text-xs text-neutral-600 truncate flex-1 font-mono">
                {url}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => onCopy(url)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                  isCopied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-black text-white hover:bg-neutral-800'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> {t.shareModal.copySuccess.includes('!') ? 'Tersalin' : 'Copied'}
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> {t.shareModal.copyBtn}
                  </>
                )}
              </motion.button>
            </div>

            {/* Social Share Buttons */}
            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {shareChannels.map((channel) => (
                <a
                  key={channel.name}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border border-black/10 transition-transform hover:-translate-y-0.5 ${channel.color}`}
                >
                  <channel.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{channel.name}</span>
                </a>
              ))}
            </div>

            {/* Native Share button if supported */}
            {typeof navigator !== 'undefined' && !!navigator.share && (
              <button
                onClick={handleNativeShare}
                className="mt-3 flex w-full items-center justify-center gap-2 py-2.5 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <Share2 className="h-4 w-4" /> {t.shareModal.nativeShare}
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body)
  }

  return modalContent
}
