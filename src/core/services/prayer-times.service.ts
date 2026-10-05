export interface PrayerTimes {
  subuh: string
  dzuhur: string
  ashar: string
  maghrib: string
  isya: string
  date: string
}

export const DEFAULT_JAKARTA_PRAYER_TIMES: PrayerTimes = {
  subuh: '04:18',
  dzuhur: '11:41',
  ashar: '14:44',
  maghrib: '17:47',
  isya: '18:56',
  date: new Date().toISOString().split('T')[0],
}

/**
 * Converts a "HH:mm" time string into total minutes from midnight
 */
export function timeToMinutes(timeStr: string): number {
  if (!timeStr) return 0
  const [h, m] = timeStr.split(':').map((val) => parseInt(val, 10))
  return (h || 0) * 60 + (m || 0)
}

/**
 * Converts total minutes from midnight to "HH:mm"
 */
export function minutesToTime(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60) % 24
  const m = totalMinutes % 60
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
}

/**
 * Fetches dynamic prayer times for Jakarta (WIB) using free public APIs
 * Primary: Aladhan API (Method 20 = Kemenag RI)
 * Fallback 1: MyQuran API
 * Fallback 2: Default Kemenag schedule
 * Caches in localStorage for the day to avoid redundant network calls.
 */
export async function fetchJakartaPrayerTimes(): Promise<PrayerTimes> {
  const todayKey = new Date().toISOString().split('T')[0]
  const cacheKey = `justdhif_prayer_times_${todayKey}`

  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        const parsed: PrayerTimes = JSON.parse(cached)
        if (parsed && parsed.date === todayKey && parsed.dzuhur) {
          return parsed
        }
      }
    } catch {
      // Ignore localStorage read error
    }
  }

  // 1. Primary: Aladhan API with Kemenag Method (Method 20)
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(
      'https://api.aladhan.com/v1/timingsByCity?city=Jakarta&country=Indonesia&method=20',
      { signal: controller.signal }
    )
    clearTimeout(timeoutId)

    if (response.ok) {
      const json = await response.json()
      const timings = json?.data?.timings
      if (timings && timings.Dhuhr && timings.Asr) {
        const data: PrayerTimes = {
          subuh: timings.Fajr?.slice(0, 5) || DEFAULT_JAKARTA_PRAYER_TIMES.subuh,
          dzuhur: timings.Dhuhr?.slice(0, 5) || DEFAULT_JAKARTA_PRAYER_TIMES.dzuhur,
          ashar: timings.Asr?.slice(0, 5) || DEFAULT_JAKARTA_PRAYER_TIMES.ashar,
          maghrib: timings.Maghrib?.slice(0, 5) || DEFAULT_JAKARTA_PRAYER_TIMES.maghrib,
          isya: timings.Isha?.slice(0, 5) || DEFAULT_JAKARTA_PRAYER_TIMES.isya,
          date: todayKey,
        }

        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(cacheKey, JSON.stringify(data))
          } catch {
            // Ignore localStorage quota error
          }
        }
        return data
      }
    }
  } catch (err) {
    console.warn('Aladhan Prayer Times API fetch skipped or failed:', err)
  }

  // 2. Secondary Fallback: MyQuran API (Kemenag Jakarta: Code 1301)
  try {
    const [y, m, d] = todayKey.split('-')
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)

    const response = await fetch(
      `https://api.myquran.com/v2/sholat/jadwal/1301/${y}/${m}/${d}`,
      { signal: controller.signal }
    )
    clearTimeout(timeoutId)

    if (response.ok) {
      const json = await response.json()
      const jadwal = json?.data?.jadwal
      if (jadwal && jadwal.dzuhur) {
        const data: PrayerTimes = {
          subuh: jadwal.subuh?.slice(0, 5) || DEFAULT_JAKARTA_PRAYER_TIMES.subuh,
          dzuhur: jadwal.dzuhur?.slice(0, 5) || DEFAULT_JAKARTA_PRAYER_TIMES.dzuhur,
          ashar: jadwal.ashar?.slice(0, 5) || DEFAULT_JAKARTA_PRAYER_TIMES.ashar,
          maghrib: jadwal.maghrib?.slice(0, 5) || DEFAULT_JAKARTA_PRAYER_TIMES.maghrib,
          isya: jadwal.isya?.slice(0, 5) || DEFAULT_JAKARTA_PRAYER_TIMES.isya,
          date: todayKey,
        }

        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(cacheKey, JSON.stringify(data))
          } catch {}
        }
        return data
      }
    }
  } catch {
    // Ignore fallback network error
  }

  // 3. Fallback to default schedule
  return { ...DEFAULT_JAKARTA_PRAYER_TIMES, date: todayKey }
}
