'use client'

const MobilCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      <div className="relative w-full h-48 bg-gray-300"></div>
      <div className="p-4 flex flex-col gap-3">
        <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded-md w-full"></div>
        <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>
        <div className="h-8 bg-gray-300 rounded-md w-1/2 mt-2"></div>
        <div className="mt-auto h-10 bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  )
}

export default MobilCardSkeleton