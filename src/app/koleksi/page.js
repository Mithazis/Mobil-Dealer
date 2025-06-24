import { Suspense } from 'react'
import KoleksiClient from '@/components/KoleksiClient'

export default function KoleksiPage() {
  return (
    <main className="p-4">
      <Suspense fallback={<div>Loading koleksi...</div>}>
        <KoleksiClient />
      </Suspense>
    </main>
  )
}
