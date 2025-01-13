import Footer from "@/components/guest/footer";
import Hero from "@/components/guest/wisata/hero";
import Navbar from "@/components/guest/navbar";
import ScrollWisata from "@/components/guest/wisata/scroll-wisata";
import { Metadata } from "next";
import ShowcaseWisata from "@/components/guest/wisata/showcase";

export const metadata: Metadata = {
  title: "Telusuri Wisata - Desa Suka Marga",
  description:
    "Mari eksplorasi keindahan alam dan budaya Desa Suka Marga dengan informasi lengkap di sini.",
  robots: "index, follow",
  authors: [{ name: "Desa Wisata Suka Marga" }],
  openGraph: {
    type: "website",
    url: "https://wisatasukamarga.my.id/",
    title: "Telusuri Wisata - Desa Wisata Suka Marga",
    description:
      "Mari eksplorasi keindahan alam dan budaya Desa Suka Marga dengan informasi lengkap di sini.",
    images: [
      {
        url: "https://wisatasukamarga.my.id/", // Replace with your actual image URL
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
        url: "https://wisatasukamarga.my.id/", // Replace with your actual image URL
        alt: "Telusuri Wisata - Desa Wisata Suka Marga",
      },
    ],
  },
};

export default async function Page() {
  return (
    <main className="bg-white">
      <Navbar />

      <Hero />

      <ShowcaseWisata />

      <Footer />
    </main>
  );
}
