import { auth } from "@/auth";
// import Hero from "@/components/guest/blog/hero";
import Footer from "@/components/guest/footer";
import Navbar from "@/components/guest/navbar";
import Main from "@/components/guest/blog/main";

export default async function Page() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.email;

  return (
    <main className="bg-white">
      <Navbar isLoggedIn={isLoggedIn} />
      {/* <Hero /> */}
      <div className="flex flex-col items-center justify-center h-screen">
        <Main />
      </div>
      <Footer />
    </main>
  );
}
