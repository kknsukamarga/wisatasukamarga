import { auth } from "@/auth";
import Hero from "@/components/guest/blog/hero";
import Footer from "@/components/guest/footer";
import Navbar from "@/components/guest/navbar";
import ArtikelTerbaru from "@/components/guest/blog/ArtikelTerbaru";
import SemuaArtikel from "@/components/guest/blog/SemuaArtikel";

export default async function Page() {
  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <ArtikelTerbaru />
      <SemuaArtikel />
      <Footer />
    </main>
  );
}
