// File: components/PortfolioGrid.jsx
// Tujuan file:
// - Menampilkan grid proyek yang di-pass dari halaman utama.
// Apa yang boleh Anda ubah:
// - Ubah jumlah kolom atau styling grid dengan kelas Tailwind.

import React from 'react';
import ProjectCard from './ProjectCard';

export default function PortfolioGrid({ projects = [] }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Portofolio</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p._id} project={p} />
        ))}
      </div>
    </section>
  );
}
