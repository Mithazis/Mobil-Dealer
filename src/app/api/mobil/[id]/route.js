import { connectMongo } from '@/lib/mongodb';
import Mobil from '@/models/Mobil';

export async function GET(_, { params }) {
  await connectMongo();
  try {
    const mobil = await Mobil.findById(params.id);
    if (!mobil) {
      return Response.json({ error: 'Mobil tidak ditemukan' }, { status: 404 });
    }
    return Response.json(mobil);
  } catch (error) {
    return Response.json({ error: 'Gagal mengambil data mobil' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await connectMongo()
  try {
    const id = params.id
    const body = await req.json()

    const updated = await Mobil.findByIdAndUpdate(id, body, { new: true })

    if (!updated) {
      return Response.json({ success: false, error: 'Mobil tidak ditemukan' }, { status: 404 })
    }

    return Response.json({ success: true, data: updated })
  } catch (err) {
    return Response.json({ success: false, error: 'Gagal update', detail: err.message }, { status: 500 })
  }
}


export async function DELETE(_, { params }) {
  await connectMongo();
  try {
    const deleted = await Mobil.findByIdAndDelete(params.id);
    if (!deleted) {
      return Response.json({ error: 'Mobil tidak ditemukan' }, { status: 404 });
    }
    return Response.json({ message: 'Mobil berhasil dihapus' });
  } catch (error) {
    return Response.json({ error: 'Gagal menghapus mobil' }, { status: 500 });
  }
}
