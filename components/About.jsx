// File: components/About.jsx
// Tujuan file:
// - Menampilkan ringkasan tentang Ricky (lokasi, pendidikan, background multimedia).
// Apa yang boleh Anda ubah:
// - Edit teks ringkasan, tambahkan link, atau ubah styling Tailwind sesuai preferensi.

import React from 'react';

export default function About() {
  return (
    <section className="mt-12 py-10">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Tentang Saya</h2>
      <p className="mt-4 text-slate-700 dark:text-slate-300 max-w-3xl">
        Saya, Ricky Hidayat dari Surabaya, Jawa Timur. Latar belakang S1 Teknik Informatika
        (Universitas Dr. Soetomo) dengan pengalaman multimedia. Saat ini bekerja sebagai
        Low-Code Developer dan Professional Photographer/Videographer di Mager Cinematic.
      </p>
    </section>
  );
}
