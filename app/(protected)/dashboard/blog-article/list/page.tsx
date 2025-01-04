"use client";
// import { Metadata } from "next";
import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/columns";
import { useState, useEffect } from "react";

// export const metadata: Metadata = {
//   title: "Blog Data List",
//   description: "List of blog data",
// };

export default function BlogListPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blog", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();

        if (!data || data.length === 0) {
          throw new Error("No blogs available.");
        }

        setData(data);
      } catch (err) {
        setError((err as Error).message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-full flex-1 flex-col space-y-2 px-8 md:flex">
      <h1>List Data Blog</h1>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Here&apos;s a list of your blogs!
        </p>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
