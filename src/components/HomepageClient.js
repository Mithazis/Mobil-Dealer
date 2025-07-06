'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Tag, Users } from 'lucide-react'
import WhatsAppButton from '@/components/WhatsAppButton'


export const metadata = {
  title: 'Dealer Mobil Bekas Terpercaya di [Nama Kota Anda]',
  description: 'Dealer Mobil NON adalah partner terpercaya untuk mobil impian Anda. Kami menyediakan mobil bekas berkualitas dengan garansi, harga transparan, dan layanan profesional.',

  alternates: {
    canonical: '/',
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
}

const features = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
    title: 'Kualitas Terjamin & Bergaransi',
    desc: 'Setiap mobil telah melewati inspeksi ketat dan dilengkapi garansi resmi untuk ketenangan Anda.',
  },
  {
    icon: <Tag className="h-8 w-8 text-blue-600" />,
    title: 'Harga Terbaik & Transparan',
    desc: 'Kami menawarkan harga kompetitif tanpa biaya tersembunyi. Proses negosiasi yang adil dan terbuka.',
  },
  {
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: 'Layanan Profesional & Ramah',
    desc: 'Tim sales kami yang berpengalaman siap mendampingi Anda dari awal hingga serah terima kunci.',
  },
]
export default function HomePage() {
  return (
    <main className="bg-white text-slate-800">
      <section className="relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black text-center text-white">
        <div className="absolute inset-0 bg-[url('/assets/hero-pattern.svg')] bg-cover bg-center opacity-5" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <Image 
       src="/assets/logo.png"
       alt="Dealer Mobil NON"
       width={500}
       height={120}
       className="mx-auto mb-4 w-[300px] sm:w-[400px] lg:w-[500px]" 
       priority
         style={{ objectFit: 'contain' }}
/>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
              Partner Terpercaya Mobil Impian Anda
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
              Jelajahi koleksi mobil bekas berkualitas premium yang siap menemani setiap perjalanan Anda.
            </p>
            <motion.div
              className="mt-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/koleksi"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-blue-900 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                Lihat Koleksi Mobil
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold uppercase tracking-wider text-blue-600">
              Mengapa Memilih Kami
            </h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Pengalaman Membeli Mobil Terbaik
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-500">
              Kami berkomitmen memberikan lebih dari sekadar mobil. Kami memberikan kepastian, kepercayaan, dan kepuasan dalam setiap transaksi.
            </p>
          </div>

          <motion.div
            className="mt-16 grid gap-8 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </motion.div>
        </div>
      </section>

      <section id="kontak-kami" className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold text-slate-900">
              Siap Menemukan Mobil Anda?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Jangan ragu untuk berkonsultasi. Tim kami siap membantu Anda menemukan mobil yang paling tepat dan menjawab semua pertanyaan Anda.
            </p>
            <div className="mt-8">
              <WhatsAppButton mode="homepage" />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      variants={itemVariants}
      className="rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-900/5 transition-all duration-300 hover:shadow-xl hover:ring-blue-500"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
        {icon}
      </div>
      <h3 className="mt-6 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-base text-slate-600">{desc}</p>
    </motion.div>
  )
}