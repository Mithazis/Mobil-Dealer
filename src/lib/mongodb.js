// File: lib/mongodb.js

import mongoose from 'mongoose';

// Mengambil URI dari environment variable. Pastikan nama variabelnya sama
// dengan yang Anda set di Vercel (misalnya MONGO_URI atau MONGODB_URI).
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('❌ Harap definisikan variabel MONGO_URI di dalam .env.local atau di pengaturan Vercel');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectMongo() {
  // Jika sudah ada koneksi yang tersimpan, gunakan koneksi itu
  if (cached.conn) {
    // console.log("✅ Menggunakan koneksi MongoDB dari cache");
    return cached.conn;
  }

  // Jika belum ada promise koneksi yang sedang berjalan, buat yang baru
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disarankan oleh Mongoose untuk performa
      dbName: 'DealerMobil', // Pastikan nama DB ini sudah benar
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log("✅ Berhasil membuat koneksi baru ke MongoDB");
      return mongoose;
    }).catch(error => {
      console.error("❌ Gagal terhubung ke MongoDB:", error);
      // Hentikan proses jika koneksi gagal agar tidak terjadi error lanjutan
      throw new Error("Gagal terhubung ke database.");
    });
  }

  // Tunggu hingga promise koneksi selesai dan simpan hasilnya
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    // Jika koneksi gagal, reset promise agar bisa dicoba lagi nanti
    cached.promise = null;
    throw e;
  }
  
  return cached.conn;
}

export { connectMongo };