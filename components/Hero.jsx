// File: components/Hero.jsx
// Tujuan file:
// - Komponen `Hero` untuk halaman depan portofolio Ricky Hidayat.
// - Menampilkan nama, lokasi, profesi, pendidikan singkat, dan tombol aksi (lihat CV / hubungi).
// Apa yang boleh Anda ubah:
// - Ubah teks (nama, lokasi, profesi, pendidikan) sesuai isi CV asli.
// - Ganti gambar profil pada `public/profile.jpg` atau ubah path `src` jika menyimpan di lokasi lain.
// - Ubah warna dan spacing melalui Tailwind classes atau tambahkan CSS khusus di `styles/`.

import React from 'react';

/*
  [CATATAN KOMPONEN]
  - Komponen ini menggunakan Tailwind CSS.
  - Untuk kustomisasi warna utama, ubah konfigurasi Tailwind (`tailwind.config.js`) dan kelas utility di sini.
*/

export default function Hero() {
  return (
    <section className="bg-white dark:bg-slate-900">
      {/* Kontainer utama hero */}
      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-10">

        {/* Kiri: teks profil */}
        <div className="flex-1">
          {/* Judul utama: nama */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {/* [DATA: Nama] - Ganti jika perlu lewat file ini atau props */}
            Ricky Hidayat
          </h1>

          {/* Subjudul: profesi & lokasi */}
          <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
            {/* [DATA: Profesi & Lokasi] */}
            Low-Code Developer & Professional Photographer/Videographer (Mager Cinematic) — Surabaya, Jawa Timur
          </p>

          {/* Pendidikan singkat */}
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            {/* [DATA: Pendidikan] */}
            S1 Teknik Informatika (Universitas Dr. Soetomo) · Background Multimedia
          </p>

          {/* Ringkasan singkat / CTA */}
          <p className="mt-6 text-slate-700 dark:text-slate-300 max-w-2xl">
            {/* Placeholder ringkasan yang bisa diganti sesuai CV Anda. */}
            Saya menggabungkan keahlian low-code development dengan pengalaman multimedia untuk
            membangun solusi cepat dan estetis—serta mengerjakan proyek fotografi & videografi
            profesional di Mager Cinematic.
          </p>

          {/* Tombol aksi: Lihat CV / Kontak */}
          <div className="mt-8 flex flex-wrap gap-4">
            {/* Tombol lihat CV */}
            <a
              href="/Ricky_Hidayat_CV.pdf"
              className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lihat CV
            </a>

            {/* Tombol hubungi (anchor ke section contact) */}
            <a
              href="#contact"
              className="inline-block border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 py-2 px-4 rounded-md"
            >
              Hubungi Saya
            </a>
          </div>
        </div>

        {/* Kanan: gambar profil / hero image */}
        <div className="w-60 h-60 sm:w-72 sm:h-72 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
          {/*
            Ganti file gambar pada `public/profile.jpg`.
            Jika ingin gambar berbentuk lingkaran, ubah kelas Tailwind ke `rounded-full`.
          */}
          <img
            src="/profile.svg"
            alt="Foto Ricky Hidayat"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
