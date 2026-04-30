// File: app/layout.jsx
// Tujuan file:
// - Layout utama Next.js App Router. Menyertakan `globals.css` dan struktur HTML dasar.
// Apa yang boleh Anda ubah:
// - Ubah judul umum atau meta tag di area `<head>` untuk menyesuaikan SEO.

import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Ricky Hidayat — Portofolio',
  description: 'Portofolio Ricky Hidayat — Low-Code Developer & Photographer/Videographer'
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
