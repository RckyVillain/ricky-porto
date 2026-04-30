// File: lib/mongoose.js
// Tujuan file:
// - Menangani koneksi tunggal ke MongoDB menggunakan Mongoose.
// - Cocok untuk environment serverless seperti Vercel (menghindari koneksi ganda).
// Apa yang boleh Anda ubah:
// - Jika ingin menggunakan nama variabel environment lain, ubah `process.env.MONGODB_URI`.
// - Untuk opsi koneksi tambahan (poolSize, tls, dll.) tambahkan pada objek opsi `mongoose.connect(uri, options)`.

/*
  [FUNGSI: connectMongo]
  - Mengatur dan mengembalikan koneksi Mongoose yang di-cache.
  - Pada Vercel (serverless), file ini mencegah pembuatan koneksi berulang
    dengan menyimpan state pada objek global.
*/

import mongoose from 'mongoose';

// Pastikan Anda menyetel environment variable MONGODB_URI di Vercel atau .env.local
const MONGODB_URI = process.env.MONGODB_URI || null;

// Cache connection untuk lingkungan serverless
// [CATATAN] Jangan ubah nama property ini kecuali Anda tahu risikonya.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// [FUNGSI: connectMongo] - Menghubungkan ke MongoDB dan mengembalikan instance koneksi
export async function connectMongo() {
  if (!MONGODB_URI) {
    // Pada deploy tanpa MongoDB, jalankan fallback statis.
    console.warn('Warning: MONGODB_URI tidak disetel, MongoDB connection skipped.');
    return null;
  }

  // Jika sudah ada koneksi, kembalikan langsung
  if (cached.conn) {
    // [INFORMASI] Koneksi sudah ada dalam cache (menghindari reconnect pada serverless)
    return cached.conn;
  }

  // Jika belum ada promise koneksi, buat satu
  if (!cached.promise) {
    const opts = {
      // Opsi default yang aman untuk Next.js + Mongoose
      // Ubah opsi di sini jika Anda membutuhkan konfigurasi khusus
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // serverSelectionTimeoutMS: 5000, // contoh: batasi waktu seleksi server
    };

    // [FUNGSI: Inisialisasi koneksi baru] - Membuat promise koneksi
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    }).catch(err => {
      // Jika koneksi gagal, hapus promise agar percobaan berikutnya bisa mencoba lagi
      cached.promise = null;
      throw err;
    });
  }

  // Tunggu promise dan simpan conn pada cache
  cached.conn = await cached.promise;
  return cached.conn;
}

// Ekspor default (opsional) untuk konsistensi import
export default connectMongo;
