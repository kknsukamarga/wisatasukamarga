"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Komponen Artikel
interface Artikel {
  title: string;
  coverImage: string;
  category: string;
  content: string; // Content dalam format HTML
  createdAt: string;
  slug: string; // Untuk navigasi
}

const SemuaArtikel: React.FC = () => {
  const [artikels, setArtikels] = useState<Artikel[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const router = useRouter();

  useEffect(() => {
    // Fetch articles and categories from API
    const fetchData = async () => {
      try {
        const response = await fetch("/api/blog");
        const data: Artikel[] = await response.json();

        const sortedData = data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        const uniqueCategories = Array.from(
          new Set(data.map((artikel) => artikel.category))
        );

        setArtikels(sortedData);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Gagal mengambil data artikel", error);
      }
    };

    fetchData();
  }, []);

  // Filter articles based on search term and selected category
  const filteredArtikels = artikels.filter(
    (artikel) =>
      artikel.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" || artikel.category === selectedCategory)
  );

  return (
    <div className="flex flex-col items-center w-full gap-8 container mx-auto py-10">
      {/* Search Bar */}
      <div className="relative w-11/12 md:w-1/3">
        <Input
          type="text"
          className="rounded-full bg-white border border-black text-gray-800 w-full shadow-sm focus:ring-2 focus:ring-orange-400"
          placeholder="Cari Artikel"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="absolute right-3 top-2.5 text-gray-400">
          <Search size={20} />
        </span>
      </div>

      {/* Filters and Results Header */}
      <div className="w-full flex flex-row justify-between items-center px-4 md:px-0">
        {searchTerm && (
          <p className="text-gray-600 text-lg font-bold flex-grow">
            Hasil dari "{searchTerm}"
          </p>
        )}
        <div className="ml-auto">
          <Select onValueChange={(value) => setSelectedCategory(value)}>
            <SelectTrigger className="w-[180px] bg-white border border-black shadow-sm">
              <SelectValue
                placeholder={
                  selectedCategory === "all"
                    ? "Filter by Category"
                    : selectedCategory
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
        {filteredArtikels.map((artikel, index) => (
          <motion.div
            key={index}
            className="rounded-lg shadow-md overflow-hidden bg-white cursor-pointer transition-transform"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push(`/blog/${artikel.slug}`)}
          >
            <img
              src={artikel.coverImage}
              alt={artikel.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <span className="text-sm text-orange-600 font-semibold uppercase bg-orange-100 rounded-full px-3 py-1 shadow">
                {artikel.category}
              </span>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(artikel.createdAt).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
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
    </div>
  );
};

export default SemuaArtikel;
