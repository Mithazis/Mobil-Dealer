// src/app/layout.js

import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dealer Mobil Non | Mobil Impian Anda',
  description: 'Website jual beli mobil baru dan bekas modern, profesional, dan terpercaya.',
  other: {
    "google-site-verification": "PRFL-MeQYRkwAETKHRgC8GwNWxUZvTF-4MY-0GIDUuQ",
    keywords: ['dealer mobil bekas', 'jual mobil bekas', 'mobil bekas berkualitas', 'showroom mobil', 'harga mobil bekas', 'Dealer Mobil NON'],
  authors: [{ name: 'Dealer Mobil NON' }],
  creator: 'Instagram : mabdul4zis',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body 
        className={`${inter.className} bg-white text-slate-800 flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}