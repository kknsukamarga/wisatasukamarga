const SkeletonLoader = () => (
  <div className="w-full mx-auto p-4 py-14 md:p-10 xl:py-20 xl:px-40 h-screen">
    {/* Breadcrumb Skeleton */}
    <div className="flex space-x-2 mb-8">
      <div className="w-20 h-5 bg-black/10 rounded"></div>
      <div className="w-4 h-5 bg-black/10 rounded"></div>
      <div className="w-20 h-5 bg-black/10 rounded"></div>
      <div className="w-4 h-5 bg-black/10 rounded"></div>
      <div className="w-40 h-5 bg-black/10 rounded"></div>
    </div>

    {/* Product Detail Skeleton */}
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Image Section */}
      <div className="lg:w-1/2 space-y-4">
        <div className="w-full h-[300px] md:h-[500px] bg-black/10 rounded-lg"></div>
        <div className="flex space-x-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="w-20 h-20 bg-black/10 rounded-lg"></div>
          ))}
        </div>
      </div>

      {/* Product Info Section */}
      <div className="lg:w-1/2 space-y-4">
        <div className="w-3/4 h-6 bg-black/10 rounded"></div>
        <div className="w-1/3 h-6 bg-black/10 rounded"></div>
        <div className="w-full h-20 bg-black/10 rounded"></div>
        <div className="w-1/2 h-10 bg-green-300 rounded"></div>
        <div className="flex space-x-4 items-center">
          <div className="w-24 h-6 bg-black/10 rounded"></div>
          <div className="flex space-x-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-10 h-10 bg-green-300 rounded-full"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonLoader;
