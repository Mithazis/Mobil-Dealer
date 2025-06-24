'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function CustomLightbox({ images = [], initialIndex = 0, onClose }) {
  const [index, setIndex] = useState(initialIndex)

  useEffect(() => {
    setIndex(initialIndex)
  }, [initialIndex])

  if (!images.length) return null

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      {/* Tombol Tutup */}
      <button
        onClick={onClose}
        className="absolute top-4 right-6 text-white text-3xl hover:text-red-500"
        title="Tutup"
      >
        ✕
      </button>

      {/* Tombol kiri */}
      {images.length > 1 && (
        <button
          onClick={prevImage}
          className="absolute left-4 text-white text-4xl px-2 hover:text-blue-300"
          title="Sebelumnya"
        >
          ‹
        </button>
      )}

      {/* Gambar */}
      <div className="relative w-full max-w-4xl h-[70vh]">
        <Image
          src={images[index]}
          alt={`Slide ${index + 1}`}
          fill
          priority
          className="object-contain rounded-xl"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>

      {/* Tombol kanan */}
      {images.length > 1 && (
        <button
          onClick={nextImage}
          className="absolute right-4 text-white text-4xl px-2 hover:text-blue-300"
          title="Selanjutnya"
        >
          ›
        </button>
      )}
    </div>
  )
}
