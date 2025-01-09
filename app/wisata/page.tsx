import { auth } from "@/auth";
import Footer from "@/components/guest/footer";
import Hero from "@/components/guest/wisata/hero";
import Navbar from "@/components/guest/navbar";
import ScrollWisata from "@/components/guest/wisata/scroll-wisata";

export default async function Page() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.email;

  return (
    <main className="bg-white">
      <Navbar isLoggedIn={isLoggedIn} />

      <Hero />

      <ScrollWisata />
      <ScrollWisata />
      <ScrollWisata />

      <Footer />
    </main>
  );
}
