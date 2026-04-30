// File: app/page.jsx
// Tujuan file:
// - Halaman utama yang merender `Hero`, mem-fetch proyek via API, dan menampilkan portfolio.
// Apa yang boleh Anda ubah:
// - Ubah urutan komponen atau teks default; modifikasi cara fetch jika ingin SSR/CSR berbeda.

import React from 'react';

import Hero from '../components/Hero';
import About from '../components/About';
import PortfolioGrid from '../components/PortfolioGrid';
import projects from '../data/projects.json';

/*
  [CATATAN] Halaman utama sekarang menggunakan data statis dari `data/projects.json`.
  Ini membuat website dapat live tanpa konfigurasi MongoDB.
*/

export default function Page() {
  return (
    <div>
      <Hero />
      <div className="max-w-6xl mx-auto px-6">
        <About />
        <PortfolioGrid projects={projects} />
      </div>
    </div>
  );
}
