import { Metadata } from "next";
import prisma from "@/lib/prisma";
import Navbar from "@/components/guest/navbar";
import Footer from "@/components/guest/footer";
import ProductDetails from "@/components/guest/umkm/ProductDetails";
import RelatedProducts from "@/components/guest/umkm/RelatedProducts";

// Function to fetch product details for metadata generation
async function getProductDetails(slug: string) {
  const product = await prisma.umkm.findUnique({
    where: { slug },
  });

  if (!product) {
    return null;
  }

  return {
    title: product.product_name,
    description: product.description.slice(0, 150) + "...",
    image:
      product.image.length > 0
        ? product.image[0]
        : "https://via.placeholder.com/150",
  };
}

// Dynamic Metadata Generation
export async function generateMetadata({
  params,
}: {
  params: { "nama-umkm": string };
}): Promise<Metadata> {
  const product = await getProductDetails(params["nama-umkm"]);

  if (!product) {
    return {
      title: "UMKM Tidak Ditemukan - Desa Suka Marga",
      description: "Halaman produk UMKM tidak ditemukan.",
    };
  }

  return {
    title: `${product.title} - Desa Suka Marga`,
    description: product.description,
    robots: "index, follow",
    authors: [{ name: "Desa Wisata Suka Marga" }],
    openGraph: {
      type: "website",
      url: `https://wisatasukamarga.my.id/umkm/${params["nama-umkm"]}`,
      title: `${product.title} - Desa Wisata Suka Marga`,
      description: product.description,
      images: [
        {
          url: product.image,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} - Desa Wisata Suka Marga`,
      description: product.description,
      images: [
        {
          url: product.image,
          alt: product.title,
        },
      ],
    },
  };
}

// The ProductDetailPage component
export default function ProductDetailPage({
  params,
}: {
  params: { "nama-umkm": string };
}) {
  return (
    <main className="bg-[#e5e0d5]">
      <Navbar />
      <div className="container mx-auto p-4">
        <ProductDetails slug={params["nama-umkm"]} />
        <RelatedProducts />
      </div>
      <Footer />
    </main>
  );
}
