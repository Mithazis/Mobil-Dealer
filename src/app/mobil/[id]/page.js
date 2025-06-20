import mobilData from '@/data/mobil'
import MobilSlider from '@/components/MobilSlider'
import WhatsAppButton from '@/components/WhatsAppButton'
import formatRupiah from '@/utils/formatRupiah'
import generateWaLink from '@/utils/generateWaLink'

export async function generateStaticParams() {
  return mobilData.map((mobil) => ({
    id: mobil.id,
  }))
}

export default function DetailMobilPage({ params }) {
  const mobil = mobilData.find((m) => m.id === params.id)

  if (!mobil) return <div className="p-8">Mobil tidak ditemukan.</div>

  return (
    <main className="min-h-screen px-4 py-10 bg-white">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <MobilSlider images={mobil.gambar} />

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-800">{mobil.nama}</h1>
          <p className="text-xl text-blue-600 font-semibold">{formatRupiah(mobil.harga)}</p>
          <p className="text-gray-700">{mobil.deskripsi}</p>
        </div>

        <WhatsAppButton nomor={mobil.whatsapp} pesan={`Halo, saya tertarik dengan ${mobil.nama}`} />
      </div>
    </main>
  )
}
