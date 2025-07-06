// src/app/page.js
// TIDAK ADA "use client" DI SINI

import HomePageClient from '@/components/HomepageClient' // Import komponen baru kita

// --- SEKARANG ANDA BISA MENGEKSPOR METADATA DENGAN AMAN ---
export const metadata = {
  title: 'Dealer Mobil Bekas Terpercaya di [Nama Kota Anda]',
  description: 'Dealer Mobil NON adalah partner terpercaya untuk mobil impian Anda. Kami menyediakan mobil bekas berkualitas dengan garansi, harga transparan, dan layanan profesional.',
  alternates: {
    canonical: '/',
  },
}

// Komponen halaman utama sekarang hanya memanggil komponen klien
export default function Page() {
  return (
    <HomePageClient />
  )
}