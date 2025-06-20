'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Dealer Mobil Non
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-gray-700 hover:text-blue-600">Beranda</Link>
          <Link href="/koleksi" className="text-gray-700 hover:text-blue-600">Koleksi Mobil</Link>
        </nav>
      </div>
    </header>
  )
}
