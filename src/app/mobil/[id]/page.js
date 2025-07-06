// src/app/mobil/[id]/page.js

// === TIDAK ADA 'USE CLIENT' DI FILE INI ===

// Komponen dan utilitas yang kita butuhkan untuk Server Component
import MobilDetailClient from '@/components/MobilDetailClient' // Komponen klien untuk bagian interaktif
import { connectMongo } from '@/lib/mongodb'
import Mobil from '@/models/Mobil'
import mongoose from 'mongoose'
import { notFound } from 'next/navigation' // Untuk handle halaman 404

// ======================================================
// FUNGSI UNTUK SEO DINAMIS BERDASARKAN ID MOBIL
// Ini dieksekusi di server sebelum halaman dirender.
// ======================================================
export async function generateMetadata({ params }) {
  // 1. Validasi format ID
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return {
      title: 'Halaman Tidak Valid',
      description: 'Halaman yang Anda cari tidak tersedia.',
    }
  }

  // 2. Hubungkan ke DB dan ambil data
  await connectMongo();
  const mobil = await Mobil.findById(params.id).lean();

  // 3. Handle jika mobil tidak ditemukan
  if (!mobil) {
    return {
      title: 'Mobil Tidak Ditemukan',
      description: 'Mobil yang Anda cari tidak tersedia di koleksi kami.',
    }
  }

  // 4. Buat judul dan deskripsi yang kaya keyword
  const title = `Dijual: ${mobil.nama} ${mobil.tahun} - ${mobil.merk}`;
  const description = `Dapatkan penawaran terbaik untuk ${mobil.nama} (${mobil.merk} ${mobil.tipe}) tahun ${mobil.tahun}. Kondisi terawat, jarak tempuh ${(mobil.jarak || 0).toLocaleString('id-ID')} km. Hubungi Dealer Mobil NON sekarang.`;
  const gambarUtamaUrl = mobil.gambar?.[0] ? `https://drive.google.com/uc?id=${mobil.gambar[0]}` : '/placeholder.png';

  // 5. Kembalikan objek metadata yang lengkap
  return {
    title,
    description,
    keywords: [mobil.nama, mobil.merk, mobil.tipe, `mobil bekas ${mobil.merk}`, `harga ${mobil.nama}`],
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: gambarUtamaUrl,
          width: 1200,
          height: 630,
          alt: `Foto ${mobil.nama}`,
        },
      ],
      locale: 'id_ID',
      type: 'website',
    },
    alternates: {
      // URL kanonis sesuai dengan struktur Anda
      canonical: `/mobil/${mobil._id}`,
    },
  }
}

// ======================================================
// KOMPONEN HALAMAN DETAIL MOBIL (SERVER COMPONENT)
// Ini mengambil data di server dan meneruskannya ke komponen klien.
// ======================================================
export default async function DetailMobilPage({ params }) {
  // Validasi ID, jika tidak valid, tampilkan halaman 404
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    notFound();
  }
  
  await connectMongo();
  const mobil = await Mobil.findById(params.id).lean();

  // Jika mobil tidak ada di database, tampilkan 404
  if (!mobil) {
    notFound();
  }

  // Lakukan serialisasi untuk keamanan passing props ke Client Component
  // Mengubah tipe data seperti ObjectId dan Date menjadi string
  const serializableMobil = JSON.parse(JSON.stringify(mobil));

  // Render komponen klien dan teruskan data mobil sebagai props
  return <MobilDetailClient mobil={serializableMobil} />;
}