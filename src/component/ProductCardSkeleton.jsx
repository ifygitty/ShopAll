const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow p-3">
      {/* Image */}
      <div className="bg-gray-300 h-40 w-full rounded-lg" />

      {/* Text */}
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
      </div>

      {/* Price */}
      <div className="h-4 bg-gray-300 rounded w-1/3 mt-3" />
    </div>
  );
};

export default ProductCardSkeleton;
