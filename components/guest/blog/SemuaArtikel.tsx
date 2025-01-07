"use client";

import { Input } from "@/components/ui/input";
import React from "react";
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
import { motion } from "framer-motion";

const SemuaArtikel = () => {
  return (
    <div className="flex flex-col items-center w-full gap-8 container mx-auto py-10">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">Semua Artikel</h1>

      {/* Search Bar */}
      <div className="relative w-11/12 md:w-1/3">
        <Input
          type="text"
          className="rounded-full bg-white border border-black text-gray-800 w-full shadow-sm focus:ring-2 focus:ring-orange-400"
          placeholder="Cari Artikel"
        />
        <span className="absolute right-3 top-2.5 text-gray-400">
          <Search size={20} />
        </span>
      </div>

      {/* Filters and Results */}
      <div className="w-full flex flex-row justify-between items-center px-4 md:px-0">
        <p className="text-gray-600 text-lg mb-4 md:mb-0 font-bold">
          Hasil dari "Suoh"
        </p>
        <Select>
          <SelectTrigger className="w-[180px] bg-white border border-black shadow-sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort Options</SelectLabel>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            className="rounded-lg shadow-md overflow-hidden bg-white cursor-pointer transition-transform"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src="https://picsum.photos/300/200"
              alt="Card Image"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <span className="text-sm text-orange-600 font-semibold uppercase bg-orange-100 rounded-full px-3 py-1 shadow">
                WISATA
              </span>
              <p className="text-xs text-gray-400 mt-2">
                Sabtu, 7 Januari 2025
              </p>
              <h2 className="text-lg font-bold text-gray-800 mt-2">
                Gajah Suoh
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Jelajahi keindahan alam Gajah Suoh yang memukau.
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SemuaArtikel;
