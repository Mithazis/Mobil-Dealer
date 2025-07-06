'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/koleksi', label: 'Koleksi Mobil' },
    { href: '/#features', label: 'Keunggulan' },
    { href: '/tentang', label: 'Tentang Kami' },
    { href: '/#kontak-kami', label: 'Kontak' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navClass = isScrolled ? 'bg-white shadow-md' : 'bg-transparent'

  const logoSrc = '/assets/3d-logo.png' 

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClass}`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
  
        <Link href="/" className="flex-shrink-0">
          <Image
            src={logoSrc}
            alt="Dealer Mobil NON Logo"
            width={150}
            height={40}
            priority
            className="transition-all duration-300"
            style={{ objectFit: 'contain' }}
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors ${isScrolled ? 'text-slate-800 hover:text-blue-600' : 'text-white hover:text-slate-200'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={isScrolled ? 'text-slate-800' : 'text-white'}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>


      {isMenuOpen && (
        <div className="md:hidden bg-white text-slate-800 px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
                <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium hover:bg-slate-100"
                >
                {link.label}
                </Link>
            ))}
        </div>
      )}
    </header>
  )
}