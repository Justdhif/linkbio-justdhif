import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Info, X, Moon, Coffee, Hourglass, Calendar } from 'lucide-react'
import { getJakartaLiveStatus, StoreLiveSchedule } from '../../../core/utils/store-schedule'
import {
  PrayerTimes,
  fetchJakartaPrayerTimes,
  DEFAULT_JAKARTA_PRAYER_TIMES,
} from '../../../core/services/prayer-times.service'
import { useLanguage } from '../../../infrastructure/i18n/language-context'

interface LiveStatusBadgeProps {
  isOpen?: boolean
  statusText?: string
}

export const LiveStatusBadge: React.FC<LiveStatusBadgeProps> = () => {
  const { language, t } = useLanguage()
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>(DEFAULT_JAKARTA_PRAYER_TIMES)
  const [schedule, setSchedule] = useState<StoreLiveSchedule>(() =>
    getJakartaLiveStatus(new Date(), language, DEFAULT_JAKARTA_PRAYER_TIMES)
  )
  const [showModal, setShowModal] = useState(false)
  const [timeFormatted, setTimeFormatted] = useState('')
  const [dateFormatted, setDateFormatted] = useState('')

  // 1. Fetch dynamic prayer times for Jakarta on mount
  useEffect(() => {
    let isMounted = true
    fetchJakartaPrayerTimes().then((data) => {
      if (isMounted) {
        setPrayerTimes(data)
        setSchedule(getJakartaLiveStatus(new Date(), language, data))
      }
    })
    return () => {
      isMounted = false
    }
  }, [language])

  // 2. Real-time 1s ticking clock & schedule evaluation
  useEffect(() => {
    const updateRealtimeClock = () => {
      const now = new Date()
      setSchedule(getJakartaLiveStatus(now, language, prayerTimes))

      // 24-hour Jakarta time with seconds (e.g. 15:24:08)
      const timeStr = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      setTimeFormatted(timeStr)

      const dateStr = now.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
        timeZone: 'Asia/Jakarta',
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
      setDateFormatted(dateStr)
    }

    updateRealtimeClock()
    const interval = setInterval(updateRealtimeClock, 1000)
    return () => clearInterval(interval)
  }, [language, prayerTimes])

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
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {/* Status Pill */}
        <motion.button
          type="button"
          onClick={() => setShowModal(true)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3 }}
          title={language === 'id' ? 'Klik untuk melihat jadwal operasional store' : 'Click to view store schedule'}
          className={`inline-flex items-center gap-2 rounded-full border ${schedule.borderClass} ${schedule.badgeBgClass} px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md shadow-xs cursor-pointer transition-colors hover:bg-black/50 select-none`}
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
        </motion.button>

        {/* Real-Time Live Clock Pill */}
        <motion.button
          type="button"
          onClick={() => setShowModal(true)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          title={language === 'id' ? 'Waktu Real-time Jakarta (WIB) • Klik untuk info' : 'Real-time Jakarta Time (WIB) • Click for info'}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md shadow-xs cursor-pointer transition-colors hover:bg-black/55 select-none group"
        >
          <Clock className="h-3.5 w-3.5 text-emerald-400 group-hover:rotate-45 transition-transform" />
          <span className="font-mono font-bold tracking-wider text-white">
            {timeFormatted || '--:--:--'}
          </span>
          <span className="rounded-md bg-white/15 px-1 py-0.2 text-[10px] font-extrabold text-white/80">
            WIB
          </span>
        </motion.button>
      </div>

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
                  className="relative z-10 w-full max-w-sm rounded-[24px] border-2 border-black bg-white p-5 text-black shadow-neo max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-white">
                        <Clock className="h-4 w-4" />
                      </span>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-black">
                        {t.scheduleModal.title}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-black transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Real-Time Digital Clock Hero Card */}
                  <div className="mt-3.5 rounded-2xl border-2 border-black bg-neutral-950 p-4 text-white shadow-neo-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-6 -mt-6 h-24 w-24 rounded-full bg-emerald-500/15 blur-xl pointer-events-none" />

                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                        </span>
                        <span>{t.scheduleModal.liveClockTitle}</span>
                      </div>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-mono font-bold text-neutral-300 border border-white/10">
                        UTC+7
                      </span>
                    </div>

                    {/* Big Digital Clock Display */}
                    <div className="flex items-baseline gap-2 my-1">
                      <span className="text-3xl sm:text-4xl font-black font-mono tracking-wider text-white select-text">
                        {timeFormatted || '--:--:--'}
                      </span>
                      <span className="text-sm font-extrabold text-emerald-400 font-mono">
                        WIB
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-1">
                      <span>{dateFormatted}</span>
                      <span className="text-[10px] text-neutral-500 italic">
                        Jakarta, Indonesia
                      </span>
                    </div>
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

                  {/* Dynamic Prayer Times Schedule Card (Live Kemenag API) */}
                  <div className="mt-3 rounded-xl border border-amber-500/30 bg-amber-50/70 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                        <Coffee className="h-3.5 w-3.5 text-amber-600" />
                        <span>{t.scheduleModal.prayerScheduleTitle}</span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100/90 border border-amber-300/60 px-2 py-0.5 rounded-full">
                        {t.scheduleModal.prayerApiSource}
                      </span>
                    </div>

                    {/* Prayer Times 5-Col Grid */}
                    <div className="grid grid-cols-5 gap-1 text-center">
                      {[
                        { label: 'Subuh', time: prayerTimes.subuh },
                        { label: 'Dzuhur', time: prayerTimes.dzuhur },
                        { label: 'Ashar', time: prayerTimes.ashar },
                        { label: 'Maghrib', time: prayerTimes.maghrib },
                        { label: 'Isya', time: prayerTimes.isya },
                      ].map((p) => (
                        <div
                          key={p.label}
                          className="p-1.5 rounded-lg border border-amber-200/80 bg-white/90 shadow-2xs"
                        >
                          <span className="block text-[10px] font-bold text-neutral-500">
                            {p.label}
                          </span>
                          <span className="block text-[11px] sm:text-xs font-mono font-extrabold text-neutral-900 mt-0.5">
                            {p.time}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="mt-2 text-[10.5px] text-amber-900 leading-relaxed font-medium">
                      * {t.scheduleModal.prayerBreakDesc}
                    </p>
                  </div>

                  {/* Weekly Rules Overview */}
                  <div className="mt-3 space-y-2 text-xs">
                    <div className="rounded-lg bg-neutral-50 p-2.5 border border-neutral-100">
                      <p className="font-bold text-neutral-800 flex items-center gap-1.5">
                        <Moon className="h-3.5 w-3.5 text-neutral-700" />
                        <span>{t.scheduleModal.nightCloseTitle}</span>
                      </p>
                      <p className="text-[11px] text-neutral-600 pl-5">{t.scheduleModal.nightCloseDesc}</p>
                    </div>

                    <div className="rounded-lg bg-neutral-50 p-2.5 border border-neutral-100">
                      <p className="font-bold text-neutral-800 flex items-center gap-1.5">
                        <Hourglass className="h-3.5 w-3.5 text-amber-500" />
                        <span>{t.scheduleModal.busyTitle}</span>
                      </p>
                      <div className="text-[11px] text-neutral-600 pl-5 space-y-1">
                        <div>
                          <span className="font-semibold text-neutral-800">{t.scheduleModal.busyMonday}</span>
                          <span className="text-[10px] text-neutral-500 block">
                            (Break otomatis saat Ashar ~{prayerTimes.ashar} WIB)
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-neutral-800">{t.scheduleModal.busyTueFri}</span>
                          <span className="text-[10px] text-neutral-500 block">
                            (Break otomatis saat Dzuhur ~{prayerTimes.dzuhur} WIB)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-purple-50 p-2.5 border border-purple-100">
                      <p className="font-bold text-purple-900 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-purple-700" />
                        <span>{t.scheduleModal.weekendTitle}</span>
                      </p>
                      <p className="text-[11px] text-purple-800 pl-5">
                        {t.scheduleModal.weekendDesc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-1 text-[11px] text-neutral-500">
                    <Info className="h-3.5 w-3.5" />
                    <span>{t.scheduleModal.footerNote}</span>
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
