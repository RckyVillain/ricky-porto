// File: components/ContactForm.jsx
// Tujuan file:
// - Form kontak sederhana yang mengirim data ke API contact.
// Apa yang boleh Anda ubah:
// - Ubah field, styling, atau endpoint API jika Anda ingin menyimpan pesan ke DB lain.

"use client";
import React, { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  // [FUNGSI: handleChange] - Mengupdate state form saat input berubah
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // [FUNGSI: handleSubmit] - Mengirim data ke endpoint /api/contact
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-xl">
      <div className="grid grid-cols-1 gap-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nama" className="border p-2 rounded" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="border p-2 rounded" required />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Pesan" className="border p-2 rounded h-32" required />
        <div className="flex items-center gap-3">
          <button type="submit" className="bg-sky-600 text-white py-2 px-4 rounded">Kirim Pesan</button>
          {status === 'loading' && <span>Mengirim...</span>}
          {status === 'success' && <span className="text-green-600">Terkirim!</span>}
          {status === 'error' && <span className="text-red-600">Gagal mengirim.</span>}
        </div>
      </div>
    </form>
  );
}
