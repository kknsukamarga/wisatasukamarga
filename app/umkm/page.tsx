"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/guest/footer";
import Navbar from "@/components/guest/navbar";
import Hero from "@/components/guest/umkm/hero";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
    <div className="w-full h-48 bg-black/10 rounded-lg mb-4"></div>
    <div className="h-6 bg-black/10 rounded mb-2"></div>
    <div className="h-4 bg-black/10 rounded mb-4"></div>
    <div className="flex justify-between items-center">
      <div className="h-6 bg-black/10 rounded w-1/3"></div>
      <div className="h-6 bg-black/10 rounded w-5"></div>
    </div>
  </div>
);

export default function UMKMPage() {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUMKM = async () => {
    try {
      const response = await fetch("/api/umkm", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch UMKM data");
      }

      const fetchedData = await response.json();
      setData(fetchedData || []);
    } catch (err) {
      setError((err as Error).message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUMKM();
  }, []);

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

  const handleProductClick = (slug: string) => {
    router.push(`/umkm/${slug}`);
  };

  return (
    <main className="bg-[#e5e0d5]">
      <Navbar />
      <Hero />

      <div className="container mx-auto p-4 py-10">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">UMKM Suka Marga</h1>
          <p className="text-lg">
            Untuk mendapatkan informasi yang lebih lengkap, mendalam, dan
            menarik seputar topik ini, jangan ragu untuk membaca seluruh artikel
            yang telah kami sajikan secara detail di sini!
          </p>
        </header>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            {/* Mascot Image */}
            <div className="w-48 h-48 overflow-hidden">
              <Image
                src="/eror-maskot.png"
                alt="Leaf Mascot"
                width={1080}
                height={1080}
                className="rotate-[10deg]"
              />
            </div>

            {/* Error Message */}
            <h2 className="text-2xl font-bold text-red-500 mt-4">
              Oops! Sepertinya ada yang salah.
            </h2>
            <p className="text-gray-600 mt-2">
              Silakan coba refresh lagi nanti atau hubungi dukungan jika masalah
              berlanjut.
            </p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedData.map((item: any) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
                  onClick={() => handleProductClick(item.slug)}
                >
                  <img
                    src={item.image[0]}
                    alt={item.product_name}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  <h2 className="text-xl font-bold mb-2 line-clamp-1">
                    {item.product_name}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">
                      Rp{((item.price + 1) * 10).toLocaleString("id-ID")},00
                    </span>

                    {/* Button that redirects to the product page */}
                    <Button
                      className="icon-btn rounded-full px-3"
                      onClick={() => handleProductClick(item.slug)}
                    >
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
              ))}
            </div>

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
                className={`px-4 py-2 border rounded flex items-center ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
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
        )}
      </div>
      <Footer />
    </main>
  );
}
