'use client'

import generateWaLink from '@/utils/generateWaLink'

export default function WhatsAppButton({ namaMobil, fotoMobil, linkMobil, customMessage }) {
  const waLink = generateWaLink({ namaMobil, fotoMobil, linkMobil, customMessage })

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition"
    >
      Tanya via WhatsApp
    </a>
  )
}
