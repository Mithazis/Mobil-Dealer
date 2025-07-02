'use client'

import { useState, useEffect, useCallback, useTransition } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import FilterBar from './FilterBar'
import MobilGrid from './MobilGrid'
import Pagination from './Pagination' // <-- 1. Import komponen Pagination

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}

export default function KoleksiClient() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [mobilData, setMobilData] = useState([])
  const [totalPages, setTotalPages] = useState(0) // <-- 2. Ganti hasMore dengan totalPages
  const [isLoading, setIsLoading] = useState(true) // <-- 3. Set isLoading true di awal
  const [merkList, setMerkList] = useState(['All'])
  const [isPending, startTransition] = useTransition()

  // Ambil halaman saat ini dari URL atau default ke 1
  const currentPage = Number(searchParams.get('page')) || 1

  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    kategori: searchParams.get('tipe') || 'All',
    merk: searchParams.get('merk') || 'All',
    tahun: searchParams.get('tahun') || 'All',
    rangeHarga: searchParams.get('harga') || 'All',
  })

  const debouncedKeyword = useDebounce(filters.keyword, 500)
  const limit = 9

  // Efek untuk mengambil daftar merk (tidak berubah)
  useEffect(() => {
    const fetchMerkList = async () => {
      try {
        const res = await fetch('/api/merk')
        const data = await res.json()
        setMerkList(['All', ...data])
      } catch (err) {
        console.error('Gagal ambil daftar merk:', err)
      }
    }
    fetchMerkList()
  }, [])

  // Efek untuk memperbarui URL saat filter berubah
  // Saat filter berubah, kita reset ke halaman 1
  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedKeyword) params.set('keyword', debouncedKeyword)
    if (filters.kategori !== 'All') params.set('tipe', filters.kategori)
    if (filters.merk !== 'All') params.set('merk', filters.merk)
    if (filters.tahun !== 'All') params.set('tahun', filters.tahun)
    if (filters.rangeHarga !== 'All') params.set('harga', filters.rangeHarga)
    // Jangan tambahkan 'page' di sini, biarkan URL bersih.
    // Perubahan filter akan memicu fetch data yang akan dimulai dari halaman 1.

    startTransition(() => {
      // Ganti `replace` dengan `push` agar user bisa kembali menggunakan tombol back browser
      // `scroll: false` agar tidak loncat ke atas saat mengetik filter
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }, [debouncedKeyword, filters.kategori, filters.merk, filters.tahun, filters.rangeHarga, pathname, router])


  // <-- 4. EFEK UTAMA UNTUK MENGAMBIL DATA -->
  // Efek ini akan berjalan setiap kali searchParams (filter atau halaman) berubah
  useEffect(() => {
    const fetchMobil = async () => {
      setIsLoading(true)

      // Salin parameter yang ada dari URL (termasuk filter)
      const query = new URLSearchParams(searchParams.toString())
      // Pastikan parameter page dan limit selalu ada
      query.set('page', currentPage.toString())
      query.set('limit', limit.toString())

      try {
        const res = await fetch(`/api/mobil?${query.toString()}`)
        const json = await res.json()

        if (json.success) {
          // Ganti data lama dengan data baru, bukan menambahkan
          setMobilData(json.data)
          // Simpan total halaman dari respons API
          setTotalPages(json.totalPages)
        } else {
          // Jika gagal, reset state
          setMobilData([])
          setTotalPages(0)
          console.error('Gagal memuat data mobil:', json.error)
        }
      } catch (err) {
        console.error('Terjadi kesalahan:', err)
        setMobilData([])
        setTotalPages(0)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMobil()
    // Trigger setiap kali searchParams berubah (filter atau halaman)
  }, [searchParams, currentPage]) // dependensi utama adalah searchParams


  // 5. Fungsi untuk menangani perpindahan halaman
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    
    // Gunakan `push` dan `scroll: true` agar halaman berpindah dan scroll ke atas
    router.push(`${pathname}?${params.toString()}`, { scroll: true })
  }

  const resetFilters = () => {
    setFilters({
      keyword: '',
      kategori: 'All',
      merk: 'All',
      tahun: 'All',
      rangeHarga: 'All',
    })
    // Cukup push ke pathname, ini akan membersihkan semua query params
    router.push(pathname, { scroll: false })
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Koleksi Mobil Kami
      </h1>

      <FilterBar
        filters={filters}
        setFilters={setFilters}
        merkList={merkList}
        onReset={resetFilters}
      />

      {/* 6. Update props untuk MobilGrid */}
      <MobilGrid
        mobilData={mobilData}
        isLoading={isLoading || isPending}
        limit={limit}
      />
      
      {/* 7. Tambahkan komponen Pagination di bawah grid */}
      {!isLoading && totalPages > 0 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
      )}

      {/* Komponen lain seperti Floating WhatsApp bisa tetap di sini */}
    </>
  )
}