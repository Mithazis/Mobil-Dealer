'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import mobilData from '@/data/mobil'

export default function EditMobilPage() {
  const { id } = useParams()
  const router = useRouter()

  const [form, setForm] = useState(null)

  useEffect(() => {
    const mobil = mobilData.find((m) => m.id === parseInt(id))
    if (mobil) {
      setForm(mobil)
    } else {
      alert('Mobil tidak ditemukan.')
      router.push('/dashboard')
    }
  }, [id, router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Data setelah diedit:', form)
    alert('Perubahan berhasil disimpan (sementara di console).')
    router.push('/dashboard')
  }

  if (!form) return <p className="p-6">Memuat data mobil...</p>

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Mobil</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nama"
            placeholder="Nama Mobil"
            value={form.nama}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="merk"
              placeholder="Merk"
              value={form.merk}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              required
            />
            <select
              name="tipe"
              value={form.tipe}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              required
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
              placeholder="Tahun"
              value={form.tahun}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              required
            />
            <input
              type="number"
              name="harga"
              placeholder="Harga"
              value={form.harga}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              required
            />
          </div>

          <input
            type="text"
            name="gambar"
            placeholder="URL Gambar"
            value={form.gambar}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            required
          />

          <textarea
            name="deskripsi"
            placeholder="Deskripsi"
            value={form.deskripsi}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            required
          />

          <input
            type="text"
            name="whatsapp"
            placeholder="No WhatsApp"
            value={form.whatsapp}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            required
          />

          <div className="text-right">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
