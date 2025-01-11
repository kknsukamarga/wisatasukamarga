"use client";

import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/columns";
import { useState, useEffect } from "react";

export default function BlogListPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blog?mode=all");

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const { articles } = await response.json();

        if (!articles || articles.length === 0) {
          throw new Error("No blogs available.");
        }

        setData(articles);
      } catch (err) {
        setError((err as Error).message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="h-full flex-1 flex-col space-y-2 px-8 md:flex">
      <h1>List Data Blog</h1>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Here&apos;s a list of your blogs!
        </p>
      </div>
      <div className="relative">
        <DataTable
          data={data}
          columns={columns}
          isLoading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
