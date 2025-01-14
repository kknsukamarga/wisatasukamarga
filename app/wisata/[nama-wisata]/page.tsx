import Navbar from "@/components/guest/navbar";
import WisataDetails from "@/components/guest/wisata/detail/wisata-details";
import Hero from "@/components/guest/wisata/detail/hero";
import FooterDetailWisata from "@/components/guest/wisata/detail/footer";
import { Metadata } from "next";
import { ParralaxBanner } from "@/components/guest/wisata/detail/ParralaxBanner";

// Define the type for the dynamic params
interface PageProps {
  params: {
    "nama-wisata": string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const namaWisata = decodeURIComponent(params["nama-wisata"]);
  const wisataTitle = namaWisata
    .split("-") // Pisahkan berdasarkan tanda "-"
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Kapitalisasi huruf pertama setiap kata
    .join(" "); // Gabungkan kembali kata-kata dengan spasi

  return {
    title: `${wisataTitle} - Desa Wisata Suka Marga`,
    description: `Explore the beauty of ${wisataTitle} in Desa Wisata Suka Marga. A perfect destination for nature lovers.`,
    openGraph: {
      title: `${wisataTitle} - Desa Wisata Suka Marga`,
      description: `Discover ${wisataTitle}, a hidden gem in Desa Wisata Suka Marga.`,
      images: [
        {
          url: `https://example.com/images/${namaWisata}.jpg`, // Replace with actual image URL
          alt: `${wisataTitle}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${wisataTitle} - Desa Wisata Suka Marga`,
      description: `Discover the hidden beauty of ${wisataTitle} in Desa Wisata Suka Marga.`,
      images: [`https://example.com/images/${namaWisata}.jpg`], // Replace with actual image URL
    },
  };
}

export default function Page({ params }: PageProps) {
  const namaWisata = decodeURIComponent(params["nama-wisata"]);

  const conditionalClassName = namaWisata.includes("danau")
    ? "bg-gray text-white"
    : "bg-white text-gray";

  return (
    <main className={`mx-auto ${conditionalClassName}`}>
      <Navbar />

      <WisataDetails namaWisata={namaWisata} />

      <FooterDetailWisata link={`http://localhost:3000/wisata/detail`} />
    </main>
  );
}
