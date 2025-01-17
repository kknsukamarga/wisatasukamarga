"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

const RelatedProductsSkeleton = ({ items = 4 }: { items?: number }) => (
  <div className="mt-8 bg-orange-secondary/90 p-4 rounded-lg">
    <div className="w-40 h-6 bg-gray/10 rounded mb-4"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: items }).map((_, index) => (
        <div
          key={index}
          className="bg-gray/10 rounded-lg shadow-md p-4 space-y-4 animate-pulse"
        >
          <div className="w-full h-40 bg-gray/10 rounded-lg"></div>
          <div className="w-3/4 h-6 bg-gray/10 rounded"></div>
          <div className="w-full h-4 bg-gray/10 rounded"></div>
          <div className="w-3/4 h-4 bg-gray/10 rounded"></div>
          <div className="w-1/2 h-6 bg-gray/10 rounded"></div>
        </div>
      ))}
    </div>
    {/* Pagination Skeleton */}
    <div className="flex justify-between items-center mt-6">
      <div className="w-24 h-10 bg-gray/10 rounded"></div>
      <div className="w-24 h-6 bg-gray/10 rounded"></div>
      <div className="w-24 h-10 bg-gray/10 rounded"></div>
    </div>
  </div>
);
const fetchRelatedProducts = async () => {
  const response = await fetch("/api/umkm");
  if (!response.ok) {
    throw new Error("Failed to fetch related products");
  }
  return response.json();
};

export default function RelatedProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const {
    data: relatedProducts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["relatedProducts"],
    queryFn: fetchRelatedProducts,
  });

  const totalPages = Math.ceil(relatedProducts.length / itemsPerPage);
  const paginatedData = relatedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (isLoading) {
    return <RelatedProductsSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center">
        {error instanceof Error ? error.message : "Unknown error occurred"}
      </div>
    );
  }

  return (
    <div className="bg-orange-secondary/90 p-4 mt-8 rounded-lg">
      <h2 className="text-xl font-bold text-gray mb-4">
        Lihat Produk Lainnya...
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedData.map((item: any) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
            onClick={() => window.location.assign(`/umkm/${item.slug}`)}
          >
            <img
              src={item.image[0]}
              alt={item.product_name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-xl font-bold mb-2">{item.product_name}</h2>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {item.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">
                {item.price > 100
                  ? `Rp${item.price.toLocaleString("id-ID")},00`
                  : "Harga Hubungi Penjual"}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`text-[10px] sm:text-base px-2 sm:px-4 py-2 rounded ${
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
        <span className="text-[12px] text-center sm:text-base">
          Halaman {currentPage} dari {totalPages}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`text-[10px] sm:text-base px-2 sm:px-4 py-2 rounded ${
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
    </div>
  );
}
