export default function generateWaLink(mobil) {
  const domain = 'https://dealer-mobil-non.vercel.app' // domain kamu
  const urlMobil = `${domain}/mobil/${mobil.id}`
  const image = `${domain}${mobil.gambar[0]}`

  const pesan = `Halo, saya tertarik dengan mobil berikut:\n\n${mobil.nama}\n${urlMobil}\n\n(Foto mobil: ${image})`

  return `https://wa.me/${mobil.whatsapp}?text=${encodeURIComponent(pesan)}`
}
