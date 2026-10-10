import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react'
import { useMusic } from '../../../infrastructure/services/music-context'
import { useLanguage } from '../../../infrastructure/i18n/language-context'

export const MiniAudioController: React.FC = () => {
  const { track, isPlaying, isMuted, togglePlay, toggleMute } = useMusic()
  const { t } = useLanguage()
  const [showTooltip, setShowTooltip] = useState(false)

  if (!track) return null

  return (
    <div className="relative flex items-center pointer-events-auto">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={isPlaying ? t.musicPlayer.pause : t.musicPlayer.play}
        className={`flex items-center gap-1.5 px-2.5 h-10 rounded-2xl backdrop-blur-md border shadow-md transition-all text-xs font-bold ${
          isPlaying
            ? 'bg-black/35 text-white border-white/30'
            : 'bg-black/20 text-white/70 border-white/15 hover:text-white'
        }`}
      >
        {isPlaying ? (
          <div className="flex items-center gap-1">
            <span className="flex items-end gap-0.5 h-3 flex-shrink-0">
              <span className="w-0.5 bg-emerald-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
              <span className="w-0.5 bg-emerald-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-1.5" />
              <span className="w-0.5 bg-emerald-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2.5" />
            </span>
            <Pause className="h-3.5 w-3.5 text-white ml-0.5" />
          </div>
        ) : (
          <Play className="h-3.5 w-3.5 text-white/90" />
        )}

        <span className="hidden min-[380px]:inline max-w-[80px] sm:max-w-[110px] truncate text-[11px] font-medium">
          {track.title}
        </span>
      </motion.button>

      {/* Quick Mute Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMute}
        aria-label={isMuted ? t.musicPlayer.unmute : t.musicPlayer.mute}
        className="ml-1 flex h-10 w-8 items-center justify-center rounded-2xl bg-black/20 hover:bg-black/35 text-white/80 hover:text-white backdrop-blur-md border border-white/20 shadow-md transition-colors"
      >
        {isMuted ? (
          <VolumeX className="h-3.5 w-3.5 text-red-400" />
        ) : (
          <Volume2 className="h-3.5 w-3.5 text-white/80" />
        )}
      </motion.button>

      {/* Floating Tooltip info */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute top-12 left-0 z-50 pointer-events-none rounded-xl bg-neutral-900/95 text-white px-3 py-1.5 text-[11px] backdrop-blur-md border border-white/10 shadow-xl whitespace-nowrap flex items-center gap-1.5"
          >
            <Music className="h-3 w-3 text-emerald-400" />
            <span className="font-semibold">{track.title}</span>
            <span className="text-white/60">• {track.artist}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
