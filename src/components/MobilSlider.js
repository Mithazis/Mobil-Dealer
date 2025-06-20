'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function MobilSlider({ images, onImageClick }) {
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
            <img
              src={src}
              alt={`Foto ${i + 1}`}
              onClick={() => onImageClick?.(i)}
              className="w-full h-[400px] object-cover object-center cursor-pointer hover:brightness-90 transition"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
