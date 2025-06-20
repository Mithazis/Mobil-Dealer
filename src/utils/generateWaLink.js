import formatRupiah from './formatRupiah'

export default function generateWaLink(mobil, domain = '') {
  const imageURL = `${domain}${mobil.gambar.startsWith('/') ? mobil.gambar : '/' + mobil.gambar}`

  const pesan = `Halo, saya tertarik dengan mobil berikut:

📌 *${mobil.nama}*
Merk: ${mobil.merk}
Tipe: ${mobil.tipe}
Tahun: ${mobil.tahun}
Harga: ${formatRupiah(mobil.harga)}

🖼️ Foto Mobil:
${imageURL}

Apakah mobil ini masih tersedia? Terima kasih.`

  const encodedPesan = encodeURIComponent(pesan)

  return `https://wa.me/${mobil.whatsapp}?text=${encodedPesan}`
}
