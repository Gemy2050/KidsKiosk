function ProductsSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="  animate-pulse bg-gray-300 rounded-lg p-4 "
          data-aos="fade-up"
        >
          <div className="h-48 w-full bg-gray-400 rounded-lg mb-4"></div>
          <div className="h-4 w-full bg-gray-400 rounded mb-2"></div>
          <div className="h-4 w-full bg-gray-400 rounded mb-5"></div>
          <div className="h-4 w-full bg-gray-400 rounded mb-2"></div>
          <div className="h-4 w-full bg-gray-400 rounded mb-5"></div>
          <div className="h-4 w-full bg-gray-400 rounded mb-2"></div>
        </div>
      ))}
    </>
  );
}

export default ProductsSkeleton;
