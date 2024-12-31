import { auth, signOut } from "@/auth";
import Navbar from "@/components/guest/navbar";
import UmkmHero from "@/components/guest/umkm-hero";
import { Questa } from "@/app/fonts";
import UmkmCard from "@/components/guest/umkm-card";
export default async function Page() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.email;

  const data = [
    {
      product: "UMKM 1",
      imgUrl:
        "https://imgs.search.brave.com/_dFRx6AYLPNOTKxumMsLqar-Smiyq7el8fVLpXKJmMc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDg4/NTcyNDQxL2lkL2Zv/dG8vdGFuZ2FuLXR1/aGFuLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1nVlFKMWIt/NEJmU293aEtheVdV/dWwyT3BwOE1aRHRW/UzI5LVlOcUd2U2NF/PQ",
      address: "Jl. Raya Semarang, Semarang, Jawa Tengah, Indonesia",
    },
    {
      product: "UMKM 2",
      imgUrl:
        "https://imgs.search.brave.com/_dFRx6AYLPNOTKxumMsLqar-Smiyq7el8fVLpXKJmMc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDg4/NTcyNDQxL2lkL2Zv/dG8vdGFuZ2FuLXR1/aGFuLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1nVlFKMWIt/NEJmU293aEtheVdV/dWwyT3BwOE1aRHRW/UzI5LVlOcUd2U2NF/PQ",
      address: "Jl. aa, Semarang, Jawa Tengah, Indonesia",
    },
    {
      product: "UMKM 3",
      imgUrl:
        "https://imgs.search.brave.com/_dFRx6AYLPNOTKxumMsLqar-Smiyq7el8fVLpXKJmMc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDg4/NTcyNDQxL2lkL2Zv/dG8vdGFuZ2FuLXR1/aGFuLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1nVlFKMWIt/NEJmU293aEtheVdV/dWwyT3BwOE1aRHRW/UzI5LVlOcUd2U2NF/PQ",
      address: "Jl. Way, Semarang, Jawa Tengah, Indonesia",
    },
    {
      product: "UMKM 4",
      imgUrl:
        "https://imgs.search.brave.com/_dFRx6AYLPNOTKxumMsLqar-Smiyq7el8fVLpXKJmMc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDg4/NTcyNDQxL2lkL2Zv/dG8vdGFuZ2FuLXR1/aGFuLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1nVlFKMWIt/NEJmU293aEtheVdV/dWwyT3BwOE1aRHRW/UzI5LVlOcUd2U2NF/PQ",
      address: "Jl. Way, Semarang, Jawa Tengah, Indonesia",
    },
    {
      product: "UMKM 5",
      imgUrl:
        "https://imgs.search.brave.com/_dFRx6AYLPNOTKxumMsLqar-Smiyq7el8fVLpXKJmMc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDg4/NTcyNDQxL2lkL2Zv/dG8vdGFuZ2FuLXR1/aGFuLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1nVlFKMWIt/NEJmU293aEtheVdV/dWwyT3BwOE1aRHRW/UzI5LVlOcUd2U2NF/PQ",
      address: "Jl. Way, Semarang, Jawa Tengah, Indonesia",
    },
    {
      product: "UMKM 6",
      imgUrl:
        "https://imgs.search.brave.com/_dFRx6AYLPNOTKxumMsLqar-Smiyq7el8fVLpXKJmMc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDg4/NTcyNDQxL2lkL2Zv/dG8vdGFuZ2FuLXR1/aGFuLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1nVlFKMWIt/NEJmU293aEtheVdV/dWwyT3BwOE1aRHRW/UzI5LVlOcUd2U2NF/PQ",
      address: "Jl. Way, Semarang, Jawa Tengah, Indonesia",
    },
  ];

  return (
    <main className="bg-white">
      <Navbar isLoggedIn={isLoggedIn} />
      <UmkmHero />
      <div className="flex flex-col items-center justify-center">
        <h1 className={`${Questa.className} text-4xl font-bold`}>LIST UMKM</h1>
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
      </div>
    </main>
  );
}
