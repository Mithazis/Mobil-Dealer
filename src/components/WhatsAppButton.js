export default function WhatsAppButton({ link, nomor, pesan }) {
  // Kalau ada link langsung, pakai itu
  const finalLink = link || `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`

  return (
    <a
      href={finalLink}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition inline-block text-center"
    >
      Tanya via WhatsApp
    </a>
  )
}
