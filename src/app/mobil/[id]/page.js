'use client'

import { useEffect, useState } from 'react'
import MobilDetailClient from '@/components/MobilDetailClient'
import { useParams } from 'next/navigation'

export default function DetailMobilPage() {
  const { id } = useParams()
  const [mobil, setMobil] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const fetchMobil = async () => {
      try {
        const res = await fetch(`/api/mobil/${id}`)
        if (!res.ok) throw new Error('Mobil tidak ditemukan')
        const data = await res.json()
        setMobil(data)
      } catch (err) {
        setError(err.message)
      }
    }

    fetchMobil()
  }, [id])

  if (error) return <div className="p-8 text-center text-gray-600">Mobil tidak ditemukan.</div>
  if (!mobil) return <div className="p-8 text-center text-gray-500">Memuat data mobil...</div>

  return <MobilDetailClient mobil={mobil} />
}
