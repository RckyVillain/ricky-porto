// File: components/ProjectCard.jsx
// Tujuan file:
// - Menampilkan kartu proyek tunggal (judul, kategori, thumbnail, ringkasan).
// Apa yang boleh Anda ubah:
// - Ubah tampilan atau tambahkan action (link ke detail atau lightbox).

import React from 'react';

export default function ProjectCard({ project }) {
  // [DATA] Pastikan `project.media[0].url` tersedia sebagai thumbnail
  const thumb = project?.media?.[0]?.url || '/profile.svg';

  return (
    <article className="border rounded-lg overflow-hidden shadow-sm">
      <img src={thumb} alt={project.title} className="w-full h-44 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{project.title}</h3>
        <p className="text-sm text-slate-600 mt-2">{project.description}</p>
        <div className="mt-3 text-xs text-slate-500">{project.category}</div>
      </div>
    </article>
  );
}
