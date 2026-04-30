// File: scripts/seed.js
// Tujuan file:
// - Menyisipkan data contoh ke koleksi `projects` dan `contacts` pada MongoDB.
// - Jalankan secara lokal setelah Anda menambahkan `MONGODB_URI` di file `.env.local`.
// Apa yang boleh Anda ubah:
// - Ubah data contoh di variabel `projectsSeed` dan `contactSeed` sesuai CV/portofolio Anda.

/*
  [PENTING]
  - Jangan menempelkan connection string/secret di chat.
  - Isi `.env.local` dengan: MONGODB_URI=yourConnectionString
  - Jalankan: `npm run seed` di folder proyek (PowerShell atau CMD).
*/

import dotenv from 'dotenv';
// Memuat environment dari .env.local jika ada (Next.js biasanya menggunakan .env.local)
dotenv.config({ path: '.env.local' });

// IMPORT DINAMIS berikut dijalankan setelah dotenv.config sehingga
// environment variable tersedia saat modul lain dieksekusi.
async function run() {
  // Validasi env
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('ERROR: Environment variable MONGODB_URI tidak ditemukan. Isi .env.local sebelum menjalankan seed.');
    process.exit(1);
  }

  // Import modul yang bergantung pada env secara dinamis
  const { default: connectMongo } = await import('../lib/mongoose.js');
  const { default: Project } = await import('../models/Project.js');
  const mongoose = (await import('mongoose')).default;

  try {
    await connectMongo();

    // Contoh data proyek — sesuaikan dengan isi CV Anda
    const projectsSeed = [
      {
        title: 'Mager Cinematic - Wedding Highlight',
        description: 'Highlight video pernikahan, color grading cinematic, story-driven edit.',
        category: 'video',
        media: [
          { url: '/profile.svg', mimeType: 'image/svg+xml', caption: 'Thumbnail', order: 0 }
        ],
        tags: ['wedding', 'cinematic', 'editing'],
        projectUrl: '',
        isFeatured: true
      },
      {
        title: 'Low-Code Dashboard for Retail',
        description: 'Aplikasi low-code untuk manajemen inventory dan laporan penjualan.',
        category: 'aplikasi',
        media: [],
        tags: ['low-code', 'dashboard'],
        projectUrl: '',
        isFeatured: false
      },
      {
        title: 'Portfolio Shoot - Surabaya',
        description: 'Sesi fotografi portrait komersial untuk brand lokal di Surabaya.',
        category: 'fotografi',
        media: [],
        tags: ['portrait', 'commercial'],
        projectUrl: '',
        isFeatured: false
      }
    ];

    // Contoh data kontak
    const contactSeed = {
      name: 'Contoh Pengirim',
      email: 'contoh@example.com',
      message: 'Halo Ricky, ini pesan contoh dari seed script.'
    };

    // Hapus data existing (opsional) - beri perhatian sebelum menggunakan di production
    console.log('Menghapus data Project lama (jika ada)...');
    await Project.deleteMany({});

    console.log('Menyisipkan data contoh ke collection projects...');
    const created = await Project.insertMany(projectsSeed);
    console.log(`Inserted ${created.length} projects.`);

    // Simpan contact menggunakan model lokal (sederhana)
    const Contact = mongoose.models.Contact || mongoose.model('Contact', new mongoose.Schema({ name: String, email: String, message: String }, { timestamps: true }));
    console.log('Menyisipkan contoh pesan kontak...');
    const savedContact = await Contact.create(contactSeed);
    console.log('Contact saved:', savedContact._id.toString());

    console.log('Seed selesai. Tutup koneksi.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    try { await mongoose.disconnect(); } catch (e) {}
    process.exit(1);
  }
}

run();
