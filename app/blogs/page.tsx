import { auth } from "@/auth";
import Hero from "@/components/guest/blog/hero";
import Footer from "@/components/guest/footer";
import Navbar from "@/components/guest/navbar";

export default async function Page() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.email;

  return (
    <main className="bg-white">
      <Navbar isLoggedIn={isLoggedIn} />

      <Hero />

      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Blogs</h1>
        <p className="text-lg text-gray-500">Coming soon...</p>
      </div>
      <Footer />
    </main>
  );
}