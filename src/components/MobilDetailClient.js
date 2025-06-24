'use client'

import { useState, useEffect } from 'react'
import MobilSlider from './MobilSlider'
import WhatsAppButton from './WhatsAppButton'
import formatRupiah from '@/utils/formatRupiah'
import generateWaLink from '@/utils/generateWaLink'
import CustomLightbox from './CustomLightbox'

export default function MobilDetailClient({ mobil }) {
  const [isOpen, setIsOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
    }
  }, [])

  const handleImageClick = (i) => {
    setIndex(i)
    setIsOpen(true)
  }

  const formatGambar = (url) => {
    if (!url || typeof url !== 'string') return '/placeholder.png'
    try {
      return url.startsWith('http')
        ? new URL(url).href
        : `https://drive.google.com/uc?id=${url}`
    } catch {
      return '/placeholder.png'
    }
  }

  const gambarFormatted = Array.isArray(mobil.gambar)
    ? mobil.gambar.map(formatGambar).filter(Boolean)
    : ['/placeholder.png']

  const waLink = generateWaLink({
    namaMobil: mobil.nama,
    fotoMobil: gambarFormatted[0],
    linkMobil: currentUrl,
  })

  return (
    <main className="min-h-screen px-4 py-10 bg-white">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <MobilSlider images={gambarFormatted} onImageClick={handleImageClick} />

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-800">{mobil.nama}</h1>
          <p className="text-xl text-blue-600 font-semibold">{formatRupiah(mobil.harga)}</p>

          <div className="text-gray-700 leading-relaxed space-y-4">
            {mobil.deskripsi?.split('\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>

        <WhatsAppButton
          namaMobil={mobil.nama}
          fotoMobil={gambarFormatted[0]}
          linkMobil={currentUrl}
        />
      </div>

      {isOpen && (
        <CustomLightbox
          images={gambarFormatted}
          initialIndex={index}
          onClose={() => setIsOpen(false)}
        />
      )}
    </main>
  )
}
