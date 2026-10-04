# Linktree Justdhif Rebuild (React + TypeScript + Framer Motion)

Proyek ini merekonstruksi tampilan dan fungsionalitas dari [linktr.ee/Justdhif](https://linktr.ee/Justdhif) dengan arsitektur bersih (**Clean Architecture**), visual neo-brutalisme halus khas Linktree, serta transisi interaktif bertenaga **Framer Motion**.

---

## 🏗️ Pola Arsitektur (Clean Architecture)

Proyek ini mengadopsi prinsip Clean Architecture (Domain-Driven & Dependency Inversion) untuk memisahkan domain bisnis, logika aplikasi, dan layer presentasi secara terstruktur:

```
src/
├── core/                         # Shared utilities & styling helper
│   └── utils/
│       └── cn.ts                 # Classname utility (clsx + tailwind-merge)
│
├── domain/                       # Core Enterprise Entities & Contracts (Bebas framework)
│   ├── entities/
│   │   ├── profile.entity.ts     # Definisi Profile, Theme, Bio
│   │   ├── link.entity.ts        # Definisi LinkItem, layout, tipe
│   │   └── gallery.entity.ts     # Definisi Gallery & Wishlist Car
│   └── repositories/
│       └── profile.repository.ts # Kontrak interface IProfileRepository
│
├── application/                  # Use Cases (Logika Bisnis Aplikasi)
│   └── use-cases/
│       ├── get-profile.use-case.ts
│       ├── copy-link.use-case.ts
│       └── share-profile.use-case.ts
│
├── infrastructure/               # Data Sources & Browser Services
│   ├── data/
│   │   └── profile.mock.ts       # Data otentik live dari Linktree @Justdhif
│   ├── repositories/
│   │   └── static-profile.repository.ts # Implementasi IProfileRepository
│   └── services/
│       ├── clipboard.service.ts  # Layanan clipboard dengan fallback
│       └── share.service.ts      # Layanan Web Share API
│
└── presentation/                 # UI Framework Layer (React + Framer Motion)
    ├── hooks/
    │   ├── use-profile.ts        # Hook pengelolaan data profil
    │   └── use-clipboard.ts      # Hook state penyalinan link
    ├── components/
    │   ├── common/
    │   │   ├── TopBar.tsx        # Floating glass top navigation
    │   │   ├── ShareModal.tsx    # Modal berbagi tautan interaktif
    │   │   └── Toast.tsx         # Notifikasi toast berhasil salin
    │   ├── header/
    │   │   ├── HeroAvatar.tsx    # Hero avatar dengan radial gradient mask fade
    │   │   └── ProfileHeader.tsx # Judul toko & bio
    │   ├── links/
    │   │   ├── FeaturedCard.tsx  # Card besar dengan thumbnail video/gambar (TikTok & WA Order)
    │   │   ├── ClassicButton.tsx # Tombol pill neo-brutalist (Testi, Donasi, Spotify)
    │   │   ├── GalleryWidget.tsx # Ekstensi interaktif "wishlist car" dengan modal lightbox
    │   │   └── LinkList.tsx      # Staggered animated link list
    │   └── footer/
    │       └── Footer.tsx        # Branding badge
    ├── App.tsx
    ├── main.tsx
    └── index.css
```

---

## ✨ Fitur & Detail Desain yang Direplikasi

1. **Avatar Mode: HERO**: Foto header vertikal besar dengan efek fading gradien melingkar (*radial mask*) yang menyatu mulus ke warna background `#346C4F`.
2. **Neo-Brutalist Soft Styling**: Tombol berlatar belakang putih dengan border tegas 2px hitam dan hard shadow `3px 4px 0 #000000`, bentuk rounded-full (*pill*).
3. **Featured Card**: Pratinjau poster video/gambar berukuran luas untuk link prioritas tinggi ("paid edit by achimo" dan "order my products").
4. **Interactive Car Wishlist Extension**: Galeri foto mobil impian (BMW XM, dll.) yang dapat diklik untuk membuka foto modal lightbox dengan navigasi next/prev.
5. **Interactive Share System**: Fitur salin link, toast feedback, dan opsi berbagi langsung ke WhatsApp, Telegram, X (Twitter), atau Web Share API.
6. **Animasi Halus Framer Motion**: Entrance stagger, hover elevation, spring tap feedback, dan fluid modal transitions.

---

## 🚀 Menjalankan Proyek

```bash
# Menjalankan local dev server
npm run dev

# Membangun produksi
npm run build

# Menjalankan preview hasil build
npm run preview
```
