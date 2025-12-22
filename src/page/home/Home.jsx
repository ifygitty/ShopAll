import React from "react";
import Banner from "../../component/Banner";
import Arrivals from "../../component/Arrivals";
import BrowseCategory from "../../component/BrowseCategory";
import { useGetListProducts, useProductsByCategory } from "@/query/queryProducts";

const Home = () => {
  const { data, isLoading, isError, error } = useGetListProducts();
  const { data : dat, isLoading: load, isError: iserr, error: err } = useProductsByCategory("perfumes")

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;
 console.log(dat)
  console.log(data.data.data.products);

  return (
    <>
      <Banner />
      <Arrivals products={data.data.data.products} />
      <BrowseCategory />
    </>
  );
};

export default Home;
