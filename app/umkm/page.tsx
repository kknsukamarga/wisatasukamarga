"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Tambahkan import useRouter
import Footer from "@/components/guest/footer";
import Navbar from "@/components/guest/navbar";
import Footer from "@/components/guest/footer";
import { Questa } from "@/app/fonts";

export default async function Page() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.email;

  return (
    <main className="bg-white">
      <Navbar isLoggedIn={isLoggedIn} />
<<<<<<< HEAD
      <UmkmHero />
      <div className="flex items-center justify-center">
        <h1 className={`${Questa.className} text-4xl font-bold`}>LIST UMKM</h1>
=======
      <div className="min-h-[50vh] flex items-end justify-center ">
        <h1 className={`${Questa.className} text-4xl font-bold`}>LIST UMKM</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex gap-6 w-full px-32 flex-wrap items-center justify-center mt-5">
          {data.map((item, index) => (
            <UmkmCard
              key={index}
              product={item.product}
              imgUrl={item.imgUrl}
              address={item.address}
            />
          ))}
        </div>
>>>>>>> a65c22e (add umkm model and make umkm form functional)
      </div>
      <Footer />
    </main>
  );
}
