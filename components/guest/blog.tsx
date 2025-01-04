import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Columns, Copy, FileBadge, Signature } from "lucide-react";
import { TangoSansBold } from "@/app/fonts";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: (
      <Image
        src="https://picsum.photos/200/300"
        alt="The Dawn of Innovation"
        width={300}
        height={200}
        className="w-full h-full object-cover rounded-xl"
      />
    ),
    className: "md:col-span-2",
    author: "John Doe",
    icon: <Copy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: (
      <Image
        src="https://picsum.photos/200/300"
        alt="The Digital Revolution"
        width={300}
        height={200}
        className="w-full h-full object-cover rounded-xl"
      />
    ),
    className: "md:col-span-1",
    author: "John Doe",
    icon: <FileBadge className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: (
      <Image
        src="https://picsum.photos/200/300"
        alt="The Art of Design"
        width={300}
        height={200}
        className="w-full h-full object-cover rounded-xl"
      />
    ),
    className: "md:col-span-1",
    author: "John Doe",
    icon: <Signature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: (
      <Image
        src="https://picsum.photos/200/300"
        alt="The Power of Communication"
        width={300}
        height={200}
        className="w-full h-full object-cover rounded-xl"
      />
    ),
    className: "md:col-span-2",
    author: "John Doe",
    icon: <Columns className="h-4 w-4 text-neutral-500" />,
  },
];

export function BentoGridBlog() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] mt-10">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
          author={item.author}
        />
      ))}
    </BentoGrid>
  );
}

function Blog() {
  return (
    <div
      className="min-h-screen py-24 md:py:12 flex flex-col items-center justify-center"
      id="blog"
    >
      <div className="flex mx-auto justify-center items-center flex-col text-center w-fit">
        <div className="p-2 rounded-full w-fit bg-orange-primary z-20">
          <Image src="/icon-lake.png" alt="icon-lake" width={32} height={32} />
        </div>

        <h2
          className={`${TangoSansBold.className} mt-5 w-fit rounded-md text-2xl text-gray text-center`}
        >
          Blog & Artikel
        </h2>

        <p className="md:w-[50%] w-[90%] mx-auto mt-2">
          Spot Wisata Suka Marga menawarkan keindahan alam yang memukau dengan
          hamparan perbukitan hijau dan udara sejuk yang menyegarkan.
        </p>
      </div>

      <BentoGridBlog />

      <div className="w-full flex justify-center items-center">
        <Link href="/blogs" className="mx-auto">
          <Button className="mt-12">Lihat semua berita dan artikel</Button>
        </Link>
      </div>
    </div>
  );
}

export default Blog;
