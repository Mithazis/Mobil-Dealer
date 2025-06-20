'use client'

import { useState } from 'react'
import mobilData from '@/data/mobil'

export default function DashboardPage() {
  const [data, setData] = useState(mobilData)

  const handleDelete = (id) => {
    const confirm = window.confirm('Yakin ingin menghapus mobil ini?')
    if (confirm) {
      setData(data.filter((m) => m.id !== id))
    }
  }

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Admin</h1>

      <div className="overflow-x-auto rounded-xl bg-white p-4 shadow-md">
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-sm text-gray-700">
              <th className="px-4 py-3">Nama Mobil</th>
              <th className="px-4 py-3">Merk</th>
              <th className="px-4 py-3">Tipe</th>
              <th className="px-4 py-3">Harga</th>
              <th className="px-4 py-3">Tahun</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((mobil) => (
              <tr key={mobil.id} className="border-t text-sm hover:bg-gray-50">
                <td className="px-4 py-2">{mobil.nama}</td>
                <td className="px-4 py-2">{mobil.merk}</td>
                <td className="px-4 py-2">{mobil.tipe}</td>
                <td className="px-4 py-2">Rp {mobil.harga.toLocaleString('id-ID')}</td>
                <td className="px-4 py-2">{mobil.tahun}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-500 hover:underline mr-3">Edit</button>
                  <button
                    onClick={() => handleDelete(mobil.id)}
                    className="text-red-500 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <p className="text-center text-gray-500 mt-4">Tidak ada data mobil.</p>
        )}
      </div>
    </main>
  )
}
