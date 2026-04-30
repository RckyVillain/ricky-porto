Panduan deploy otomatis (menggunakan Vercel CLI) — ringkas

Penting: jangan pernah memasukkan token atau credensial di chat.

1) Buat token Vercel baru (Dashboard > Settings > Tokens). Jangan gunakan token yang pernah terekspos.
2) Di mesin Anda (PowerShell), set token sementara sebelum menjalankan deploy:

```powershell
# Ganti nilai token dengan token baru (tempel di terminal, jangan di chat)
$env:VERCEL_TOKEN = "PASTE_NEW_TOKEN_HERE"

# Pastikan Anda sudah mem-push kode ke GitHub atau berada di folder proyek
Set-Location 'D:\RickyPorto\webporto'

# Jalankan deploy produksi
npx vercel --prod --token $env:VERCEL_TOKEN
```

3) Menambahkan environment variable MONGODB_URI (production) via Vercel CLI:

```powershell
npx vercel env add MONGODB_URI production
# ikuti prompt untuk menempel connection string MongoDB Anda
```

4) Jika mau menggunakan Vercel extension di VS Code:
- Buka panel Extensions → cari "Vercel" → Sign in via browser (ekstensi akan memandu login).
- Setelah login, import project dari GitHub lewat dashboard Vercel (lebih mudah).

5) Menggunakan MongoDB for VS Code:
- Buka panel MongoDB (ikon di Activity Bar), klik "New Connection".
- Masukkan connection string (contoh di `.env.local.example`) dan connect.
- Anda bisa melihat koleksi, insert dokumen, atau create index dari panel.

Jika Anda mau, saya bisa:
- Pandu langkah-langkah ini secara interaktif (Anda jalankan perintah dan kirim output), atau
- Menyusun perintah yang bisa Anda copy-paste langkah demi langkah.
