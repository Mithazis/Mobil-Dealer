// File: lib/mongodb.js

import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  throw new Error('❌ MONGO_URI belum disetel di file .env.local')
}

let isConnected = false

export async function connectMongo() {
  if (isConnected) return

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'DealerMobil', // ganti sesuai nama database kamu
    })

    isConnected = true
    console.log('✅ Terhubung ke MongoDB')
  } catch (error) {
    console.error('❌ Gagal terhubung ke MongoDB:', error)
    throw new Error('MongoDB connection failed')
  }
}
