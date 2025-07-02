import KoleksiClient from '@/components/KoleksiClient'
import { Suspense } from 'react'

export default function KoleksiPage() {
  return (
    <main className="p-4">
      <Suspense fallback={<div>Loading koleksi...</div>}>
        <KoleksiClient />
      </Suspense>
    </main>
  )
}
