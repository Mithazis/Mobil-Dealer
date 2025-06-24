// utils/generateWaLink.js

export default function generateWaLink({ namaMobil, fotoMobil, linkMobil }) {
  const nomor = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6282117774545' // fallback jika env belum disetel

  const pesan = `Halo, saya tertarik dengan mobil *${namaMobil}*.%0A%0A📸 Lihat gambar: ${fotoMobil}%0A🔗 Detail: ${linkMobil}`
  return `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`
}
