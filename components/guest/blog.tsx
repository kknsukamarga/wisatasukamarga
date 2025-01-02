import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Columns, Copy, FileBadge, Signature } from "lucide-react";
import { TangoSansBold } from "@/app/fonts";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    className: "md:col-span-2",
    author: "John Doe",
    icon: <Copy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    className: "md:col-span-1",
    author: "John Doe",
    icon: <FileBadge className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    className: "md:col-span-1",
    author: "John Doe",
    icon: <Signature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
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
      <h2 className={`${TangoSansBold.className} text-2xl text-center`}>
        Blog & Artikel
      </h2>

      <BentoGridBlog />
    </div>
  );
}

export default Blog;
