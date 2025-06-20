'use client'

import { useState } from 'react'
import MobilCard from '@/components/MobilCard'
import mobilData from '@/data/mobil'
import formatRupiah from '@/utils/formatRupiah'
import { motion, AnimatePresence } from 'framer-motion'

export default function KoleksiPage() {
  const [keyword, setKeyword] = useState('')
  const [kategori, setKategori] = useState('All')
  const [merk, setMerk] = useState('All')
  const [tahun, setTahun] = useState('All')
  const [rangeHarga, setRangeHarga] = useState('All')

  const resetFilter = () => {
    setKeyword('')
    setKategori('All')
    setMerk('All')
    setTahun('All')
    setRangeHarga('All')
  }

  const filteredMobil = mobilData.filter((mobil) => {
    const cocokKeyword =
      mobil.nama.toLowerCase().includes(keyword.toLowerCase()) ||
      mobil.deskripsi.toLowerCase().includes(keyword.toLowerCase())

    const cocokKategori =
      kategori === 'All' || mobil.tipe.toLowerCase() === kategori.toLowerCase()

    const cocokMerk =
      merk === 'All' || mobil.merk.toLowerCase() === merk.toLowerCase()

    const cocokTahun =
      tahun === 'All' || mobil.tahun === parseInt(tahun)

    let cocokRange = true
    if (rangeHarga === '0-500') {
      cocokRange = mobil.harga <= 500_000_000
    } else if (rangeHarga === '500-1000') {
      cocokRange = mobil.harga > 500_000_000 && mobil.harga <= 1_000_000_000
    } else if (rangeHarga === '1000-2000') {
      cocokRange = mobil.harga > 1_000_000_000 && mobil.harga <= 2_000_000_000
    } else if (rangeHarga === '2000+') {
      cocokRange = mobil.harga > 2_000_000_000
    }

    return (
      cocokKeyword &&
      cocokKategori &&
      cocokMerk &&
      cocokTahun &&
      cocokRange
    )
  })

  const tahunList = Array.from({ length: 2025 - 2010 + 1 }, (_, i) => 2025 - i)

  return (
    <main className="min-h-screen px-4 py-10 bg-gray-100">
      <div className="max-w-6xl mx-auto">
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
            <option value="2000+">&gt; 2 M</option>
          </select>

          <button
            onClick={resetFilter}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-3 rounded-xl transition w-full"
          >
            Reset Filter
          </button>
        </div>

        {/* Hasil Mobil */}
        {filteredMobil.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredMobil.map((mobil, index) => (
                <motion.div
                  key={mobil.id}
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
      </div>
    </main>
  )
}
