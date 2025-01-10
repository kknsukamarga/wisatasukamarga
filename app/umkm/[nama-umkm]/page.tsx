"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/guest/footer";
import Navbar from "@/components/guest/navbar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const SkeletonLoader = () => (
  <div className="w-full mx-auto p-4 md:p-10 xl:py-20 xl:px-40 bg-white h-screen">
    {/* Breadcrumb Skeleton */}
    <div className="flex space-x-2 mb-8">
      <div className="w-20 h-5 bg-black/10 rounded"></div>
      <div className="w-4 h-5 bg-black/10 rounded"></div>
      <div className="w-20 h-5 bg-black/10 rounded"></div>
      <div className="w-4 h-5 bg-black/10 rounded"></div>
      <div className="w-40 h-5 bg-black/10 rounded"></div>
    </div>

    {/* Product Detail Skeleton */}
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Image Section */}
      <div className="lg:w-1/2 space-y-4">
        <div className="w-full h-[300px] md:h-[500px] bg-black/10 rounded-lg"></div>
        <div className="flex space-x-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="w-20 h-20 bg-black/10 rounded-lg"></div>
          ))}
        </div>
      </div>

      {/* Product Info Section */}
      <div className="lg:w-1/2 space-y-4">
        <div className="w-3/4 h-6 bg-black/10 rounded"></div>
        <div className="w-1/3 h-6 bg-black/10 rounded"></div>
        <div className="w-full h-20 bg-black/10 rounded"></div>
        <div className="w-1/2 h-10 bg-green-300 rounded"></div>
        <div className="flex space-x-4 items-center">
          <div className="w-24 h-6 bg-black/10 rounded"></div>
          <div className="flex space-x-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-10 h-10 bg-green-300 rounded-full"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

function BreadcrumbBlog({ slug }: { slug: string }) {
  return (
    <Breadcrumb className="max-w-7xl mx-auto mt-10">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/umkm">UMKM</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{slug}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function ProductDetailPage({
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
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = () => {
    const linkToCopy = window.location.href;

    navigator.clipboard.writeText(linkToCopy).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset feedback after 2 seconds
    });
  };

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
        <SkeletonLoader />
      </div>
    );
  }

  if (error) {
    return (
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
    );
  }

  return (
    <main className="bg-[#e5e0d5]">
      <Navbar />

      <div className="container mx-auto p-4">
        <div className="p-4">
          <div className="bg-gray-200 p-4 rounded-lg">
            {params["nama-umkm"] && (
              <BreadcrumbBlog slug={params["nama-umkm"]} />
            )}

            <div className="flex flex-col lg:flex-row mt-10">
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
                  className="bg-gray w-full hover:bg-gray/90 transition duration-200 text-white px-4 py-2 rounded-lg mb-4"
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

                <div className="flex justify-center md:justify-start items-start flex-col">
                  <span>Bagikan Produk</span>

                  <div className="flex justify-center items-center flex-col text-center w-fit">
                    <div className="flex flex-col gap-4 mt-2 relative">
                      <div className="flex gap-4 h-fit">
                        <Link
                          href="https://x.com/intent/post?text=Ayo+jalan+jalan"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white p-2 bg-green rounded-full"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                          </svg>
                        </Link>
                        <Link
                          href="https://web.facebook.com/share_channel/?type=reshare&link=https://wisatasukamarga.my.id&app_id=966242223397117&source_surface=external_reshare&display&hashtag"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white p-2 bg-green rounded-full"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                          </svg>
                        </Link>
                        <Link
                          href="https://api.whatsapp.com/send/?text=Ayo+Jalan+Jalan+ke+Sukamarga+https://wisatasukamarga.my.id&type=custom_url&app_absent=0"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white p-2 bg-green rounded-full"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"
                              fill="currentColor"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
                              fill="currentColor"
                            />
                          </svg>
                        </Link>

                        {/* Icon to copy link di page komponen ini dirender */}

                        {copySuccess && (
                          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-sm px-3 py-1 rounded-md shadow-md">
                            Link Disalin!
                          </div>
                        )}

                        <button
                          onClick={handleCopyLink}
                          className="text-white p-2 bg-green rounded-full"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 15l6 -6" />
                            <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
                            <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="bg-orange-secondary/90 p-4 mt-8 rounded-lg">
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

            <div className="flex justify-between items-center mt-6">
              <Button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${
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
                className={`px-4 py-2 rounded flex items-center ${
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
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
