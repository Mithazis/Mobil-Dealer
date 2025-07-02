'use client'

const tahunList = Array.from({ length: 2025 - 2000 + 1 }, (_, i) => 2025 - i)

const FilterBar = ({ filters, setFilters, merkList, onReset }) => {
  const { keyword, kategori, merk, tahun, rangeHarga } = filters

  const handleChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari mobil berdasarkan nama atau deskripsi..."
          value={keyword}
          onChange={(e) => handleChange('keyword', e.target.value)}
          className="w-full px-6 py-4 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
        <select value={kategori} onChange={(e) => handleChange('kategori', e.target.value)} className="px-4 py-3 border rounded-xl w-full text-sm sm:text-base">
          <option value="All">Semua Tipe</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="MPV">MPV</option>
          <option value="Coupe">Coupe</option>
          <option value="Pickup">Pickup</option>
          <option value="Jeep">Jeep</option>
          <option value="Hatchback">Hatchback</option>
        </select>
        <select value={merk} onChange={(e) => handleChange('merk', e.target.value)} className="px-4 py-3 border rounded-xl w-full text-sm sm:text-base">
          {merkList.map((m) => (
            <option key={m} value={m}>{m === 'All' ? 'Semua Merk' : m}</option>
          ))}
        </select>
        <select value={tahun} onChange={(e) => handleChange('tahun', e.target.value)} className="px-4 py-3 border rounded-xl w-full text-sm sm:text-base">
          <option value="All">Semua Tahun</option>
          {tahunList.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={rangeHarga} onChange={(e) => handleChange('rangeHarga', e.target.value)} className="px-4 py-3 border rounded-xl w-full text-sm sm:text-base">
          <option value="All">Semua Harga</option>
          <option value="0-500">0 - 500 juta</option>
          <option value="500-1000">500 juta - 1 M</option>
          <option value="1000-2000">1 M - 2 M</option>
          <option value="2000+">2 M+</option>
        </select>
        <button onClick={onReset} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-3 rounded-xl w-full text-sm sm:text-base">
          Reset Filter
        </button>
      </div>
    </>
  )
}

export default FilterBar