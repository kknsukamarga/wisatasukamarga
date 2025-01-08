import { auth } from "@/auth";
// import Hero from "@/components/guest/blog/hero";
import Footer from "@/components/guest/footer";
import Navbar from "@/components/guest/navbar";
import ArtikelTerbaru from "@/components/guest/blog/ArtikelTerbaru";
import Kategori from "@/components/guest/blog/Kategori";
import SemuaArtikel from "@/components/guest/blog/SemuaArtikel";

export default async function Page() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.email;

  return (
    <main className="bg-white">
      <Navbar isLoggedIn={isLoggedIn} />
      {/* <Hero /> */}
      <ArtikelTerbaru />
      <Kategori />
      <SemuaArtikel />
      {/* </div> */}
      <Footer />
    </main>
  );
}
