import mobilData from '@/data/mobil'
import MobilDetailClient from '@/components/MobilDetailClient'

export async function generateStaticParams() {
  return mobilData.map((mobil) => ({
    id: mobil.id,
  }))
}

export default function DetailMobilPage({ params }) {
  const mobil = mobilData.find((m) => m.id === params.id)

  if (!mobil) return <div className="p-8">Mobil tidak ditemukan.</div>

  return <MobilDetailClient mobil={mobil} />
}
