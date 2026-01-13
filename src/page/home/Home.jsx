
import React, { useState, useMemo } from "react";
import Banner from "../../component/Banner";
import Arrivals from "../../component/Arrivals";
import BrowseCategory from "../../component/BrowseCategory";
import ArrivalsSkeleton from "@/component/ArrivalsSkeleton";
import Pagination from "@/component/Pagination";
import SearchBar from "@/component/SearchBar";


import { useGetListProducts } from "@/query/queryProducts";

const LIMIT = 10;

const Home = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useGetListProducts({
    page,
    limit: LIMIT,
  });

  const products = data?.data?.data?.products ?? [];
  const pagination = data?.data?.data?.pagination;


  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;

    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const isSearching = search.trim().length > 0;

  return (
    <>
      <Banner />

      <SearchBar
        value={search}
        onSearch={(val) => setSearch(val)}
        onClear={() => setSearch("")}
      />

      {isLoading ? (
        <ArrivalsSkeleton />
      ) : isError ? (
        <p className="text-center text-red-500 mt-10">
          {error?.message || "Something went wrong"}
        </p>
      ) : filteredProducts.length === 0 ? (
        <div className="mt-16 text-center space-y-4">
          <p className="text-lg font-medium text-gray-700 max-md:text-sm">
             Sorry, we can’t find what you’re looking for
          </p>
          <button
            onClick={() => setSearch("")}
            className="mb-10 max-sm:px-3 max-sm:py-2 max-sm:text-sm px-6 py-3 rounded-full bg-black text-white hover:scale-95 transition"
          >
            Clear search
          </button>
        </div>
      ) : (
        <>
          <Arrivals products={filteredProducts} />

          
          {!isSearching && pagination && (
            <Pagination
              page={pagination.page}
              pages={pagination.pages}
              hasNext={pagination.hasNext}
              hasPrev={pagination.hasPrev}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      <BrowseCategory />
    </>
  );
};

export default Home;