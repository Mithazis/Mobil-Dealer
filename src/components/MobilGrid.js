'use client'

import { motion } from 'framer-motion'
import MobilCard from './MobilCard'
import MobilCardSkeleton from './MobilCardSkeleton'
import formatRupiah from '@/utils/formatRupiah'

const MobilGrid = ({
  mobilData,
  isLoading,
  limit
}) => {
  return (
    <>
      <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (

          Array.from({ length: limit }).map((_, index) => (
            <MobilCardSkeleton key={`skeleton-${index}`} />
          ))
        ) : mobilData.length > 0 ? (
          mobilData.map((mobil, index) => (
            <motion.div
              key={`${mobil._id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: (index % limit) * 0.05 }}
            >
              
              <MobilCard mobil={{ ...mobil, harga: formatRupiah(mobil.harga) }} />
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10">
            Tidak ada mobil yang cocok dengan filter kamu.
          </p>
        )}
      </motion.div>
    </>
  )
}

export default MobilGrid