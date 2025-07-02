import { connectMongo } from '@/lib/mongodb'
import Mobil from '@/models/Mobil'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectMongo()
    const semuaMobil = await Mobil.find({}, 'merk')
    const merkUnik = [...new Set(semuaMobil.map(m => m.merk).filter(Boolean))].sort()

    return NextResponse.json(merkUnik)
  } catch (err) {
    console.error('Gagal ambil merk:', err)
    return NextResponse.json({ error: 'Gagal ambil data merk' }, { status: 500 })
  }
}
