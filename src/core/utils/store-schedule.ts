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
}

/**
 * Helper to compute live store status based on Jakarta time (WIB / UTC+7)
 */
export function getJakartaLiveStatus(customDate?: Date): StoreLiveSchedule {
  // Use current time or custom date
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

  // 1. Weekend Logic
  // "untuk weekend close tetep nerima pesanan tetapi di proses nya pas hari senin nya"
  if (isWeekend) {
    return {
      status: 'weekend_closed',
      label: 'Weekend Close • Order Diproses Senin',
      subtext: 'Bebas order sekarang, pesanan akan diproses mulai Senin pagi',
      dotColorClass: 'bg-purple-500',
      pingColorClass: 'bg-purple-400',
      badgeBgClass: 'bg-purple-950/40',
      borderClass: 'border-purple-300/30',
      canOrder: true,
      nextScheduleText: 'Buka kembali Senin 07:00 WIB',
    }
  }

  // 2. Night Close Logic (All Weekdays: Monday - Friday)
  // "close dari jam 9 malam (21:00) sampai jam 7 pagi (07:00)"
  // Range: 21:00 (1260 mins) to 23:59 (1439 mins) OR 00:00 (0 mins) to 06:59 (419 mins)
  if (currentTotalMinutes >= 21 * 60 || currentTotalMinutes < 7 * 60) {
    return {
      status: 'closed',
      label: 'Closed • Istirahat Malam',
      subtext: 'Buka kembali jam 07:00 WIB pagi. Chat/order tetap diterima!',
      dotColorClass: 'bg-rose-500',
      badgeBgClass: 'bg-rose-950/40',
      borderClass: 'border-rose-400/30',
      canOrder: true,
      nextScheduleText: 'Buka kembali jam 07:00 WIB',
    }
  }

  // 3. Prayer Breaks (Break Time: Zuhur, Ashar, Maghrib)
  // Zuhur: 12:00 - 13:00 (720 - 780)
  // Ashar: 15:15 - 15:45 (915 - 945)
  // Maghrib: 18:00 - 18:45 (1080 - 1125)
  const isZuhurBreak = currentTotalMinutes >= 12 * 60 && currentTotalMinutes < 13 * 60
  const isAsharBreak = currentTotalMinutes >= 15 * 60 + 15 && currentTotalMinutes < 15 * 60 + 45
  const isMaghribBreak = currentTotalMinutes >= 18 * 60 && currentTotalMinutes < 18 * 60 + 45

  if (isZuhurBreak || isAsharBreak || isMaghribBreak) {
    let prayerName = 'Istirahat'
    if (isZuhurBreak) prayerName = 'Istirahat & Sholat Zuhur'
    else if (isAsharBreak) prayerName = 'Istirahat & Sholat Ashar'
    else if (isMaghribBreak) prayerName = 'Istirahat & Sholat Maghrib'

    return {
      status: 'break',
      label: `Break • ${prayerName}`,
      subtext: 'Rehat sejenak. Pesanan akan segera direspon setelah rehat',
      dotColorClass: 'bg-amber-400',
      pingColorClass: 'bg-amber-300',
      badgeBgClass: 'bg-amber-950/40',
      borderClass: 'border-amber-300/30',
      canOrder: true,
      nextScheduleText: 'Segera kembali aktif',
    }
  }

  // 4. Busy Logic (Sibuk / Slow Response)
  // Senin: "dari setelah istirahat siang (13:00) sampai istirahat maghrib (18:00)"
  // (Pengecualian: saat waktu Ashar di jam 15:15 - 15:45 sudah ditangkap oleh blok Break di atas)
  if (isMonday && currentTotalMinutes >= 13 * 60 && currentTotalMinutes < 18 * 60) {
    return {
      status: 'busy',
      label: 'Sibuk • Slow Response',
      subtext: 'Sedang ada aktivitas/antrean, pesan akan dibalas bertahap',
      dotColorClass: 'bg-yellow-400',
      pingColorClass: 'bg-yellow-300',
      badgeBgClass: 'bg-yellow-950/40',
      borderClass: 'border-yellow-300/30',
      canOrder: true,
      nextScheduleText: 'Respon normal setelah Maghrib',
    }
  }

  // Selasa - Jumat: "dari jam 7 atau buka (07:00) sampai sebelum istirahat siang (12:00)"
  if (isTueToFri && currentTotalMinutes >= 7 * 60 && currentTotalMinutes < 12 * 60) {
    return {
      status: 'busy',
      label: 'Sibuk • Slow Response',
      subtext: 'Aktivitas pagi/sekolah, pesan akan dibalas secara berkala',
      dotColorClass: 'bg-yellow-400',
      pingColorClass: 'bg-yellow-300',
      badgeBgClass: 'bg-yellow-950/40',
      borderClass: 'border-yellow-300/30',
      canOrder: true,
      nextScheduleText: 'Fast Response setelah istirahat siang',
    }
  }

  // 5. Normal Open / Fast Response
  // Waktu lainnya selama weekdays di jam buka (misal: Senin pagi 07:00-12:00, Selasa-Jumat siang/sore & malam 18:45-21:00)
  return {
    status: 'open',
    label: 'Open Order • Fast Response',
    subtext: 'Admin aktif melayani dan siap memproses pesanan kilat',
    dotColorClass: 'bg-emerald-400',
    pingColorClass: 'bg-emerald-400',
    badgeBgClass: 'bg-black/35',
    borderClass: 'border-emerald-400/30',
    canOrder: true,
    nextScheduleText: 'Buka sampai 21:00 WIB',
  }
}
