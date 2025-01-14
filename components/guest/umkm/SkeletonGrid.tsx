export default function SkeletonGrid({
  itemsPerPage,
}: {
  itemsPerPage: number;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: itemsPerPage }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-4 animate-pulse"
        >
          <div className="w-full h-48 bg-black/10 rounded-lg mb-4"></div>
          <div className="h-6 bg-black/10 rounded mb-2"></div>
          <div className="h-4 bg-black/10 rounded mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="h-6 bg-black/10 rounded w-1/3"></div>
            <div className="h-6 bg-black/10 rounded w-5"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
