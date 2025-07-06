import KoleksiClient from '@/components/KoleksiClient'
import { Suspense } from 'react'

export const metadata = {
  title: 'Koleksi Mobil Bekas',
  description: 'Jelajahi semua koleksi mobil bekas kami. Gunakan filter untuk mencari Toyota, Honda, Mitsubishi, dan merk lainnya dengan mudah. Semua unit siap pakai dan bergaransi.',
  alternates: {
    canonical: '/koleksi',
  },
}

export default function KoleksiPage() {
  return (
    <main className="p-4">
      <Suspense fallback={<div>Loading koleksi...</div>}>
        <KoleksiClient />
      </Suspense>
    </main>
  )
}
