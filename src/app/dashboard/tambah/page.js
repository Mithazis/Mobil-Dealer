'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TambahMobilPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    nama: '',
    merk: '',
    tipe: '',
    tahun: '',
    harga: '',
    gambar: '',
    deskripsi: '',
    whatsapp: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Data Mobil Baru:', form)

    alert('Mobil berhasil ditambahkan (sementara hanya tampil di console).')
    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Tambah Mobil Baru</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nama"
            placeholder="Nama Mobil"
            value={form.nama}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="merk"
              placeholder="Merk (ex: BMW)"
              value={form.merk}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
            <select
              name="tipe"
              value={form.tipe}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            >
              <option value="">Pilih Tipe</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="MPV">MPV</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="tahun"
              placeholder="Tahun (ex: 2022)"
              value={form.tahun}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
            <input
              type="number"
              name="harga"
              placeholder="Harga (tanpa Rp)"
              value={form.harga}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>

          <input
            type="text"
            name="gambar"
            placeholder="URL Gambar Pertama (ex: /images/bmw.jpg)"
            value={form.gambar}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          />

          <textarea
            name="deskripsi"
            placeholder="Deskripsi mobil..."
            value={form.deskripsi}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          />

          <input
            type="text"
            name="whatsapp"
            placeholder="Nomor WhatsApp (ex: 6281234567890)"
            value={form.whatsapp}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          />

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              Simpan Mobil
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
