'use client'

import { useState } from 'react'
import MobilSlider from './MobilSlider'
import WhatsAppButton from './WhatsAppButton'
import formatRupiah from '@/utils/formatRupiah'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import generateWaLink from '@/utils/generateWaLink'


export default function MobilDetailClient({ mobil }) {
  const [isOpen, setIsOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const handleImageClick = (i) => {
    setIndex(i)
    setIsOpen(true)
  }

  const waLink = generateWaLink(mobil)


  return (
    <main className="min-h-screen px-4 py-10 bg-white">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <MobilSlider images={mobil.gambar} onImageClick={handleImageClick} />

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-800">{mobil.nama}</h1>
          <p className="text-xl text-blue-600 font-semibold">{formatRupiah(mobil.harga)}</p>

          <div className="text-gray-700 leading-relaxed space-y-4">
            {mobil.deskripsi.split('\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>

 <WhatsAppButton link={waLink} />
      </div>

      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          index={index}
          slides={mobil.gambar.map((src) => ({ src }))}
        />
      )}
    </main>
  )
}
