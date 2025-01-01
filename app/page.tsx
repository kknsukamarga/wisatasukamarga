import { auth } from "@/auth";
import Navbar from "@/components/guest/navbar";
import Footer from "@/components/guest/footer";
import LandingPage from "@/components/guest/landingpage";

export default async function Page() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.email;

  return (
    <main className="bg-white">
      <Navbar isLoggedIn={isLoggedIn} />
      <LandingPage />
      <Footer />
    </main>
  );
}
