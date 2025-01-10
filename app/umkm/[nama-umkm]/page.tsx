"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/guest/footer";
import Navbar from "@/components/guest/navbar";
import Hero from "@/components/guest/umkm/hero";

export default function ProductDetail({
  params,
}: {
  params: { "nama-umkm": string };
}) {
  const router = useRouter();

  // State management
  const [productData, setProductData] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Limit items per page
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // New state for selected image
  const [selectedImage, setSelectedImage] = useState<string>("");

  // Fetch product details based on 'nama-umkm'
  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/umkm?slug=${params["nama-umkm"]}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }
      const product = await response.json();
      setProductData(product);
      setSelectedImage(
        product.image && product.image.length > 0 ? product.image[0] : ""
      ); // Set initial image
    } catch (err) {
      setError((err as Error).message || "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Fetch related products
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
    }
  };

  useEffect(() => {
    fetchProductDetail();
    fetchRelatedProducts();
  }, [params["nama-umkm"]]);

  // Pagination logic
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

  const handleProductClick = (slug: string) => {
    router.push(`/umkm/${slug}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="loader mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <div className="text-center text-red-600">
          <p className="font-semibold text-lg">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#e5e0d5]">
      <Navbar isLoggedIn={true} />
      <Hero />

      <div className="container mx-auto p-4">
        <div className="p-4">
          <div className="bg-gray-200 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-2">
              UMKM &gt; Kopi Lampung Suoh
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2">
                {/* Main image */}
                <img
                  src={selectedImage || "https://via.placeholder.com/150"}
                  alt={productData.product_name}
                  className="rounded-lg mb-4 lg:mb-0 aspect-square object-cover object-center max-h-[300px] w-full md:max-h-[500px]"
                />

                {/* Thumbnail images */}
                <div className="flex space-x-2 mt-2">
                  {productData.image && productData.image.length > 0 ? (
                    productData.image
                      .slice(0, 4)
                      .map((image: string, index: number) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Product image ${index + 1}`}
                          className={`w-20 h-20 rounded-lg cursor-pointer ${
                            selectedImage === image
                              ? "ring-2 ring-blue-500"
                              : ""
                          }`}
                          onClick={() => setSelectedImage(image)} // Update selected image
                        />
                      ))
                  ) : (
                    <p className="text-gray-500">No images available</p>
                  )}
                </div>
              </div>
              <div className="lg:w-1/2 lg:pl-8">
                <h1 className="text-2xl font-bold mb-2">
                  {productData.product_name}
                </h1>
                <div className="text-2xl text-green-700 font-bold mb-4">
                  Rp{productData.price.toLocaleString("id-ID")},00
                </div>
                <p className="text-gray-700 mb-4">{productData.description}</p>
                <button
                  className="bg-gray w-full hover:scale-105 transition duration-200 text-white px-4 py-2 rounded-lg mb-4"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${
                        productData.wanumber
                      }?text=Halo,%20saya%20ingin%20membeli%20produk%20${encodeURIComponent(
                        productData.description
                      )}.`,
                      "_blank"
                    )
                  }
                >
                  Beli Produk
                </button>

                <div className="flex items-center space-x-4">
                  <span>Bagikan Produk</span>
                  <button className="text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222c0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222c0-59.3-25.2-115-67.1-157m-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4l-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2c0-101.7 82.8-184.5 184.6-184.5c49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6m101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18c-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4c-32.6-16.3-54-29.1-75.5-66c-5.7-9.8 5.7-9.1 16.3-30.3c1.8-3.7.9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5c-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8c35.2 15.2 49 16.5 66.6 13.9c10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6"
                      />
                    </svg>
                  </button>
                  <button className="text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256c0 120 82.7 220.8 194.2 248.5V334.2h-52.8V256h52.8v-33.7c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287v175.9C413.8 494.8 512 386.9 512 256"
                      />
                    </svg>
                  </button>
                  <button className="text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="bg-orange-500 p-4 mt-8 rounded-lg">
            <h2 className="text-xl font-bold text-gray mb-4">
              Lihat Produk Lainnya...
            </h2>
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
                  <h2 className="text-xl font-bold mb-2">
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
                    <button
                      className="icon-btn"
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
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6 text-gray">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${
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
                className={`px-4 py-2 rounded ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
