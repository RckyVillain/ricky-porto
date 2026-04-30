// File: scripts/seed.cjs
// Tujuan file:
// - Menyisipkan data contoh ke koleksi `projects` dan `contacts` pada MongoDB.
// - Jalankan secara lokal setelah Anda menambahkan `MONGODB_URI` di file `.env.local`.

const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const connectMongo = require('../lib/mongoose');
const Project = require('../models/Project');
const mongoose = require('mongoose');

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('ERROR: Environment variable MONGODB_URI tidak ditemukan. Isi .env.local sebelum menjalankan seed.');
    process.exit(1);
  }

  try {
    await connectMongo();

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

    console.log('Menghapus data Project lama (jika ada)...');
    await Project.deleteMany({});

    console.log('Menyisipkan data contoh ke collection projects...');
    const created = await Project.insertMany(projectsSeed);
    console.log(`Inserted ${created.length} projects.`);

    const Contact = mongoose.models.Contact || mongoose.model('Contact', new mongoose.Schema({ name: String, email: String, message: String }, { timestamps: true }));
    console.log('Menyisipkan contoh pesan kontak...');
    const savedContact = await Contact.create({ name: 'Contoh Pengirim', email: 'contoh@example.com', message: 'Halo Ricky, ini pesan contoh dari seed script.' });
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
