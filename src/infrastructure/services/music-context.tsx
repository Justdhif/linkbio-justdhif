import React, { createContext, useContext, useState, useRef, useEffect } from 'react'
import { MusicTrack } from '../../domain/entities/music.entity'

interface MusicContextType {
  track: MusicTrack | null
  setTrack: (track: MusicTrack | null) => void
  isPlaying: boolean
  currentTime: number
  duration: number
  isMuted: boolean
  isLooping: boolean
  isAutoPlay: boolean
  togglePlay: () => void
  toggleLoop: () => void
  toggleAutoPlay: () => void
  toggleMute: () => void
  seek: (time: number) => void
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [track, setTrack] = useState<MusicTrack | null>(null)
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

  // Ensure audio element exists in memory
  useEffect(() => {
    if (!audioRef.current && typeof window !== 'undefined') {
      const audio = new Audio()
      audio.preload = 'auto'
      audioRef.current = audio

      audio.onplay = () => setIsPlaying(true)
      audio.onpause = () => setIsPlaying(false)
      audio.ontimeupdate = () => setCurrentTime(audio.currentTime)
      audio.onloadedmetadata = () => setDuration(audio.duration || 0)
      audio.onended = () => {
        if (audio.loop) {
          audio.currentTime = 0
          audio.play().catch(() => {})
        } else {
          setIsPlaying(false)
          setCurrentTime(0)
        }
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [])

  // Update audio source when track changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !track?.audioUrl) return

    // If source is different, update
    const currentSrc = audio.src ? new URL(audio.src, window.location.origin).pathname : ''
    const targetSrc = track.audioUrl.startsWith('http')
      ? track.audioUrl
      : new URL(track.audioUrl, window.location.origin).pathname

    if (currentSrc !== targetSrc && audio.src !== track.audioUrl) {
      audio.src = track.audioUrl
      audio.loop = isLooping
      audio.muted = isMuted
      audio.load()

      if (isAutoPlay && !userPausedRef.current) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {})
      }
    }
  }, [track, isLooping, isMuted, isAutoPlay])

  // Autoplay fallback with user interaction detection
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !track) return
    if (!isAutoPlay) return

    const tryPlay = () => {
      if (userPausedRef.current) return
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {})
    }

    tryPlay()

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

    return () => removeListeners()
  }, [track, isAutoPlay])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      userPausedRef.current = true
    } else {
      userPausedRef.current = false
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio playback error:', err))
    }
  }

  const toggleLoop = () => {
    setIsLooping((prev) => {
      const next = !prev
      if (audioRef.current) {
        audioRef.current.loop = next
      }
      return next
    })
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

  const toggleMute = () => {
    if (audioRef.current) {
      const nextMuted = !isMuted
      audioRef.current.muted = nextMuted
      setIsMuted(nextMuted)
    }
  }

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  return (
    <MusicContext.Provider
      value={{
        track,
        setTrack,
        isPlaying,
        currentTime,
        duration,
        isMuted,
        isLooping,
        isAutoPlay,
        togglePlay,
        toggleLoop,
        toggleAutoPlay,
        toggleMute,
        seek,
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}

export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider')
  }
  return context
}
