"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function truncateRichText(html: string | undefined, wordLimit: number): string {
  if (!html) {
    return ""; // Jika html tidak terdefinisi, kembalikan string kosong
  }

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent || tempDiv.innerText || "";

  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError((err as Error).message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <main className="bg-white">
      <div className="container mx-auto px-6 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-accent text-lg font-medium animate-pulse">
              Loading blogs...
            </p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500 text-lg font-medium">{`Error: ${error}`}</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Link href={`/blog/${blog.slug}`}>
                  <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 hover:shadow-xl transition duration-300 ease-in-out cursor-pointer">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-40 object-cover rounded-t-lg mb-4"
                    />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:underline">
                      {blog.title}
                    </h2>
                    <div
                      className="text-gray-600 mb-4 text-sm md:text-base overflow-hidden break-words"
                      style={{ maxWidth: "100%", wordWrap: "break-word" }}
                      dangerouslySetInnerHTML={{
                        __html: truncateRichText(blog.content, 25),
                      }}
                    ></div>
                    <p className="text-gray-500 text-xs md:text-sm mb-2">
                      Author: {blog.author}
                    </p>
                    <span className="text-gray-500 text-xs md:text-sm">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
