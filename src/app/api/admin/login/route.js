import { NextResponse } from 'next/server'
import { connectMongo } from '@/lib/mongodb'
import Admin from '@/models/Admin'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  await connectMongo()
  const { username, password } = await req.json()

  const admin = await Admin.findOne({ username })
  if (!admin) {
    return NextResponse.json({ error: 'Username tidak ditemukan' }, { status: 401 })
  }

  const isMatch = await bcrypt.compare(password, admin.password)
  if (!isMatch) {
    return NextResponse.json({ error: 'Password salah' }, { status: 401 })
  }

  // Kirim status sukses
  return NextResponse.json({ success: true })
}
