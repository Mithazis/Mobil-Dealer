'use client'

import Link from 'next/link'

export default function MobilCard({ mobil }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <img
        src={mobil.gambar[0]}
        alt={mobil.nama}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h2 className="text-xl font-semibold text-gray-800">{mobil.nama}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{mobil.deskripsi}</p>
        <p className="text-lg font-bold text-blue-600">{mobil.harga}</p>
        <Link
          href={`/mobil/${mobil.id}`}
          className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-xl text-center hover:bg-blue-700 transition"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  )
}
