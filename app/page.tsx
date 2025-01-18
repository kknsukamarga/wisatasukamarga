import { Metadata } from "next";
import { auth } from "@/auth";
import Navbar from "@/components/guest/navbar";
import Footer from "@/components/guest/footer";
import LandingPage from "@/components/guest/landingpage";
import { CDN_GITHUB_URL } from "@/lib/utils";

// Static metadata
export const metadata: Metadata = {
  title: "Desa Wisata Suka Marga",
  description:
    "Desa Wisata Sukamarga menyuguhkan kawah belerang, danau indah, sawah hijau, dan suasana asri, sempurna untuk wisata alam dan relaksasi.",
  keywords:
    "Desa, Wisata di Sukamarga, Sukamarga, Suoh, Lampung Barat, Wisata di Lampung Barat, UMKM di Suka Marga, UMKM di Lampung Barat, Danau Lebar, Danau Minyak, Keramikan, Belerang, Gajah, Taman Nasional Bukit Barisan Selatan, TNBBS",
  robots: "index, follow",
  authors: [{ name: "Desa Wisata Suka Marga" }],
  alternates: {
    canonical: "https://wisatasukamarga.my.id/",
  },
  openGraph: {
    type: "website",
    url: "https://wisatasukamarga.my.id/",
    title: "Desa Wisata Suka Marga",
    description:
      "Desa Wisata Sukamarga menawarkan keindahan alam yang memukau dengan kawah keramikan belerang, danau-danau yang indah, hamparan sawah yang hijau, serta suasana pedesaan asri. Cocok untuk destinasi wisata alam dan relaksasi.",
    images: [
      {
        url: `${CDN_GITHUB_URL}og-image/landing-page.png`, // Replace with your actual image URL
        alt: "Desa Wisata Suka Marga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desa Wisata Suka Marga",
    description:
      "Desa Wisata Sukamarga menawarkan keindahan alam yang memukau dengan kawah keramikan belerang, danau-danau yang indah, hamparan sawah yang hijau, serta suasana pedesaan asri. Cocok untuk destinasi wisata alam dan relaksasi.",
    images: [
      {
        url: `${CDN_GITHUB_URL}og-image/landing-page.png`, // Replace with your actual image URL
        alt: "Desa Wisata Suka Marga",
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
      <LandingPage />
      <Footer />
    </main>
  );
}
