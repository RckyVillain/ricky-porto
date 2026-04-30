// File: tailwind.config.js
// Tujuan file:
// - Konfigurasi Tailwind CSS untuk proyek Next.js.
// Apa yang boleh Anda ubah:
// - Untuk mengganti warna utama, edit bagian `theme.extend.colors.primary`.
// - Untuk menambah screens/custom utilities, sesuaikan pada objek `theme`.

module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9'
      }
    }
  },
  plugins: []
};
