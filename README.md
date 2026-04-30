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
- Tambahkan Environment Variable `MONGODB_URI` pada Settings Project jika ingin menyimpan data ke MongoDB.
- Jika tidak pakai MongoDB, website tetap dapat live karena proyek menggunakan data statis sebagai fallback.
- Build command: `npm run build`, Output dir: (default). Vercel mendeteksi Next.js otomatis.

Catatan:
- Ganti file `public/profile.svg` dengan foto asli Anda (`public/profile.svg` atau ubah path di `Hero.jsx`).
- Semua file API ada di `app/api/*`. `app/api/projects` dapat menggunakan MongoDB jika tersedia, atau fallback ke data statis.
