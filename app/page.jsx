// File: app/page.jsx
// Tujuan file:
// - Halaman utama yang merender `Hero`, mem-fetch proyek via API, dan menampilkan portfolio.
// Apa yang boleh Anda ubah:
// - Ubah urutan komponen atau teks default; modifikasi cara fetch jika ingin SSR/CSR berbeda.

import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import PortfolioGrid from '../components/PortfolioGrid';

/*
  [FUNGSI: getProjects]
  - Memanggil endpoint API `app/api/projects` untuk mengambil daftar proyek.
  - Default limit = 5. Ubah query `?limit=` untuk menyesuaikan.
*/
async function getProjects(limit = 5) {
  const res = await fetch(`/api/projects?limit=${limit}`, { cache: 'no-store' });
  if (!res.ok) return [];
  const json = await res.json();
  return json.projects || [];
}

export default async function Page() {
  const projects = await getProjects(6);

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
