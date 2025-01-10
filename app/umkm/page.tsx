"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/guest/footer";
import Navbar from "@/components/guest/navbar";
import Hero from "@/components/guest/umkm/hero";

export default function UMKMPage({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Limit 8 items per page
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
      <Navbar isLoggedIn={isLoggedIn} />
      <Hero />

      <div className="container mx-auto p-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">UMKM Suka Marga</h1>
          <p className="text-lg">
            Untuk mendapatkan informasi yang lebih lengkap, mendalam, dan menarik
            seputar topik ini, jangan ragu untuk membaca seluruh artikel yang telah
            kami sajikan secara detail di sini!
          </p>
        </header>

        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-center text-red-500">Error: {error}</div>}

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
                    src={item.image}
                    alt={item.product_name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h2 className="text-xl font-bold mb-2">{item.product_name}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">
                      Rp{
                        ((item.price + 1) * 10).toLocaleString('id-ID')
                      },00
                    </span>

                    {/* Button that redirects to the product page */}
                    <button className="icon-btn" onClick={() => handleProductClick(item.slug)}> 
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
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Sebelumnya
              </button>
              <span>
                Halaman {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded ${
                  currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Selanjutnya
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
