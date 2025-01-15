import { Metadata } from "next";
import Navbar from "@/components/guest/navbar";
import Footer from "@/components/guest/footer";
import Hero from "@/components/guest/umkm/hero";
import UMKMSection from "@/components/guest/umkm/UMKMSection";
import { CDN_GITHUB_URL } from "@/lib/utils";

// Define metadata for the page
export const metadata: Metadata = {
  title: "Bantu UMKM - Desa Suka Marga",
  description:
    "Dukung pertumbuhan UMKM di Desa Suka Marga melalui inisiatif yang mengedepankan kolaborasi dan inovasi lokal.",
  keywords:
    "Desa, Wisata di Sukamarga, Sukamarga, Suoh, Lampung Barat, Wisata di Lampung Barat, UMKM di Suka Marga, UMKM di Lampung Barat, Danau Lebar, Danau Minyak, Keramikan, Belerang, Gajah, Taman Nasional Bukit Barisan Selatan, TNBBS",
  authors: [{ name: "Desa Wisata Suka Marga" }],
  openGraph: {
    type: "website",
    url: "https://wisatasukamarga.my.id/umkm",
    title: "Bantu UMKM - Desa Wisata Suka Marga",
    description:
      "Dukung pertumbuhan UMKM di Desa Suka Marga melalui inisiatif yang mengedepankan kolaborasi dan inovasi lokal.",
    images: [
      {
        url: `${CDN_GITHUB_URL}og-image/umkm.png`,
        alt: "Bantu UMKM - Desa Wisata Suka Marga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bantu UMKM - Desa Wisata Suka Marga",
    description:
      "Dukung pertumbuhan UMKM di Desa Suka Marga melalui inisiatif yang mengedepankan kolaborasi dan inovasi lokal.",
    images: [
      {
        url: `${CDN_GITHUB_URL}og-image/umkm.png`,
        alt: "Bantu UMKM - Desa Wisata Suka Marga",
      },
    ],
  },
};

export default function UMKMPage() {
  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <UMKMSection />
      <Footer />
    </main>
  );
}
