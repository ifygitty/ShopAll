import ProductCardSkeleton from "./ProductCardSkeleton";
const ArrivalsSkeleton = () => {
  return (
    <section className="px-4 md:px-8 mt-10">
      <div className="mb-6">
        <div className="h-6 w-40 bg-gray-300 rounded animate-pulse" />
      </div>

      <div className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-5 
        gap-4
      ">
        {Array.from({ length: 10 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
};

export default ArrivalsSkeleton;
