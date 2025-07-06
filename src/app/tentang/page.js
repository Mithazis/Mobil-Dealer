import Image from 'next/image'

// SEO untuk halaman Tentang Kami
export const metadata = {
  title: 'Tentang Kami | Dealer Mobil NON',
  description: 'Kenali Dealer Mobil NON lebih dekat. Partner terpercaya Anda untuk pembelian mobil bekas berkualitas dengan layanan pengiriman ke seluruh Indonesia.',
  alternates: {
    canonical: '/tentang',
  },
}

const values = [
]

export default function TentangPage() {
  return (
    <div className="bg-white">
      <main className="relative isolate">

        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2563EB] to-[#60A5FA] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              
              {/* === LOGO DITAMBAHKAN DI SINI === */}
              <Image
                src="/assets/3d-logo.png"
                alt="Logo Dealer Mobil NON"
                width={400}
                height={100}
                className="mx-auto mb-6"
                style={{ objectFit: 'contain' }}
              />
              
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Partner Perjalanan Anda, di Mana Pun Anda Berada
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Sejak awal, kami memiliki satu misi: memberikan pengalaman membeli mobil yang transparan, mudah, dan memuaskan bagi setiap pelanggan di seluruh Indonesia.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bagian Konten & Gambar */}
      <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Lebih dari Sekadar Jual Beli, Kami Membangun Kepercayaan
              </h2>
              <p className="mt-4 text-slate-600">
                Di tengah banyaknya pilihan, kami mengerti bahwa kepercayaan adalah mata uang utama. Itulah mengapa setiap unit di Dealer Mobil NON adalah cerminan dari komitmen kami terhadap kualitas. Kami tidak hanya menjual mobil, kami menjual ketenangan.
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">Misi Kami</h3>
              <p className="mt-4 text-slate-600">
                Menjadi dealer mobil bekas paling terpercaya di Indonesia dengan memberikan produk berkualitas tinggi, harga yang adil, dan layanan pelanggan yang tak tertandingi, menjangkau setiap pelanggan di mana pun mereka berada.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Keunggulan / Nilai Kami */}
      <div className="mx-auto mt-16 max-w-7xl px-6 py-16 sm:mt-20 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center"> {/* Dibuat text-center */}
            
            {/* === LOGO DITAMBAHKAN DI SINI (KECIL) === */}
            <Image
                src="/assets/3d-logo.png"
                alt="Logo NON"
                width={150}
                height={40}
                className="mx-auto mb-4"
            />

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Komitmen Kami Pada Anda</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
                Setiap aspek dari layanan kami dirancang dengan mempertimbangkan Anda.
            </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.name} className="relative pl-9">
              <dt className="inline font-semibold text-slate-900">
                <value.icon className="absolute left-1 top-1 h-5 w-5 text-blue-600" aria-hidden="true" />
                {value.name}
              </dt>{' '}
              <dd className="inline text-slate-600">{value.description}</dd>
            </div>
          ))}
        </dl>
      </div>
      
      {/* Bagian Call to Action (CTA) */}
      <div className="bg-slate-50">
        {/* ... (Konten CTA Anda tetap sama) ... */}
      </div>

    </div>
  )
}