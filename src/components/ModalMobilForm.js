'use client'

import { useState, useEffect } from 'react'

export default function ModalMobilForm({ initialData, onClose, onSave }) {
  const [form, setForm] = useState({
    nama: '',
    merk: '',
    tipe: '',
    tahun: '',
    harga: '',
    deskripsi: '',
    gambar: [''],
  })

  useEffect(() => {
    if (initialData) {
      const extractId = (url) => {
        if (!url) return ''
        // Jika sudah ID pendek, kembalikan langsung
        if (!url.includes('http') && url.length < 50) return url
        const match = url.match(/(?:uc\?id=|file\/d\/)([\w-]{10,})/)
        return match ? match[1] : url
      }

      setForm({
        _id: initialData._id || '',
        nama: initialData.nama || '',
        merk: initialData.merk || '',
        tipe: initialData.tipe || '',
        tahun: initialData.tahun?.toString() || '',
        harga: initialData.harga?.toString() || '',
        deskripsi: initialData.deskripsi || '',
        gambar:
          Array.isArray(initialData.gambar) && initialData.gambar.length > 0
            ? initialData.gambar.map(extractId)
            : [''],
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleGambarChange = (index, value) => {
    const updated = [...form.gambar]
    updated[index] = value
    setForm((prev) => ({ ...prev, gambar: updated }))
  }

  const handleAddGambar = () => {
    setForm((prev) => ({ ...prev, gambar: [...prev.gambar, ''] }))
  }

  const handleRemoveGambar = (index) => {
    if (form.gambar.length <= 1) return
    const updated = form.gambar.filter((_, i) => i !== index)
    setForm((prev) => ({ ...prev, gambar: updated }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

 const gambarFormatted = form.gambar.map((g) => {
  if (g.startsWith('http')) {
    const match = g.match(/(?:\/d\/|id=)([\w-]+)/)
    return match ? match[1] : g
  }
  return g
})

    const dataToSubmit = {
      ...form,
      harga: parseInt(form.harga),
      tahun: parseInt(form.tahun),
      gambar: gambarFormatted,
    }

    onSave(dataToSubmit)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">
          {initialData ? 'Edit Mobil' : 'Tambah Mobil'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 pb-4">
          <input
            name="nama"
            placeholder="Nama Mobil"
            value={form.nama}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <select
            name="merk"
            placeholder="Merk"
            value={form.merk}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
            >
            <option value="" disabled>Pilih Merk</option>
            <option value="Toyota">Toyota</option>
            <option value="Daihatsu">Daihatsu</option>
            <option value="Nissan">Nissan</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Jeep">Jeep</option>
            <option value="Honda">Honda</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Mitsubishi">Mitsubishi</option>
            <option value="Suzuki">Suzuki</option>
            <option value="Lexus">Lexus</option>
            <option value="Isuzu">Isuzu</option>
          </select>
          <select
            name="tipe"
            value={form.tipe}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="" disabled>Pilih Tipe</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="MPV">MPV</option>
            <option value="Coupe">Coupe</option>
            <option value="Pickup">Pickup</option>
            <option value="Jeep">Jeep</option>
            <option value="Hatchback">Hatchback</option>
          </select>
          <input
            name="harga"
            type="number"
            placeholder="Harga (contoh: 1500000000)"
            value={form.harga}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            name="tahun"
            type="number"
            placeholder="Tahun"
            value={form.tahun}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <textarea
            name="deskripsi"
            placeholder="Deskripsi"
            value={form.deskripsi}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />

          {/* Input Gambar */}
          <div className="space-y-2">
            <label className="font-medium">ID Gambar (Google Drive)</label>
            {form.gambar.map((url, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder={`ID gambar ${i + 1}`}
                  value={url}
                  onChange={(e) => handleGambarChange(i, e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                {form.gambar.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveGambar(i)}
                    className="text-red-500 hover:text-red-700 text-xl"
                    title="Hapus gambar"
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddGambar}
              className="text-sm text-blue-600 hover:underline mt-1"
            >
              + Tambah Gambar
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  )
}