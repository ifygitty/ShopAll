import React from "react";
import Banner from "../../component/Banner";
import Arrivals from "../../component/Arrivals";
import BrowseCategory from "../../component/BrowseCategory";

import ArrivalsSkeleton from "@/component/ArrivalsSkeleton";

import { useGetListProducts } from "@/query/queryProducts";

const Home = () => {
  const { data, isLoading, isError, error } = useGetListProducts();


  const products = data?.data?.data?.products ?? [];
  console.log(products)

  return (
    <>
      <Banner />
      {isLoading ? (
        <ArrivalsSkeleton />
      ) : isError ? (
        <p className="text-center text-red-500 mt-10">
          {error?.message || "Something went wrong"}
        </p>
      ) : (
        <Arrivals products={products} />
      )}

      <BrowseCategory />
    </>
  );
};

export default Home;
