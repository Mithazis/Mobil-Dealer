'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import MobilCard from '@/components/MobilCard'
import formatRupiah from '@/utils/formatRupiah'
import { motion, AnimatePresence } from 'framer-motion'

export default function KoleksiClient() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [mobilData, setMobilData] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)

  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '')
  const [kategori, setKategori] = useState(searchParams.get('tipe') || 'All')
  const [merk, setMerk] = useState(searchParams.get('merk') || 'All')
  const [tahun, setTahun] = useState(searchParams.get('tahun') || 'All')
  const [rangeHarga, setRangeHarga] = useState(searchParams.get('harga') || 'All')

  const page = parseInt(searchParams.get('page') || '1')
  const limit = 9

  const tahunList = Array.from({ length: 2025 - 2000 + 1 }, (_, i) => 2025 - i)

  useEffect(() => {
    const fetchMobil = async () => {
      setLoading(true)
      const query = new URLSearchParams()
      query.append('page', page)
      query.append('limit', limit)
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
    if (keyword) params.set('keyword', keyword)
    if (kategori !== 'All') params.set('tipe', kategori)
    if (merk !== 'All') params.set('merk', merk)
    if (tahun !== 'All') params.set('tahun', tahun)
    if (rangeHarga !== 'All') params.set('harga', rangeHarga)

    router.push(`?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetFilter = () => {
    setKeyword('')
    setKategori('All')
    setMerk('All')
    setTahun('All')
    setRangeHarga('')
    router.push('?page=1')
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Koleksi Mobil Kami
      </h1>

      {/* 🔍 Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari mobil berdasarkan nama atau deskripsi..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value)
            handlePageChange(1)
          }}
          className="w-full px-6 py-4 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {/* 🔽 Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
        <select value={kategori} onChange={(e) => {
          setKategori(e.target.value)
          handlePageChange(1)
        }} className="px-4 py-3 border rounded-xl w-full text-sm sm:text-base">
          <option value="All">Semua Tipe</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="MPV">MPV</option>
          <option value="Coupe">Coupe</option>
          <option value="Pickup">Pickup</option>
          <option value="Jeep">Jeep</option>
          <option value="Hatchback">Hatchback</option>
        </select>

        <select value={merk} onChange={(e) => {
          setMerk(e.target.value)
          handlePageChange(1)
        }} className="px-4 py-3 border rounded-xl w-full text-sm sm:text-base">
          <option value="All">Semua Merk</option>
          <option value="Toyota">Toyota</option>
          <option value="BMW">BMW</option>
          <option value="Mercedes-Benz">Mercedes-Benz</option>
          <option value="Jeep">Jeep</option>
          <option value="Hyundai">Hyundai</option>
          <option value="Nissan">Nissan</option>
          <option value="Honda">Honda</option>
          <option value="Daihatsu">Daihatsu</option>
          <option value="Isuzu">Isuzu</option>
          <option value="Mitsubishi">Mitsubishi</option>
          <option value="Lexus">Lexus</option>
          <option value="Suzuki">Suzuki</option>
        </select>

        <select value={tahun} onChange={(e) => {
          setTahun(e.target.value)
          handlePageChange(1)
        }} className="px-4 py-3 border rounded-xl w-full text-sm sm:text-base">
          <option value="All">Semua Tahun</option>
          {tahunList.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select value={rangeHarga} onChange={(e) => {
          setRangeHarga(e.target.value)
          handlePageChange(1)
        }} className="px-4 py-3 border rounded-xl w-full text-sm sm:text-base">
          <option value="All">Semua Harga</option>
          <option value="0-500">0 - 500 juta</option>
          <option value="500-1000">500 juta - 1 M</option>
          <option value="1000-2000">1 M - 2 M</option>
          <option value="2000+">2 M+</option>
        </select>

        <button onClick={resetFilter} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-3 rounded-xl w-full text-sm sm:text-base">
          Reset Filter
        </button>
      </div>

      {/* 🖼️ Hasil */}
      {loading ? (
        <p className="text-center text-gray-500">Loading data mobil...</p>
      ) : mobilData.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mobilData.map((mobil, index) => (
              <motion.div
                key={mobil._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <MobilCard mobil={{ ...mobil, harga: formatRupiah(mobil.harga) }} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <p className="text-center text-gray-500">Tidak ada mobil yang cocok dengan filter kamu.</p>
      )}

      {/* 🔁 Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-10">
          {page > 1 && (
            <button onClick={() => handlePageChange(page - 1)} className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300">
              ← Sebelumnya
            </button>
          )}
          <span className="px-4 py-2 font-semibold">
            Halaman {page} dari {totalPages}
          </span>
          {page < totalPages && (
            <button onClick={() => handlePageChange(page + 1)} className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300">
              Selanjutnya →
            </button>
          )}
        </div>
      )}

      {/* 📱 Floating WhatsApp Button */}
      <div
        className="fixed bottom-5 right-5 z-50 cursor-move touch-none"
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setDragImage(new Image(), 0, 0)
        }}
        onDragEnd={(e) => {
          const btn = e.target
          btn.style.left = e.clientX + 'px'
          btn.style.top = e.clientY + 'px'
          btn.style.position = 'fixed'
        }}
      >
        <a
          href={`https://wa.me/6282117774545?text=${encodeURIComponent('Halo saya tertarik dengan mobil yang ada di website dealer mobil non')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.601 2.326a7.993 7.993 0 0 0-12.6 9.137L0 16l4.679-1.228a7.994 7.994 0 0 0 12.527-9.118 7.99 7.99 0 0 0-3.605-3.328zM8.004 14.5a6.46 6.46 0 0 1-3.321-.89l-.237-.14-2.773.727.74-2.705-.154-.248a6.46 6.46 0 1 1 5.745 3.256zm3.69-4.736c-.202-.101-1.195-.59-1.38-.656-.185-.068-.32-.101-.456.101-.136.202-.523.656-.64.79-.118.135-.237.152-.439.05-.202-.101-.852-.314-1.623-1.003-.6-.534-1.004-1.2-1.122-1.402-.117-.202-.013-.311.088-.412.09-.09.202-.236.303-.353.101-.118.135-.202.202-.337.067-.135.034-.253-.017-.353-.051-.101-.456-1.1-.625-1.506-.165-.397-.332-.343-.456-.343h-.39c-.118 0-.31.044-.472.202s-.618.604-.618 1.475c0 .871.634 1.713.722 1.829.089.118 1.242 1.9 3.012 2.664.421.182.75.29 1.006.371.422.134.805.116 1.11.07.339-.051 1.195-.488 1.363-.96.168-.471.168-.875.118-.96-.05-.084-.184-.134-.385-.235z" />
          </svg>
        </a>
      </div>
    </>
  )
}
