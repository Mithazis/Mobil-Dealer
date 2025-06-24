'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import MobilCard from '@/components/MobilCard'
import formatRupiah from '@/utils/formatRupiah'
import { motion, AnimatePresence } from 'framer-motion'

export default function KoleksiClient() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const page = parseInt(searchParams.get('page') || '1')
  const [mobilData, setMobilData] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)

  const [keyword, setKeyword] = useState('')
  const [kategori, setKategori] = useState('All')
  const [merk, setMerk] = useState('All')
  const [tahun, setTahun] = useState('All')
  const [rangeHarga, setRangeHarga] = useState('All')

  useEffect(() => {
    const fetchMobil = async () => {
      setLoading(true)

      const query = new URLSearchParams()
      query.append('page', page)
      query.append('limit', 9)
      if (keyword) query.append('keyword', keyword)
      if (kategori !== 'All') query.append('tipe', kategori)
      if (merk !== 'All') query.append('merk', merk)
      if (tahun !== 'All') query.append('tahun', tahun)
      if (rangeHarga !== 'All') query.append('harga', rangeHarga)

      try {
        const res = await fetch(`/api/mobil?${query.toString()}`)
        const json = await res.json()
        setMobilData(json.data || [])
        setTotalPages(json.totalPages || 1)
      } catch (err) {
        console.error('Gagal ambil data mobil:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMobil()
  }, [page, keyword, kategori, merk, tahun, rangeHarga])

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams()
    params.set('page', newPage)
    router.push(`?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetFilter = () => {
    setKeyword('')
    setKategori('All')
    setMerk('All')
    setTahun('All')
    setRangeHarga('All')
  }

  const tahunList = Array.from({ length: 2025 - 2010 + 1 }, (_, i) => 2025 - i)

  return (
    <div className="min-h-screen bg-white">
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Koleksi Mobil Kami
      </h1>

      {/* 🔍 Pencarian keyword */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari mobil berdasarkan nama atau deskripsi..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full px-6 py-4 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {/* Filter */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">Semua Tipe</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="MPV">MPV</option>
          <option value="Coupe">Coupe</option>
          <option value="Pickup">Pickup</option>
          <option value="Jeep">Jeep</option>
        </select>

        <select
          value={merk}
          onChange={(e) => setMerk(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">Semua Merk</option>
          <option value="BMW">BMW</option>
          <option value="Jeep">Jeep</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Toyota">Toyota</option>
          <option value="Hyundai">Hyundai</option>
          <option value="Nissan">Nissan</option>
          <option value="Rush">Rush</option>
          <option value="Daihatsu">Daihatsu</option>
        </select>

        <select
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">Semua Tahun</option>
          {tahunList.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select
          value={rangeHarga}
          onChange={(e) => setRangeHarga(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">Semua Harga</option>
          <option value="0-500">0 - 500 juta</option>
          <option value="500-1000">500 juta - 1 M</option>
          <option value="1000-2000">1 M - 2 M</option>
          <option value="2000+">2 M</option>
        </select>

        <button
          onClick={resetFilter}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-3 rounded-xl transition w-full"
        >
          Reset Filter
        </button>
      </div>

      {/* Hasil Mobil */}
      {loading ? (
        <p className="text-center text-gray-500">Loading data mobil...</p>
      ) : mobilData.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {mobilData.map((mobil, index) => (
              <motion.div
                key={mobil._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
                className="transform transition-transform"
              >
                <MobilCard
                  mobil={{
                    ...mobil,
                    harga: formatRupiah(mobil.harga)
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <p className="text-center text-gray-500">
          Tidak ada mobil yang cocok dengan filter kamu.
        </p>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-10">
          {page > 1 && (
            <button
              onClick={() => handlePageChange(page - 1)}
              className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
            >
              &larr; Previous
            </button>
          )}
          <span className="px-4 py-2 font-semibold">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <button
              onClick={() => handlePageChange(page + 1)}
              className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
            >
              Next &rarr;
            </button>
          )}
        </div>
      )}
    </>
    </div>
  )
}
