export default function generateWaLink({ namaMobil, fotoMobil, linkMobil, customMessage } = {}) {
  const phoneNumber = '6282117774545'

  let message = ''

  if (customMessage) {
    message = customMessage
  } else if (namaMobil && linkMobil) {
    message =
      `Halo, saya tertarik dengan mobil berikut:\n\n` +
      `🚘 ${namaMobil}\n` +
      (fotoMobil ? `🖼️ Foto: ${fotoMobil}\n` : '') +
      `🔗 Link: ${linkMobil}\n\n` +
      `Saya ingin informasi lebih lanjut, terima kasih.`
  } else {
    message = 'Halo saya tertarik dengan mobil yang ada di website Dealer Mobil Non.'
  }

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}
