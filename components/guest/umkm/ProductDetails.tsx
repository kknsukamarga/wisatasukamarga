"use client";

import { useState, useEffect } from "react";
import SkeletonLoader from "./SkeletonLoader";
import BreadcrumbBlog from "./BreadcrumbBlog";
export default function ProductDetails({ slug }: { slug: string }) {
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/umkm?slug=${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const productData = await response.json();
        setProduct(productData);
        setSelectedImage(productData.image?.[0] || "");
      } catch (err) {
        setError((err as Error).message || "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="p-4 md:p-10 xl:py-15 xl:px-40">
      <BreadcrumbBlog slug={slug} />
      <div className="flex  flex-col lg:flex-row mt-10">
        <div className="lg:w-1/2">
          <img
            src={selectedImage}
            alt={product.product_name}
            className="rounded-lg mb-4 lg:mb-0 aspect-square object-cover object-center max-h-[300px] w-full md:max-h-[500px]"
          />
          <div className="flex space-x-2 mt-2">
            {product.image.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`Product image ${index + 1}`}
                className={`w-20 h-20 rounded-lg cursor-pointer ${
                  selectedImage === image ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 lg:pl-8">
          <h1 className="text-2xl font-bold mb-2">{product.product_name}</h1>
          <div className="text-2xl text-green-700 font-bold mb-4">
            Rp{product.price.toLocaleString("id-ID")},00
          </div>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <button
            className="bg-gray w-full hover:bg-gray/90 transition duration-200 text-white px-4 py-2 rounded-lg mb-4"
            onClick={() =>
              window.open(
                `https://wa.me/${
                  product.wanumber
                }?text=Halo,%20saya%20ingin%20membeli%20produk%20${encodeURIComponent(
                  product.product_name
                )}.`,
                "_blank"
              )
            }
          >
            Beli Produk
          </button>
        </div>
      </div>
    </div>
  );
}
