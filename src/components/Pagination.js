'use client'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Jangan tampilkan pagination jika hanya ada 1 halaman atau kurang
  if (totalPages <= 1) {
    return null;
  }

  // Logika untuk menentukan nomor halaman yang akan ditampilkan di desktop
  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageRangeDisplayed = 2; // Jumlah halaman di sekitar halaman saat ini
    const ellipsis = '...';

    if (totalPages <= 7) { // Tampilkan semua jika total halaman sedikit
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1); // Selalu tampilkan halaman pertama

      const startPage = Math.max(2, currentPage - pageRangeDisplayed);
      const endPage = Math.min(totalPages - 1, currentPage + pageRangeDisplayed);

      if (startPage > 2) {
        pageNumbers.push(ellipsis);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push(ellipsis);
      }

      pageNumbers.push(totalPages); // Selalu tampilkan halaman terakhir
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();
  
  // Kelas dasar untuk tombol agar tidak duplikat kode
  const baseButtonClasses = "px-4 py-2 text-sm font-medium border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
  const activeButtonClasses = "bg-blue-600 text-white border-blue-600 cursor-default";
  const defaultButtonClasses = "bg-white text-gray-700 border-gray-300 hover:bg-gray-100";
  const disabledButtonClasses = "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed";

  return (
    <nav className="mt-8 flex justify-between sm:justify-center items-center w-full" aria-label="Pagination">
      {/* Tombol "Sebelumnya" */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${baseButtonClasses} ${currentPage === 1 ? disabledButtonClasses : defaultButtonClasses}`}
      >
        <span aria-hidden="true">«</span>
        {/* Teks "Sebelumnya" hanya muncul di layar 'sm' ke atas */}
        <span className="hidden sm:inline ml-2">Sebelumnya</span>
      </button>

      {/* Tampilan Tengah: Berubah sesuai ukuran layar */}
      <div className="flex items-center">
        {/* Tampilan MOBILE: "Halaman X dari Y" */}
        {/* Muncul di layar kecil, hilang di layar 'sm' ke atas */}
        <div className="block sm:hidden text-sm font-medium text-gray-700 px-4">
          Halaman {currentPage} dari {totalPages}
        </div>

        {/* Tampilan DESKTOP: Nomor-nomor halaman */}
        {/* Hilang di layar kecil, muncul sebagai flex di layar 'sm' ke atas */}
        <div className="hidden sm:flex mx-2">
          {pageNumbers.map((page, index) =>
            typeof page === 'number' ? (
              <button
                key={`page-${page}`}
                onClick={() => onPageChange(page)}
                className={`${baseButtonClasses} mx-1 ${currentPage === page ? activeButtonClasses : defaultButtonClasses}`}
              >
                {page}
              </button>
            ) : (
              <span key={`ellipsis-${index}`} className="mx-1 px-2 py-2 text-sm text-gray-500 self-end">
                {page}
              </span>
            )
          )}
        </div>
      </div>

      {/* Tombol "Selanjutnya" */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${baseButtonClasses} ${currentPage === totalPages ? disabledButtonClasses : defaultButtonClasses}`}
      >
        {/* Teks "Selanjutnya" hanya muncul di layar 'sm' ke atas */}
        <span className="hidden sm:inline mr-2">Selanjutnya</span>
        <span aria-hidden="true">»</span>
      </button>
    </nav>
  );
};

export default Pagination;