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

      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Wisata</h1>
        <p className="text-lg text-gray-500">Coming soon...</p>
      </div>
      <Footer />
    </main>
  );
}
