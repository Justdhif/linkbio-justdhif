import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Repeat, Zap } from 'lucide-react'
import { MusicTrack } from '../../../domain/entities/music.entity'
import { useLanguage } from '../../../infrastructure/i18n/language-context'

interface MusicPlayerWidgetProps {
  track: MusicTrack
}

export const MusicPlayerWidget: React.FC<MusicPlayerWidgetProps> = ({ track }) => {
  const { t } = useLanguage()
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [isLooping, setIsLooping] = useState<boolean>(true)
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('justdhif_autoplay')
      return stored !== 'false'
    }
    return true
  })

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const userPausedRef = useRef<boolean>(false)

  // Autoplay handler with fallback for browser autoplay policies
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // If autoplay is disabled by user, don't attempt
    if (!isAutoPlay) return

    const tryPlay = () => {
      if (userPausedRef.current) return
      audio
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          // Browser prevented autoplay before interaction, wait for user gesture
        })
    }

    // 1. Try immediate autoplay
    tryPlay()

    // 2. Fallback: play on the very first user interaction anywhere on the page
    const handleFirstInteraction = () => {
      if (!userPausedRef.current && audio.paused && isAutoPlay) {
        tryPlay()
      }
      removeListeners()
    }

    const removeListeners = () => {
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
      window.removeEventListener('scroll', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }

    window.addEventListener('click', handleFirstInteraction, { passive: true })
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true })
    window.addEventListener('scroll', handleFirstInteraction, { passive: true })
    window.addEventListener('keydown', handleFirstInteraction, { passive: true })

    return () => {
      removeListeners()
    }
  }, [isAutoPlay])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      userPausedRef.current = true // user explicitly paused, keep paused
    } else {
      userPausedRef.current = false
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio autoplay prevented:', err))
    }
  }

  const toggleLoop = () => {
    setIsLooping((prev) => !prev)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlay((prev) => {
      const next = !prev
      if (typeof window !== 'undefined') {
        localStorage.setItem('justdhif_autoplay', String(next))
      }
      return next
    })
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleEnded = () => {
    if (isLooping && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    } else {
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="relative w-full rounded-[28px] border-2 border-black bg-white p-4 sm:p-5 shadow-neo transition-shadow duration-200 hover:shadow-neo-lg text-black"
    >
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={track.audioUrl}
        loop={isLooping}
        autoPlay={isAutoPlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="auto"
      />

      {/* Header Row: Cover + Info + Spotify Link */}
      <div className="flex items-center gap-3.5 sm:gap-4">
        {/* Animated Vinyl Cover: pauses in place without spinning backwards */}
        <div className="relative flex-shrink-0">
          <div
            className="relative h-14 w-14 sm:h-16 sm:w-16 overflow-hidden rounded-full border-2 border-black bg-neutral-900 shadow-md animate-[spin_8s_linear_infinite]"
            style={{
              animationPlayState: isPlaying ? 'running' : 'paused',
            }}
          >
            <img
              src={track.coverUrl}
              alt={track.title}
              className="h-full w-full object-cover"
            />
            {/* Center vinyl hole */}
            <div className="absolute inset-0 m-auto h-4 w-4 rounded-full border-2 border-white/60 bg-neutral-900" />
          </div>
        </div>

        {/* Track Title & Artist */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2">
            <h4 className="text-base sm:text-lg font-bold text-neutral-900 truncate">
              {track.title}
            </h4>
            {/* Equalizer Soundwave Indicator */}
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-3.5 flex-shrink-0">
                <span className="w-1 bg-emerald-600 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3.5" />
                <span className="w-1 bg-emerald-600 rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-2" />
                <span className="w-1 bg-emerald-600 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-3" />
              </div>
            )}
          </div>
          <p className="text-xs sm:text-sm font-medium text-neutral-500 truncate mt-0.5">
            {track.artist}
          </p>
        </div>


      </div>

      {/* Audio Progress Slider with clear played vs unplayed distinction */}
      <div className="mt-4 flex flex-col gap-1.5">
        <div className="relative w-full h-3 flex items-center group cursor-pointer">
          {/* Base Track (Unplayed: light gray) */}
          <div className="w-full h-1.5 rounded-full bg-neutral-200 overflow-hidden">
            {/* Filled Track (Played: solid black with sharp contrast) */}
            <div
              className="h-full bg-black rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Invisible interactive range input for scrubbing */}
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            aria-label="Seek audio position"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />

          {/* Thumb Knob indicator with clear white outline */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-black border-2 border-white shadow-md pointer-events-none transition-transform group-hover:scale-125"
            style={{ left: `${Math.min(Math.max(progressPercent, 0), 100)}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] font-mono text-neutral-500 select-none">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls Bar: Play / Pause + Loop Toggle + Autoplay Toggle + Mute */}
      <div className="mt-2.5 flex items-center justify-between pt-1 border-t border-neutral-100">
        <div className="flex items-center gap-2">
          {/* Play/Pause Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="flex items-center gap-2 rounded-full border-2 border-black bg-black px-4 py-1.5 text-xs font-bold text-white shadow-neo-sm transition-transform hover:bg-neutral-800"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 fill-white" />
                <span>{t.musicPlayer.pause}</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-white" />
                <span>{t.musicPlayer.play}</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Mode Controls: Autoplay + Loop + Mute */}
        <div className="flex items-center gap-1.5">
          {/* Auto-Play Toggle */}
          <button
            onClick={toggleAutoPlay}
            title={isAutoPlay ? t.musicPlayer.autoPlayTitleOn : t.musicPlayer.autoPlayTitleOff}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all border ${
              isAutoPlay
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 shadow-xs'
                : 'bg-neutral-100 text-neutral-400 border-neutral-200 hover:text-neutral-700'
            }`}
          >
            <Zap className={`h-3.5 w-3.5 ${isAutoPlay ? 'fill-emerald-600' : ''}`} />
            <span className="text-[11px] font-mono">Auto</span>
          </button>

          {/* Auto-Loop Toggle */}
          <button
            onClick={toggleLoop}
            title={isLooping ? t.musicPlayer.loopTitleOn : t.musicPlayer.loopTitleOff}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all border ${
              isLooping
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 shadow-xs'
                : 'bg-neutral-100 text-neutral-400 border-neutral-200 hover:text-neutral-700'
            }`}
          >
            <Repeat className="h-3.5 w-3.5" />
            <span className="text-[11px] font-mono">Loop</span>
          </button>

          {/* Mute Toggle */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? t.musicPlayer.unmute : t.musicPlayer.mute}
            title={isMuted ? t.musicPlayer.unmute : t.musicPlayer.mute}
            className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-black"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-red-500" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
