import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UMKMGrid({ data }: { data: any[] }) {
  if (data.length === 0) {
    return <p className="text-center">Belum ada data UMKM tersedia.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((item: any) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
        >
          <img
            src={item.image[0]}
            alt={item.product_name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <h2 className="text-xl font-bold mb-2 line-clamp-1">
            {item.product_name}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">
              Rp{((item.price + 1) * 10).toLocaleString("id-ID")},00
            </span>
            <Link href={`/umkm/${item.slug}`}>
              <Button className="icon-btn rounded-full px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
