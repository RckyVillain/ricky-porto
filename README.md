# Ricky Hidayat — Portofolio (Next.js + Tailwind + MongoDB)

Proyek ini adalah template portofolio personal untuk Ricky Hidayat.

Instruksi singkat untuk menjalankan lokal:

1. Salin file contoh environment dan isi `MONGODB_URI`:

```bash
cp .env.local.example .env.local
# lalu edit .env.local dengan credential MongoDB Anda
```

2. Install dependensi dan jalankan development server:

```bash
npm install
npm run dev
```

3. Buka http://localhost:3000

Deploy ke Vercel:
- Login ke Vercel, import project dari GitHub (atau upload manual).
- Tambahkan Environment Variable `MONGODB_URI` pada Settings Project.
- Build command: `npm run build`, Output dir: (default). Vercel mendeteksi Next.js otomatis.

Catatan:
- Ganti file `public/profile.svg` dengan foto asli Anda (`public/profile.svg` atau ubah path di `Hero.jsx`).
- Semua file API ada di `app/api/*` dan menggunakan `lib/mongoose.js` untuk koneksi MongoDB.
