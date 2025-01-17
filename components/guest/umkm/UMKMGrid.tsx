import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UMKMGrid({ data }: { data: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Set the number of items per page

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (data.length === 0) {
    return <p className="text-center">Belum ada data UMKM tersedia.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedData.map((item: any) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
          >
            <Link key={item.id} href={`/umkm/${item.slug}`}>
              <img
                src={item.image[0]}
                alt={item.product_name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </Link>
            <h2 className="text-xl font-bold mb-2 line-clamp-1">
              {item.product_name}
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {item.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">
                {item.price > 100
                  ? `Rp${item.price.toLocaleString("id-ID")},00`
                  : "Harga Hubungi Penjual"}
              </span>
              <Link href={`/umkm/${item.slug}`}>
                <Button className="icon-btn rounded-full px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <div className="rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <span className="hidden md:block">Sebelumnya</span>
        </Button>
        <span>
          Halaman {currentPage} dari {totalPages}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span className="hidden md:block">Selanjutnya</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </div>
    </>
  );
}
