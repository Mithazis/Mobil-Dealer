'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import formatRupiah from '@/utils/formatRupiah'
import Image from 'next/image'
import ModalMobilForm from '@/components/ModalMobilForm'

export default function DashboardPage() {
  const router = useRouter() // ✅ PENTING: inisialisasi router

  const [data, setData] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editData, setEditData] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const limit = 6

  // Cek login admin
  useEffect(() => {
    const isAdmin = localStorage.getItem('admin') === 'true'
    if (!isAdmin) {
      router.push('/login')
    }
  }, [router])

  // Debounce pencarian
  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword(searchTerm)
      setCurrentPage(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const fetchData = async (page, keyword) => {
    try {
      const res = await fetch(`/api/mobil?page=${page}&limit=${limit}&keyword=${keyword}`)
      const json = await res.json()
      setData(json.data || [])
      setTotalPages(json.totalPages || 1)
    } catch (err) {
      console.error('Gagal ambil data:', err)
    }
  }

  useEffect(() => {
    fetchData(currentPage, keyword)
  }, [currentPage, keyword])

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus mobil ini?')) return
    try {
      const res = await fetch(`/api/mobil/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Gagal hapus')
      fetchData(currentPage, keyword)
    } catch (err) {
      alert('Gagal menghapus mobil.')
    }
  }

  const handleSave = async (mobilBaru) => {
    if (!mobilBaru || typeof mobilBaru !== 'object') {
      alert('Data tidak valid.')
      return
    }

    try {
      const isEdit = mobilBaru._id && mobilBaru._id.length > 0
      const url = isEdit ? `/api/mobil/${mobilBaru._id}` : '/api/mobil'

      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mobilBaru),
      })

      if (!res.ok) throw new Error('Gagal simpan')

      setModalOpen(false)
      setEditData(null)
      fetchData(currentPage, keyword)
    } catch (err) {
      console.error('Gagal menyimpan:', err)
      alert('Gagal menyimpan data.')
    }
  }

  const formatGambar = (url) => {
    if (!url) return ''
    if (url.includes('http')) return url
    return `https://drive.google.com/uc?id=${url}`
  }

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:items-center">
          <input
            type="text"
            placeholder="Cari mobil..."
            className="px-4 py-2 border rounded-lg w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => {
              setEditData(null)
              setModalOpen(true)
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
          >
            + Tambah Mobil
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white p-4 shadow-md">
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-sm text-gray-700">
              <th className="px-4 py-3">Gambar</th>
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
              <tr key={mobil._id} className="border-t text-sm hover:bg-gray-50">
                <td className="px-4 py-2">
                  {mobil.gambar?.[0] ? (
                    <div className="relative w-24 h-16">
                      <Image
                        src={formatGambar(mobil.gambar[0])}
                        alt={mobil.nama}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">Tidak ada gambar</span>
                  )}
                </td>
                <td className="px-4 py-2">{mobil.nama}</td>
                <td className="px-4 py-2">{mobil.merk}</td>
                <td className="px-4 py-2">{mobil.tipe}</td>
                <td className="px-4 py-2">{formatRupiah(mobil.harga)}</td>
                <td className="px-4 py-2">{mobil.tahun}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <button
                    onClick={() => {
                      setEditData(mobil)
                      setModalOpen(true)
                    }}
                    className="text-blue-500 hover:underline mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(mobil._id)}
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

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          ← Sebelumnya
        </button>
        <span className="text-gray-700 font-medium">
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Selanjutnya →
        </button>
      </div>

      {modalOpen && (
        <ModalMobilForm
          initialData={editData}
          onClose={() => {
            setModalOpen(false)
            setEditData(null)
          }}
          onSave={handleSave}
        />
      )}

      {/* Tombol Logout */}
      <div className="flex justify-end mt-8">
        <button
          onClick={() => {
            localStorage.removeItem('admin')
            router.push('/login')
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </main>
  )
}
