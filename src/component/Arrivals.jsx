import React from "react";
import { arrivals } from "../products/arrivals";
import ProductsCard from "./productCard";


const Arrivals = () => {

  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-2xl font-medium text-left w-full">New Arrivals</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {arrivals.map((product, index) => <ProductsCard key={index} product={product} />)}
      </div>
      
      <button  className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
        See more
      </button>
    </div>
  );
};

export default Arrivals;
