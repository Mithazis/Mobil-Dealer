import Link from 'next/link'
import WhatsAppButton from '@/components/WhatsAppButton'


export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-600 to-blue-400 text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Temukan Mobil Impian Anda
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Kami menyediakan berbagai pilihan mobil berkualitas, siap pakai dan bergaransi.
          </p>
          <Link
            href="/koleksi"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
          >
            Lihat Koleksi Mobil
          </Link>
        </div>
      </section>

      <section className="py-16 px-6 text-center bg-white">
  <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
    <h2 className="text-2xl font-bold text-gray-800">
      Butuh Bantuan atau Mau Tanya Mobil?
    </h2>
    <p className="text-gray-600">
      Tim kami siap membantu kamu menemukan mobil yang tepat.
    </p>
    <WhatsAppButton
      nomor="6282117774545"
      pesan="Halo, saya tertarik ingin tanya seputar mobil yang tersedia di Dealer Mobil Non."
    />
  </div>
  </section>

      <section className="py-16 px-6 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Kenapa memilih kami?
          </h2>
          <p className="text-gray-600 mb-6">
            Dealer Mobil Non adalah tempat terbaik untuk mendapatkan mobil idaman Anda dengan harga bersaing, proses cepat, dan layanan terpercaya.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-8">
            <div className="bg-white p-6 rounded-xl shadow text-left">
              <h3 className="font-bold text-blue-600 mb-2">Bergaransi</h3>
              <p className="text-sm text-gray-600">Semua unit kami bergaransi resmi & lengkap surat-surat.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-left">
              <h3 className="font-bold text-blue-600 mb-2">Harga Terbaik</h3>
              <p className="text-sm text-gray-600">Transparan, tanpa biaya tersembunyi, nego sampai deal.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-left">
              <h3 className="font-bold text-blue-600 mb-2">Layanan Profesional</h3>
              <p className="text-sm text-gray-600">Didampingi sales berpengalaman dari awal hingga deal.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
