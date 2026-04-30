// File: models/Project.js
// Tujuan file:
// - Mendefinisikan skema Mongoose untuk koleksi "projects".
// - Gunakan model ini untuk menyimpan metadata proyek fotografi, video, atau aplikasi low-code.
// Apa yang boleh Anda ubah:
// - Tambahkan/ubah field sesuai kebutuhan (mis. menambah field `client`, `location`, dll.).
// - Ubah tipe data atau tambahkan validasi jika perlu.

/*
  Skema `Project` (contoh field):
  - title: judul karya
  - description: deskripsi singkat
  - category: fotografi / video / aplikasi
  - media: array objek yang menyimpan URL gambar/video dan tipe
  - tags: tag untuk filtering
  - projectUrl: link ke halaman detail atau repositori
  - isFeatured: flag untuk menyorot proyek di halaman utama
*/

import mongoose from 'mongoose';

const { Schema } = mongoose;

// [DEFINISI SKEMA: ProjectSchema]
const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      // [CATATAN] Ubah maxlength jika butuh judul lebih panjang
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
    },
    // kategori: fotografi, video, aplikasi, dsb.
    category: {
      type: String,
      required: true,
      enum: ['fotografi', 'video', 'aplikasi', 'lainnya'],
      default: 'lainnya',
    },
    // media: array dengan informasi file (URL, tipe, caption)
    media: [
      new Schema(
        {
          url: { type: String, required: true },
          mimeType: { type: String },
          caption: { type: String },
          // urut tampil untuk galeri
          order: { type: Number, default: 0 },
        },
        { _id: false }
      ),
    ],
    tags: [String],
    // link eksternal atau halaman detail
    projectUrl: { type: String },
    // Untuk memudahkan sorting/penonjolan
    isFeatured: { type: Boolean, default: false },
    // Optional: referensi ke user/owner di masa depan
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true, // menambahkan createdAt dan updatedAt otomatis
  }
);

// [PENTING] Hindari mendefinisikan model berkali-kali saat hot-reload
// Jika model sudah ada (pada lingkungan dev), gunakan yang sudah ada
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default Project;
