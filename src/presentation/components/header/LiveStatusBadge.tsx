import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Info, X, Moon, Coffee, Hourglass, Calendar } from 'lucide-react'
import { getJakartaLiveStatus, StoreLiveSchedule } from '../../../core/utils/store-schedule'

interface LiveStatusBadgeProps {
  isOpen?: boolean
  statusText?: string
}

export const LiveStatusBadge: React.FC<LiveStatusBadgeProps> = () => {
  const [schedule, setSchedule] = useState<StoreLiveSchedule>(() => getJakartaLiveStatus())
  const [showModal, setShowModal] = useState(false)
  const [currentTimeWIB, setCurrentTimeWIB] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setSchedule(getJakartaLiveStatus(now))
      setCurrentTimeWIB(
        now.toLocaleTimeString('id-ID', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
        }) + ' WIB'
      )
    }

    updateTime()
    // Update every 30 seconds to catch schedule changes promptly
    const interval = setInterval(updateTime, 30000)
    return () => clearInterval(interval)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [showModal])

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setShowModal(true)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.3 }}
        title="Klik untuk melihat jadwal operasional store"
        className={`inline-flex items-center gap-2 rounded-full border ${schedule.borderClass} ${schedule.badgeBgClass} px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-xs cursor-pointer transition-colors hover:bg-black/50 select-none`}
      >
        {/* Pulsing Dot */}
        <span className="relative flex h-2.5 w-2.5">
          {schedule.pingColorClass && (
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full ${schedule.pingColorClass} opacity-75`}
            />
          )}
          <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${schedule.dotColorClass}`} />
        </span>

        <span className="tracking-wide text-white/95">{schedule.label}</span>
        <Clock className="h-3 w-3 text-white/60 ml-0.5" />
      </motion.button>

      {/* Detail Schedule Modal via Portal */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {showModal && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowModal(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="relative z-10 w-full max-w-sm rounded-[24px] border-2 border-black bg-white p-5 text-black shadow-neo"
                >
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-white">
                        <Clock className="h-4 w-4" />
                      </span>
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-black">
                          Jadwal Operasional
                        </h4>
                        <p className="text-[11px] text-neutral-500 font-medium">Waktu Sekarang: {currentTimeWIB}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-black transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Status Now Banner */}
                  <div className="mt-3.5 rounded-xl border border-neutral-200 bg-neutral-50 p-3">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${schedule.dotColorClass}`} />
                      <span className="text-xs font-bold text-neutral-900">{schedule.label}</span>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-neutral-600">
                      {schedule.subtext}
                    </p>
                  </div>

                  {/* Weekly Rules Overview */}
                  <div className="mt-3.5 space-y-2 text-xs">
                    <div className="rounded-lg bg-neutral-50 p-2.5 border border-neutral-100">
                      <p className="font-bold text-neutral-800 flex items-center gap-1.5">
                        <Moon className="h-3.5 w-3.5 text-neutral-700" />
                        <span>Jam Istirahat Malam (Tutup)</span>
                      </p>
                      <p className="text-[11px] text-neutral-600 pl-5">Setiap Hari: 21:00 – 07:00 WIB</p>
                    </div>

                    <div className="rounded-lg bg-neutral-50 p-2.5 border border-neutral-100">
                      <p className="font-bold text-neutral-800 flex items-center gap-1.5">
                        <Coffee className="h-3.5 w-3.5 text-amber-600" />
                        <span>Jam Istirahat & Sholat</span>
                      </p>
                      <p className="text-[11px] text-neutral-600 pl-5">Zuhur (12:00–13:00) • Ashar (15:15–15:45) • Maghrib (18:00–18:45)</p>
                    </div>

                    <div className="rounded-lg bg-neutral-50 p-2.5 border border-neutral-100">
                      <p className="font-bold text-neutral-800 flex items-center gap-1.5">
                        <Hourglass className="h-3.5 w-3.5 text-amber-500" />
                        <span>Jam Sibuk (Slow Response)</span>
                      </p>
                      <p className="text-[11px] text-neutral-600 pl-5">
                        <span className="font-semibold">Senin:</span> 13:00 – 18:00 WIB<br />
                        <span className="font-semibold">Selasa – Jumat:</span> 07:00 – 12:00 WIB
                      </p>
                    </div>

                    <div className="rounded-lg bg-purple-50 p-2.5 border border-purple-100">
                      <p className="font-bold text-purple-900 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-purple-700" />
                        <span>Weekend (Sabtu & Minggu)</span>
                      </p>
                      <p className="text-[11px] text-purple-800 pl-5">
                        Bebas order kapan pun! Semua pesanan weekend akan mulai diproses pada hari Senin.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-1 text-[11px] text-neutral-500">
                    <Info className="h-3.5 w-3.5" />
                    <span>Format waktu WIB (Waktu Indonesia Barat / Jakarta)</span>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}
