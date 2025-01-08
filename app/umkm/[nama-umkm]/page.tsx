"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/guest/footer";
import Navbar from "@/components/guest/navbar";
import Hero from "@/components/guest/umkm/hero";

export default function ProductDetail({ params }: { params: { "nama-umkm": string } }) {
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
      setSelectedImage(product.image && product.image.length > 0 ? product.image[0] : ""); // Set initial image
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
                        <div className="text-sm text-gray-600 mb-2">UMKM &gt; Kopi Lampung Suoh</div>
                        <div className="flex flex-col lg:flex-row">
                            <div className="lg:w-1/2">
                             {/* Main image */}
                <img
                  src={selectedImage || "https://via.placeholder.com/150"}
                  alt={productData.product_name}
                  className="rounded-lg mb-4 lg:mb-0"
                />

                {/* Thumbnail images */}
                <div className="flex space-x-2">
                  {productData.image && productData.image.length > 0 ? (
                    productData.image.slice(0, 4).map((image: string, index: number) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className={`w-20 h-20 rounded-lg cursor-pointer ${
                          selectedImage === image ? "ring-2 ring-blue-500" : ""
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
                                <h1 className="text-2xl font-bold mb-2">{productData.product_name}</h1>
                                <div className="text-2xl text-green-700 font-bold mb-4">Rp{productData.price.toLocaleString("id-ID")},00</div>
                                <p className="text-gray-700 mb-4">
                                {productData.description}
                                </p>
                                <button className="beli-produk-btn text-white px-4 py-2 rounded-lg mb-4">Beli Produk</button>
                                <div className="flex items-center space-x-4">
                                    <span>Bagikan Produk</span>
                                    <i className="fab fa-whatsapp text-xl"></i>
                                    <i className="fas fa-envelope text-xl"></i>
                                    <i className="fab fa-facebook text-xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>
         
    
        {/* Related Products Section */}
        <div className="bg-orange-500 p-4 mt-8 rounded-lg">
          <h2 className="text-xl font-bold text-basic mb-4">Lihat Produk Lainnya...</h2>
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
                  className="rounded-t-lg mb-4"
                />
                <h2 className="text-xl font-bold mb-2">{item.product_name}</h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">
                    Rp{item.price.toLocaleString("id-ID")},00
                  </span>
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
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </main>
  );
}
