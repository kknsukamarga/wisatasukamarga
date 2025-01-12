"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SkeletonLoader from "./SkeletonLoader";

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

export default function RelatedProducts() {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch("/api/umkm");
        if (!response.ok) {
          throw new Error("Failed to fetch related products");
        }
        const products = await response.json();
        setRelatedProducts(products || []);
      } catch (err) {
        setError((err as Error).message || "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, []);

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

  if (loading) {
    return <RelatedProductsSkeleton />;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
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
                Rp{((item.price + 1) * 10).toLocaleString("id-ID")},00
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Sebelumnya
        </Button>
        <span>
          Halaman {currentPage} dari {totalPages}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Selanjutnya
        </Button>
      </div>
    </div>
  );
}
