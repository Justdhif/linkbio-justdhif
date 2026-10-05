import { Profile } from '../../domain/entities/profile.entity'

export const mockProfileData: Profile = {
  username: 'Justdhif',
  displayName: 'Justdhif store',
  displayStyledName: '𝗝υѕƚ𝗗𝗵ιƒ store',
  bio: 'thanks for supporting me, enjoyy my products',
  avatarHeroUrl: 'https://ugc.production.linktr.ee/df2d1ff6-2803-443f-901f-2c337105e580_quality-restoration-20261004085901755.png',
  isOpenOrder: true,
  statusText: 'Open Order • Menerima Pesanan',
  theme: {
    backgroundColor: '#346C4F',
    buttonBgColor: '#ffffff',
    buttonTextColor: '#000000',
    buttonBorderColor: '#000000',
    buttonShadowColor: '#000000',
    fontFamily: 'Albert Sans',
  },
  socials: [
    {
      platform: 'tiktok',
      url: 'https://www.tiktok.com/@justdhifbieber',
      label: 'TikTok @justdhifbieber',
    },
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/justdhif_',
      label: 'Instagram @justdhif_',
    },
    {
      platform: 'discord',
      url: 'https://discord.com/users/1223503242483466340',
      label: 'Discord Profile',
    },
  ],
  pricelist: [
    {
      id: 'price-1',
      name: 'Nomor Kosong WA',
      price: 'Start from 10k',
      note: 'Harga bisa berubah sewaktu-waktu',
      isPopular: false,
    },
    {
      id: 'price-2',
      name: 'Jasbug',
      price: '5k',
      note: 'Layanan jasa bug fast process',
      isPopular: false,
    },
    {
      id: 'price-3',
      name: 'Jasban',
      price: '20k',
      note: 'Layanan jasa banned terpercaya',
      isPopular: false,
    },
    {
      id: 'price-4',
      name: 'Murban',
      price: '50k',
      note: 'Paket murid / panduan lengkap',
      isPopular: false,
    },
    {
      id: 'price-5',
      name: 'AM Prem',
      price: '1k',
      note: 'Alight Motion Premium',
      isPopular: false,
    },
    {
      id: 'price-6',
      name: 'Joki Tugas',
      price: 'Start from 50k',
      note: 'Joki Makalah • Joki Tugas • Joki Web',
      badgeText: 'Full Revisi Sampai Puas',
      isPopular: false,
    },
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Bagaimana cara melakukan pemesanan?',
      answer: 'Cukup pilih layanan pada daftar Pricelist di atas atau klik tombol "order my products". Anda akan otomatis terhubung ke WhatsApp resmi admin dengan format pesanan yang siap dikirim.',
    },
    {
      id: 'faq-2',
      question: 'Metode pembayaran apa saja yang diterima?',
      answer: 'Kami menerima pembayaran melalui QRIS (bisa scan dari DANA, GoPay, OVO, ShopeePay, dan seluruh M-Banking), transfer Bank, serta SociaBuzz Tribe.',
    },
    {
      id: 'faq-3',
      question: 'Berapa lama estimasi pengerjaan pesanan?',
      answer: 'Proses pengerjaan menyesuaikan antrean. Catatan: Jika tidak ada kesibukan, pesanan akan diproses secepat mungkin!',
    },
    {
      id: 'faq-4',
      question: 'Apakah transaksi di Justdhif Store aman & bergaransi?',
      answer: 'Iya, transaksi 100% aman dan bergaransi! Karena kami baru memulai store ini, bukti transaksi memang belum terlalu banyak. Namun kamu bisa memantau bukti transaksi dan testimoni langsung di Saluran WhatsApp Testi kami melalui link di atas (atau klik tombol testi).',
    },
  ],
  links: [
    {
      id: 'link-1',
      title: 'paid edit by achimo',
      url: 'https://www.tiktok.com/@acyash_?_r=1&_t=ZS-9AGJIkH4ic0',
      type: 'classic',
      layout: 'featured',
      thumbnailUrl: 'https://ugc.production.linktr.ee/b771e888-1178-4737-97ef-4aebe9207e5e_WhatsApp-Image-2026-10-04-at-09.00.26.jpeg',
    },
    {
      id: 'link-3',
      title: 'testi',
      url: 'https://whatsapp.com/channel/0029VbDaoYe0wajpT6EOPx2b',
      type: 'classic',
      layout: 'stack',
      thumbnailUrl: 'https://ugc.production.linktr.ee/93789591-bf48-454b-b74c-44c1a0748b1f_rukeqTVNJDY.png',
    },
    {
      id: 'link-4',
      title: 'support',
      url: 'https://sociabuzz.com/justdhhif09/tribe',
      type: 'classic',
      layout: 'stack',
      thumbnailUrl: 'https://ugc.production.linktr.ee/687fc071-818f-4822-bc20-813340cd81c7_sociabuzz-logo.jpeg',
    },
  ],
  musicTrack: {
    id: 'track-1',
    title: '8 Letters',
    artist: "Why Don't We",
    audioUrl: '/audio/8-letters.mp3',
    coverUrl: '/images/8-letters-cover.jpg',
    spotifyUrl: 'https://open.spotify.com/track/6g1NlCpW7vohtQ1bQ87J4T',
  },
  galleries: [
    {
      id: 'gallery-wishlist-car',
      title: 'wishlist car',
      photos: [
        {
          id: 'photo-1',
          image: 'https://ugc.production.linktr.ee/e2348031-d10e-4f23-82a3-900a85ec64a5_WhatsApp-Image-2026-10-03-at-19.24.32.jpeg',
          title: 'BMW XM',
          description: 'High performance luxury SUV',
        },
        {
          id: 'photo-2',
          image: 'https://ugc.production.linktr.ee/1cbc53b8-d3d3-4603-bdfb-989db186e5b2_images.jfif.jpeg',
          title: 'Sports Edition',
          description: 'Dream garage collection',
        },
        {
          id: 'photo-3',
          image: 'https://ugc.production.linktr.ee/5da1daaa-6fef-4926-afe6-8a4375bce0d6_images--4-.jfif.jpeg',
          title: 'Supercar Spec',
          description: 'Aesthetic drive goals',
        },
      ],
    },
  ],
}
