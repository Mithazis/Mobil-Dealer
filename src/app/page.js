'use client'

import Link from 'next/link'
import WhatsAppButton from '@/components/WhatsAppButton'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-400 text-white py-20 px-6 text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Temukan Mobil Impian Anda
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Kami menyediakan berbagai pilihan mobil berkualitas, siap pakai dan bergaransi.
          </p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/koleksi"
              className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
            >
              Lihat Koleksi Mobil
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA WA Section */}
      <section className="py-16 px-6 text-center bg-white">
        <motion.div
          className="max-w-xl mx-auto flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-gray-800">
            Butuh Bantuan atau Mau Tanya Mobil?
          </h2>
          <p className="text-gray-600">
            Tim kami siap membantu kamu menemukan mobil yang tepat.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <WhatsAppButton
              nomor="6282117774545"
              pesan="Halo, saya tertarik ingin tanya seputar mobil yang tersedia di Dealer Mobil Non."
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Keunggulan Section */}
      <section className="py-16 px-6 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-2xl font-bold mb-4 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Kenapa memilih kami?
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Dealer Mobil Non adalah tempat terbaik untuk mendapatkan mobil idaman Anda dengan harga bersaing, proses cepat, dan layanan terpercaya.
          </motion.p>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-8">
            {[
              {
                title: 'Bergaransi',
                desc: 'Semua unit kami bergaransi resmi & lengkap surat-surat.',
              },
              {
                title: 'Harga Terbaik',
                desc: 'Transparan, tanpa biaya tersembunyi, nego sampai deal.',
              },
              {
                title: 'Layanan Profesional',
                desc: 'Didampingi sales berpengalaman dari awal hingga deal.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-xl shadow text-left hover:shadow-lg transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 + 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="font-bold text-blue-600 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
