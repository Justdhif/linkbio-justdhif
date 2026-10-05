import {
  PrayerTimes,
  timeToMinutes,
  DEFAULT_JAKARTA_PRAYER_TIMES,
} from '../services/prayer-times.service'

export type StoreStatusType = 'open' | 'busy' | 'break' | 'closed' | 'weekend_closed'

export interface StoreLiveSchedule {
  status: StoreStatusType
  label: string
  subtext: string
  dotColorClass: string
  pingColorClass?: string
  badgeBgClass: string
  borderClass: string
  canOrder: boolean
  nextScheduleText?: string
  activePrayerName?: string
}

/**
 * Helper to compute live store status based on Jakarta time (WIB / UTC+7) and dynamic prayer times
 */
export function getJakartaLiveStatus(
  customDate?: Date,
  lang: 'id' | 'en' = 'id',
  prayerTimes: PrayerTimes = DEFAULT_JAKARTA_PRAYER_TIMES
): StoreLiveSchedule {
  const now = customDate || new Date()

  // Convert to Jakarta / WIB (UTC+7)
  const jakartaTimeString = now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
  const jakartaDate = new Date(jakartaTimeString)

  const dayOfWeek = jakartaDate.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hours = jakartaDate.getHours()
  const minutes = jakartaDate.getMinutes()
  const currentTotalMinutes = hours * 60 + minutes

  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6 // Saturday or Sunday
  const isMonday = dayOfWeek === 1
  const isTueToFri = dayOfWeek >= 2 && dayOfWeek <= 5
  const isEn = lang === 'en'

  // 1. Weekend Logic
  if (isWeekend) {
    return {
      status: 'weekend_closed',
      label: isEn ? 'Weekend Close • Processed on Monday' : 'Weekend Close • Order Diproses Senin',
      subtext: isEn
        ? 'Feel free to order now, processing starts Monday morning'
        : 'Bebas order sekarang, pesanan akan diproses mulai Senin pagi',
      dotColorClass: 'bg-purple-500',
      pingColorClass: 'bg-purple-400',
      badgeBgClass: 'bg-purple-950/40',
      borderClass: 'border-purple-300/30',
      canOrder: true,
      nextScheduleText: isEn ? 'Reopens Monday 07:00 AM WIB' : 'Buka kembali Senin 07:00 WIB',
    }
  }

  // 2. Night Close Logic (All Weekdays: Monday - Friday, 21:00 - 07:00 WIB)
  if (currentTotalMinutes >= 21 * 60 || currentTotalMinutes < 7 * 60) {
    return {
      status: 'closed',
      label: isEn ? 'Closed • Night Rest' : 'Closed • Istirahat Malam',
      subtext: isEn
        ? 'Reopening at 07:00 AM WIB. Orders/chats are still accepted!'
        : 'Buka kembali jam 07:00 WIB pagi. Chat/order tetap diterima!',
      dotColorClass: 'bg-rose-500',
      badgeBgClass: 'bg-rose-950/40',
      borderClass: 'border-rose-400/30',
      canOrder: true,
      nextScheduleText: isEn ? 'Reopens at 07:00 AM WIB' : 'Buka kembali jam 07:00 WIB',
    }
  }

  // 3. Dynamic Prayer Breaks (Based on real Kemenag Jakarta API timings)
  // Break window: from azan time until ~35-45 minutes after azan
  const dzuhurMinutes = timeToMinutes(prayerTimes.dzuhur)
  const asharMinutes = timeToMinutes(prayerTimes.ashar)
  const maghribMinutes = timeToMinutes(prayerTimes.maghrib)
  const isyaMinutes = timeToMinutes(prayerTimes.isya)

  const isZuhurBreak = currentTotalMinutes >= dzuhurMinutes && currentTotalMinutes < dzuhurMinutes + 45
  const isAsharBreak = currentTotalMinutes >= asharMinutes && currentTotalMinutes < asharMinutes + 40
  const isMaghribBreak = currentTotalMinutes >= maghribMinutes && currentTotalMinutes < maghribMinutes + 40
  const isIsyaBreak = currentTotalMinutes >= isyaMinutes && currentTotalMinutes < isyaMinutes + 35

  if (isZuhurBreak || isAsharBreak || isMaghribBreak || isIsyaBreak) {
    let prayerName = ''
    if (isZuhurBreak) prayerName = isEn ? `Dhuhr (${prayerTimes.dzuhur})` : `Dzuhur (${prayerTimes.dzuhur})`
    else if (isAsharBreak) prayerName = isEn ? `Asr (${prayerTimes.ashar})` : `Ashar (${prayerTimes.ashar})`
    else if (isMaghribBreak) prayerName = isEn ? `Maghrib (${prayerTimes.maghrib})` : `Maghrib (${prayerTimes.maghrib})`
    else if (isIsyaBreak) prayerName = isEn ? `Isha (${prayerTimes.isya})` : `Isya (${prayerTimes.isya})`

    return {
      status: 'break',
      label: isEn ? `Break • ${prayerName} Prayer` : `Break • Sholat ${prayerName}`,
      subtext: isEn
        ? 'Taking a short rest & prayer break. Orders will be responded to shortly.'
        : 'Rehat sejenak & ibadah sholat. Pesanan akan segera direspon setelah rehat.',
      dotColorClass: 'bg-amber-400',
      pingColorClass: 'bg-amber-300',
      badgeBgClass: 'bg-amber-950/40',
      borderClass: 'border-amber-300/30',
      canOrder: true,
      nextScheduleText: isEn ? 'Back shortly' : 'Segera kembali aktif',
      activePrayerName: prayerName,
    }
  }

  // 4. Busy Logic (Sibuk / Slow Response)
  if (isMonday && currentTotalMinutes >= 13 * 60 && currentTotalMinutes < 18 * 60) {
    return {
      status: 'busy',
      label: isEn ? 'Busy • Slow Response' : 'Sibuk • Slow Response',
      subtext: isEn
        ? 'Currently active / in queue, messages will be answered gradually'
        : 'Sedang ada aktivitas/antrean, pesan akan dibalas bertahap',
      dotColorClass: 'bg-yellow-400',
      pingColorClass: 'bg-yellow-300',
      badgeBgClass: 'bg-yellow-950/40',
      borderClass: 'border-yellow-300/30',
      canOrder: true,
      nextScheduleText: isEn ? 'Normal response after Maghrib' : 'Respon normal setelah Maghrib',
    }
  }

  if (isTueToFri && currentTotalMinutes >= 7 * 60 && currentTotalMinutes < 12 * 60) {
    return {
      status: 'busy',
      label: isEn ? 'Busy • Slow Response' : 'Sibuk • Slow Response',
      subtext: isEn
        ? 'Morning activities / school, replies will be sent periodically'
        : 'Aktivitas pagi/sekolah, pesan akan dibalas secara berkala',
      dotColorClass: 'bg-yellow-400',
      pingColorClass: 'bg-yellow-300',
      badgeBgClass: 'bg-yellow-950/40',
      borderClass: 'border-yellow-300/30',
      canOrder: true,
      nextScheduleText: isEn ? 'Fast Response after lunch break' : 'Fast Response setelah istirahat siang',
    }
  }

  // 5. Normal Open / Fast Response
  return {
    status: 'open',
    label: isEn ? 'Open Order • Fast Response' : 'Open Order • Fast Response',
    subtext: isEn
      ? 'Admin is active and ready for fast processing'
      : 'Admin aktif melayani dan siap memproses pesanan kilat',
    dotColorClass: 'bg-emerald-400',
    pingColorClass: 'bg-emerald-400',
    badgeBgClass: 'bg-black/35',
    borderClass: 'border-emerald-400/30',
    canOrder: true,
    nextScheduleText: isEn ? 'Open until 09:00 PM WIB' : 'Buka sampai 21:00 WIB',
  }
}
