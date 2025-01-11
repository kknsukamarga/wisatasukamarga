import { Metadata } from "next";
import { auth } from "@/auth";
import Hero from "@/components/guest/blog/hero";
import Footer from "@/components/guest/footer";
import Navbar from "@/components/guest/navbar";
import ArtikelTerbaru from "@/components/guest/blog/ArtikelTerbaru";
import SemuaArtikel from "@/components/guest/blog/SemuaArtikel";

// Static metadata
export const metadata: Metadata = {
  title: "Baca Artikel - Desa Suka Marga",
  description:
    "Temukan pesona tersembunyi di Desa Suka Marga, destinasi wisata yang menawarkan pengalaman unik dengan keindahan alam dan kekayaan budaya lokal. Artikel ini memandu Anda melalui atraksi, kegiatan, dan tradisi desa yang menjadikan kunjungan Anda tak terlupakan",
  robots: "index, follow",
  authors: [{ name: "Desa Wisata Suka Marga" }],
  openGraph: {
    type: "website",
    url: "https://wisatasukamarga.my.id/",
    title: "Baca Artikel - Desa Wisata Suka Marga",
    description:
      "Temukan pesona tersembunyi di Desa Suka Marga, destinasi wisata yang menawarkan pengalaman unik dengan keindahan alam dan kekayaan budaya lokal. Artikel ini memandu Anda melalui atraksi, kegiatan, dan tradisi desa yang menjadikan kunjungan Anda tak terlupakan",
    images: [
      {
        url: "https://wisatasukamarga.my.id/",
        alt: "Baca Artikel - Desa Wisata Suka Marga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baca Artikel - Desa Wisata Suka Marga",
    description:
      "Temukan pesona tersembunyi di Desa Suka Marga, destinasi wisata yang menawarkan pengalaman unik dengan keindahan alam dan kekayaan budaya lokal. Artikel ini memandu Anda melalui atraksi, kegiatan, dan tradisi desa yang menjadikan kunjungan Anda tak terlupakan",
    images: [
      {
        url: "https://wisatasukamarga.my.id/",
        alt: "Baca Artikel - Desa Wisata Suka Marga",
      },
    ],
  },
};

export default async function Page() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.email;

  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <ArtikelTerbaru />
      {/* <Kategori /> */}
      <SemuaArtikel />
      <Footer />
    </main>
  );
}
