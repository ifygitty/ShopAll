import React from "react";
import { arrivals } from "../products/arrivals";
import ProductsCard from "./productCard";
import ProductGrid from "./ProductCard1";


const Arrivals = ({ products }) => {
  return (
    <div className="flex flex-col items-center pt-7">
      

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-10 w-full">
        {products.map((product) => (
          <ProductsCard key={product._id} product={product} />
          // <ProductGrid  key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Arrivals;

