'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'

export default function MobilSlider({ images = [], onImageClick }) {
  const formatGambar = (url) => {
    if (!url) return '/placeholder.png'
    if (url.startsWith('http')) return url
    return `https://drive.google.com/uc?id=${url}`
  }

  if (!images.length) {
    return (
      <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center rounded-xl">
        <span className="text-gray-500">Tidak ada gambar tersedia</span>
      </div>
    )
  }

  return (
    <div className="w-full max-h-[400px] overflow-hidden rounded-xl">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="rounded-xl"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-[400px]">
              <Image
                src={formatGambar(src)}
                alt={`Foto ${i + 1}`}
                fill
                onClick={() => onImageClick?.(i)}
                className="object-cover object-center cursor-pointer hover:brightness-90 transition"
                sizes="100vw"
                priority={i === 0}
                onError={(e) => {
                  e.target.src = '/placeholder.png'
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
