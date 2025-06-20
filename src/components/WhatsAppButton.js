'use client'

export default function WhatsAppButton({ nomor, pesan }) {
  const noWA = nomor.startsWith('62') ? nomor : `62${nomor}`

  const url = `https://wa.me/${noWA}?text=${encodeURIComponent(pesan)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl text-center transition duration-200 shadow-md w-full sm:w-auto"
    >
      Tanya via WhatsApp
    </a>
  )
}
