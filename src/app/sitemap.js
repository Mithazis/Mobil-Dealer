// File: src/app/sitemap.js

// Impor koneksi database dan model Mobil Anda
import { connectMongo } from '@/lib/mongodb';
import Mobil from '@/models/Mobil';

export default async function sitemap() {
  // PENTING: Ganti dengan URL domain asli website Anda!
  const BASE_URL = 'https://dealer-mobil-non.vercel.app';

  // 1. Definisikan Halaman Statis yang Penting untuk SEO
  const staticUrls = [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/koleksi`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // 2. Ambil Semua Data Mobil untuk Membuat Halaman Dinamis
  await connectMongo();
  
  // Ambil hanya _id dan updatedAt untuk efisiensi
  const semuaMobil = await Mobil.find().select('_id updatedAt').lean();

  const mobilUrls = semuaMobil.map((mobil) => {
    return {
      url: `${BASE_URL}/mobil/${mobil._id}`,
      // Gunakan tanggal update mobil jika ada, jika tidak, gunakan tanggal hari ini
      lastModified: mobil.updatedAt ? new Date(mobil.updatedAt).toISOString() : new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  // 3. Gabungkan semua URL dan kembalikan
  return [...staticUrls, ...mobilUrls];
}