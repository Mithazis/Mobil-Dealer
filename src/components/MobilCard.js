'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function MobilCard({ mobil }) {
  const formatGambar = (url) => {
    if (!url) return '/placeholder.png' // fallback gambar
    if (url.startsWith('http')) return url
    return `https://drive.google.com/uc?id=${url}`
  }

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="relative w-full h-48">
        <Image
          src={formatGambar(mobil.gambar?.[0])}
          alt={mobil.nama || 'Mobil'}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h2 className="text-xl font-semibold text-gray-800">
          {mobil.nama || 'Tanpa Nama'}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {mobil.deskripsi || 'Tidak ada deskripsi.'}
        </p>
        <p className="text-lg font-bold text-blue-600">
          {mobil.harga
            ? `${mobil.harga.toLocaleString('id-ID')}`
            : 'Harga tidak tersedia'}
        </p>
        <Link
          href={`/mobil/${mobil._id}`}
          className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-xl text-center hover:bg-blue-700 transition"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  )
}
