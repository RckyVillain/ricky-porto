// File: app/api/contact/route.js
// Tujuan file:
// - Endpoint API sederhana untuk menerima pesan kontak dan menyimpannya ke MongoDB
// - Anda bisa mengubahnya untuk mengirim email atau menyimpan ke koleksi berbeda.

import { NextResponse } from 'next/server';
import connectMongo from '../../../lib/mongoose';
import mongoose from 'mongoose';

// [FUNGSI: Contact Schema lokal]
// Untuk skala kecil kita buat skema singkat di sini. Untuk model terpisah, pindahkan ke /models.
const ContactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String
  },
  { timestamps: true }
);

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

export async function POST(request) {
  try {
    await connectMongo();
    const body = await request.json();
    const { name, email, message } = body;
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Field required: name, email, message' }, { status: 400 });
    }

    const saved = await Contact.create({ name, email, message });
    return NextResponse.json({ success: true, contact: saved }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
