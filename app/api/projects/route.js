// File: app/api/projects/route.js
// Tujuan file:
// - Menyediakan API route minimal (CRUD) untuk model `Project`.
// - Dioptimalkan untuk Next.js App Router (file-based route `route.js`).
// Apa yang boleh Anda ubah:
// - Ubah enum kategori pada model jika butuh; atur validasi tambahan pada model.
// - Sesuaikan limit pada GET default (nilai diambil dari query `?limit=`).

/*
  [CATATAN PENTING]
  - Pastikan `MONGODB_URI` sudah disetel di `.env.local` atau Environment Variables Vercel.
  - File ini menggunakan `connectMongo()` dari `lib/mongoose.js` dan model `Project`.
*/

import { NextResponse } from 'next/server';
import connectMongo from '../../../lib/mongoose';
import Project from '../../../models/Project';
import staticProjects from '../../../data/projects.json';

const useStatic = !process.env.MONGODB_URI;

function getStaticProjects(limit) {
  return staticProjects.slice(0, limit).map((project) => ({
    ...project,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));
}

// [FUNGSI: handler GET] - Mengambil daftar proyek. Query optional: ?limit=5
export async function GET(request) {
  try {
    if (useStatic) {
      const url = new URL(request.url);
      const limit = parseInt(url.searchParams.get('limit') || '5', 10);
      const projects = getStaticProjects(limit);
      return NextResponse.json({ success: true, count: projects.length, projects });
    }

    // Menghubungkan ke DB (cached untuk serverless)
    await connectMongo();

    // Ambil nilai limit dari query string, default = 5
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '5', 10);

    // Mengambil proyek terbaru berdasarkan createdAt (descending)
    const projects = await Project.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ success: true, count: projects.length, projects });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// [FUNGSI: handler POST] - Membuat proyek baru
export async function POST(request) {
  if (useStatic) {
    return NextResponse.json(
      { success: false, error: 'MongoDB tidak dikonfigurasi. Gunakan data statis atau atur MONGODB_URI.' },
      { status: 501 }
    );
  }

  try {
    await connectMongo();

    // Mengambil data JSON dari body request
    const body = await request.json();

    // Validasi minimal
    const { title, description, category } = body;
    if (!title || !description || !category) {
      return NextResponse.json(
        { success: false, error: 'Field required: title, description, category' },
        { status: 400 }
      );
    }

    // Membuat dokumen baru
    const newProject = await Project.create(body);
    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// [FUNGSI: handler PUT] - Mengupdate proyek berdasarkan `id` pada body
export async function PUT(request) {
  if (useStatic) {
    return NextResponse.json(
      { success: false, error: 'MongoDB tidak dikonfigurasi. Gunakan data statis atau atur MONGODB_URI.' },
      { status: 501 }
    );
  }

  try {
    await connectMongo();
    const body = await request.json();

    // Mengharapkan body.id untuk mengidentifikasi dokumen
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing `id` in request body' }, { status: 400 });
    }

    const updated = await Project.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, project: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// [FUNGSI: handler DELETE] - Menghapus proyek berdasarkan query `?id=` atau body.id
export async function DELETE(request) {
  if (useStatic) {
    return NextResponse.json(
      { success: false, error: 'MongoDB tidak dikonfigurasi. Gunakan data statis atau atur MONGODB_URI.' },
      { status: 501 }
    );
  }

  try {
    await connectMongo();

    const url = new URL(request.url);
    const idFromQuery = url.searchParams.get('id');

    let id = idFromQuery;
    if (!id) {
      // Jika tidak ada pada query, coba ambil dari body
      try {
        const body = await request.json();
        id = body.id;
      } catch (e) {
        // ignore jika body tidak ada
      }
    }

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing `id` to delete' }, { status: 400 });
    }

    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, project: deleted });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
