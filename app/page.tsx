import { auth, signOut } from "@/auth";
import Link from "next/link";
import {
  isRedirectError,
  redirect,
} from "next/dist/client/components/redirect";
import { SubmitButton } from "@/components/SubmitButton";
import Navbar from "@/components/guest/navbar";
import Hero from "@/components/guest/hero";
import About from "@/components/guest/about";
import HighlightWisata from "@/components/guest/highlight-wisata";
import HighlightUMKM from "@/components/guest/highlight-umkm";
import Testimonials from "@/components/guest/testimonials";
import InteractiveMap from "@/components/guest/interactive-map";
import Blog from "@/components/guest/blog";
import Contact from "@/components/guest/contact";
import Footer from "@/components/guest/footer";

export default async function Page() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.email;

  return (
    <main className="bg-white">
      <Navbar isLoggedIn={isLoggedIn} />
      <Hero />
      <About />
      <HighlightWisata />
      <HighlightUMKM />
      <Testimonials />
      <InteractiveMap />
      <Blog />
      <Contact />
      <Footer />

      {/* <section className="main-container">
        <h1 className="header-text">NextJS MongoDB Prisma Auth</h1>

        <p>Current User : {session?.user?.email || "None"}</p>

        {session?.user ? (
          <form
            action={async () => {
              "use server";
              try {
                await signOut({ redirect: false });
              } catch (err) {
                if (isRedirectError(err)) {
                  console.error(err);
                  throw err;
                }
              } finally {
                redirect("/");
              }
            }}
          >
            <SubmitButton
              pendingText="Signing out..."
              className="p-2 px-4 mt-4 bg-[hsl(191,52%,30%)] hover:bg-[hsl(191,52%,35%)] rounded-sm"
            >
              Sign Out
            </SubmitButton>
          </form>
        ) : (
          <Link href="/auth/sign-in">Sign In</Link>
        )}
        <Link href="/dashboard">Protected Page 🛡️</Link>
      </section> */}
    </main>
  );
}
