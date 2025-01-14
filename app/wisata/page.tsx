import Footer from "@/components/guest/footer";
import Hero from "@/components/guest/wisata/hero";
import Navbar from "@/components/guest/navbar";
import ScrollWisata from "@/components/guest/wisata/scroll-wisata";
import { Metadata } from "next";
import ShowcaseWisata from "@/components/guest/wisata/showcase";
import { CDN_GITHUB_URL } from "@/lib/utils";
import { ParralaxBanner } from "@/components/guest/wisata/ParralaxBanner";
import { ParallaxProvider } from "react-scroll-parallax";
import ScrollText from "@/components/guest/wisata/ScrollImage";
import ScrollMultipleImages from "@/components/guest/wisata/ScrollImage";

export const metadata: Metadata = {
  title: "Telusuri Wisata - Desa Suka Marga",
  description:
    "Mari eksplorasi keindahan alam dan budaya Desa Suka Marga dengan informasi lengkap di sini.",
  robots: "index, follow",
  authors: [{ name: "Desa Wisata Suka Marga" }],
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

      {/* <Hero /> */}

      <ScrollMultipleImages />

      {/* <ParallaxProvider>
        <ParralaxBanner />
      </ParallaxProvider> */}

      <ShowcaseWisata />

      <Footer />
    </main>
  );
}
