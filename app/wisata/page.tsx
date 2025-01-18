import Footer from "@/components/guest/footer";
import Navbar from "@/components/guest/navbar";
import { Metadata } from "next";
import ShowcaseWisata from "@/components/guest/wisata/showcase";
import { CDN_GITHUB_URL } from "@/lib/utils";
import ScrollMultipleImages from "@/components/guest/wisata/ScrollImage";

export const metadata: Metadata = {
  title: "Telusuri Wisata - Desa Suka Marga",
  description:
    "Mari eksplorasi keindahan alam dan budaya Desa Suka Marga dengan informasi lengkap di sini.",
  keywords:
    "Desa, Wisata di Sukamarga, Sukamarga, Suoh, Lampung Barat, Wisata di Lampung Barat, UMKM di Suka Marga, UMKM di Lampung Barat, Danau Lebar, Danau Minyak, Keramikan, Belerang, Gajah, Taman Nasional Bukit Barisan Selatan, TNBBS",
  robots: "index, follow",
  authors: [{ name: "Desa Wisata Suka Marga" }],
  alternates: {
    canonical: "https://wisatasukamarga.my.id/",
  },
  openGraph: {
    type: "website",
    url: "https://wisatasukamarga.my.id/wisata",
    title: "Telusuri Wisata - Desa Wisata Suka Marga",
    description:
      "Mari eksplorasi keindahan alam dan budaya Desa Suka Marga dengan informasi lengkap di sini.",
    images: [
      {
        url: `${CDN_GITHUB_URL}og-image/wisata.png`, // Replace with your actual image URL
        alt: "Telusuri Wisata - Desa Wisata Suka Marga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Telusuri Wisata - Desa Wisata Suka Marga",
    description:
      "Mari eksplorasi keindahan alam dan budaya Desa Suka Marga dengan informasi lengkap di sini.",
    images: [
      {
        url: `${CDN_GITHUB_URL}og-image/wisata.png`, // Replace with your actual image URL
        alt: "Telusuri Wisata - Desa Wisata Suka Marga",
      },
    ],
  },
};

export default async function Page() {
  return (
    <main className="bg-white">
      <Navbar />

      <ScrollMultipleImages />

      <ShowcaseWisata />

      <Footer />
    </main>
  );
}
