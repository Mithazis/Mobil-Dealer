import { connectMongo } from '@/lib/mongodb'
import Mobil from '@/models/Mobil'

export async function GET(req) {
  await connectMongo()

  try {
    const { searchParams } = new URL(req.url)

    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    const keyword = searchParams.get('keyword')
    const tipe = searchParams.get('tipe')
    const merk = searchParams.get('merk')
    const tahun = searchParams.get('tahun')
    const harga = searchParams.get('harga')

    // 🔍 Bangun filter query MongoDB
    const filter = {}

    if (keyword) {
      filter.$or = [
        { nama: { $regex: keyword, $options: 'i' } },
        { deskripsi: { $regex: keyword, $options: 'i' } }
      ]
    }

    // Menggunakan regex ^...$ untuk pencocokan kata yang persis (case-insensitive)
    if (tipe) { // Tidak perlu cek !== 'All' karena frontend sudah tidak mengirimkannya
      filter.tipe = { $regex: `^${tipe}$`, $options: 'i' }
    }

    // >>> INI BAGIAN YANG DIPERBAIKI <<<
    if (merk) {
      // Filter diterapkan ke field 'merk', bukan 'nama'
      filter.merk = { $regex: `^${merk}$`, $options: 'i' } 
    }

    if (tahun) {
      filter.tahun = parseInt(tahun)
    }

    if (harga) {
      if (harga === '0-500') {
        filter.harga = { $lte: 500000000 }
      } else if (harga === '500-1000') {
        filter.harga = { $gte: 500000000, $lte: 1000000000 }
      } else if (harga === '1000-2000') {
        filter.harga = { $gte: 1000000000, $lte: 2000000000 }
      } else if (harga === '2000+') {
        filter.harga = { $gte: 2000000000 }
      }
    }

    // Penggunaan Promise.all sudah sangat bagus untuk efisiensi!
    const [data, total] = await Promise.all([
      Mobil.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
      Mobil.countDocuments(filter),
    ])

    return Response.json({
      success: true,
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: 'Gagal mengambil data mobil',
        details: error.message,
      },
      { status: 500 }
    )
  }
}


export async function POST(req) {
  await connectMongo()

  try {
    const body = await req.json()

    if (
  !body.nama ||
  !body.tahun ||
  !body.harga
) {
      return Response.json(
        { success: false, error: 'Field tidak lengkap' },
        { status: 400 }
      )
    }

    const mobilBaru = await Mobil.create(body)

    return Response.json({ success: true, data: mobilBaru }, { status: 201 })
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: 'Gagal menambah data mobil',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
// UPDATE mobil
export async function PUT(req, { params }) {
  await connectMongo()
  try {
    const id = params.id
    const body = await req.json()
    const updated = await Mobil.findByIdAndUpdate(id, body, { new: true })
    return Response.json({ success: true, data: updated })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}

// DELETE mobil
export async function DELETE(req, { params }) {
  await connectMongo()
  try {
    const id = params.id
    await Mobil.findByIdAndDelete(id)
    return Response.json({ success: true, message: 'Mobil dihapus' })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
