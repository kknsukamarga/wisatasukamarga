"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useInView from "@/hooks/useInView";

interface Artikel {
  title: string;
  coverImage: string;
  category: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  view_count: number;
}

const SkeletonCard = () => (
  <div className="rounded-lg shadow-md bg-white overflow-hidden p-2">
    <div className="w-full h-48 bg-black/10 animate-pulse"></div>
    <div className="p-4">
      <div className="w-24 h-6 bg-black/10 rounded-full animate-pulse"></div>
      <div className="w-32 h-4 bg-black/10 mt-2 rounded animate-pulse"></div>
      <div className="w-full h-6 bg-black/10 mt-4 rounded animate-pulse"></div>
      <div className="w-3/4 h-4 bg-black/10 mt-2 rounded animate-pulse"></div>
    </div>
  </div>
);

const SemuaArtikel: React.FC = () => {
  const [artikels, setArtikels] = useState<Artikel[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  const { ref, inView } = useInView();

  useEffect(() => {
    const fetchData = async () => {
      setInitialLoading(true);

      try {
        const response = await fetch("/api/blog");
        const data = await response.json();
        const { articles, categories, next_cursor } = data;

        setArtikels(articles || []);
        setCategories(categories || []);
        setNextCursor(next_cursor || null);
      } catch (error) {
        console.error("Gagal mengambil data artikel", error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (inView && nextCursor && !loading) {
      handleLoadMore();
    }
  }, [inView, nextCursor, loading]);

  const handleLoadMore = async () => {
    if (!nextCursor || loading) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/blog?cursor=${nextCursor}`);
      const data = await response.json();
      const { articles, next_cursor } = data;

      setArtikels((prev) => [...prev, ...articles]);
      setNextCursor(next_cursor || null);
    } catch (error) {
      console.error("Gagal memuat lebih banyak artikel", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArtikels = artikels.filter(
    (artikel) =>
      artikel.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" || artikel.category === selectedCategory)
  );

  return (
    <div className="flex flex-col items-center w-full gap-8 container mx-auto py-10">
      <div className="relative w-11/12 md:w-1/3">
        <Input
          type="text"
          className="rounded-full bg-white border border-black text-gray-800 w-full"
          placeholder="Cari Artikel"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="absolute right-3 top-2.5 text-gray-400">
          <Search size={20} />
        </span>
      </div>

      <div className="w-full flex flex-row justify-between items-center px-4 md:px-0">
        {searchTerm && (
          <p className="text-gray-600 text-lg font-bold flex-grow">
            Hasil dari "{searchTerm}"
          </p>
        )}

        <div className="ml-auto px-4">
          <Select onValueChange={(value) => setSelectedCategory(value)}>
            <SelectTrigger className="w-[180px] bg-white border border-black shadow-sm">
              <SelectValue
                placeholder={
                  selectedCategory === "all"
                    ? "Filter kategori"
                    : selectedCategory.replace("_", " ") // Ganti "_" dengan " "
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Kategori</SelectLabel>
                <SelectItem value="all">Semua</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
        {initialLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : filteredArtikels.map((artikel, index) => (
              <motion.div
                key={index}
                className="rounded-lg shadow-md overflow-hidden bg-white cursor-pointer transition-transform duration-200"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push(`/blog/${artikel.slug}`)}
              >
                <img
                  src={artikel.coverImage}
                  alt={artikel.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-sm font-semibold -ml-1 uppercase bg-orange-secondary/80 text-gray rounded-full px-2 py-1 shadow-md">
                        {artikel.category.replace("_", " ")}
                      </span>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(artikel.updatedAt).toLocaleDateString(
                          "id-ID",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs  rounded-md bg-gray px-3 py-1 text-white">
                        Dibaca {artikel.view_count}x
                      </p>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 mt-2">
                    {artikel.title}
                  </h2>
                  <div
                    className="text-sm text-gray-600 mt-2"
                    dangerouslySetInnerHTML={{
                      __html:
                        artikel.content.slice(0, 150) +
                        (artikel.content.length > 150 ? "..." : ""),
                    }}
                  />
                </div>
              </motion.div>
            ))}
      </div>

      <div ref={ref} className="w-full flex justify-center mt-6">
        {loading ? (
          <p className="text-gray-500 flex items-center gap-2">
            <Loader2 className="animate-spin" />
            Memuat artikel lainnya...
          </p>
        ) : !nextCursor && artikels.length ? (
          <p className="text-gray-500">Tidak ada artikel lagi.</p>
        ) : null}
      </div>
    </div>
  );
};

export default SemuaArtikel;
