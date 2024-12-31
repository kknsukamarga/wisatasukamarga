import { auth, signOut } from "@/auth";
import Navbar from "@/components/guest/navbar";
import UmkmHero from "@/components/guest/umkm-hero";
import { Questa } from "@/app/fonts";

export default async function Page() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.email;

  return (
    <main className="bg-white">
      <Navbar isLoggedIn={isLoggedIn} />
      <UmkmHero />
      <div className="flex items-center justify-center">
        <h1 className={`${Questa.className} text-4xl font-bold`}>LIST UMKM</h1>
      </div>
    </main>
  );
}
