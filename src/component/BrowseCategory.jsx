import ProductsCard from "@/component/productCard";
import {
  useAllCategories,
  useProductsByCategory,
} from "@/query/queryProducts";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ArrivalsSkeleton from "@/component/ArrivalsSkeleton";
import { RiInbox2Line } from "react-icons/ri";

const Category = () => {
  const navigate = useNavigate();


  const { data: catt, isLoading: loadingCategories } =
    useAllCategories();

  const categories = catt?.data || [];

 
  const [selectedCategory, setSelectedCategory] = useState(null);

  
  useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0].name);
    }
  }, [categories, selectedCategory]);


  const {
    data,
    isLoading,
    isError,
    error,
  } = useProductsByCategory(selectedCategory);

  const products = data?.data?.products || [];

 
  const categoryContainerRef = useRef(null);
  const activeCategoryRef = useRef(null);

  useEffect(() => {
    if (
      activeCategoryRef.current &&
      categoryContainerRef.current
    ) {
      activeCategoryRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedCategory]);

 
  const handleCategoryClick = (catName) => {
    if (catName === selectedCategory) return;
    setSelectedCategory(catName);
  };

  const handleViewMore = () => {
    if (!selectedCategory) return;
    navigate(`/category/${selectedCategory}`);
  };


  const visibleProducts = products.slice(0, 5);

  return (
    <div className="pt-6">
    <p className='font-template-lora text-2xl font-medium mb-5'>Browse by Category</p>
     
      <div
        ref={categoryContainerRef}
        className="flex gap-3 overflow-x-auto pb-3 no-scrollbar"
      >
        {categories.map((cat) => {
          const isActive =
            cat.name.toLowerCase() ===
            selectedCategory?.toLowerCase();

          return (
            <motion.button
              key={cat._id}
              ref={isActive ? activeCategoryRef : null}
              onClick={() =>
                handleCategoryClick(cat.name)
              }
              layout
              whileTap={{ scale: 0.95 }}
              className={`relative whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  isActive
                    ? "text-white"
                    : "text-gray-600 hover:text-black"
                }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-black rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}

              <span className="relative z-10 capitalize">
                {cat.name}
              </span>
            </motion.button>
          );
        })}
      </div>

      {isLoading || loadingCategories ? (
        <ArrivalsSkeleton />
      ) : isError ? (
        <p className="text-center text-red-500 mt-10">
          {error?.message || "Something went wrong"}
        </p>
      ) : visibleProducts.length === 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="flex flex-col items-center justify-center mt-16 text-center px-4"
          >
            <RiInbox2Line className="text-6xl text-gray-300 mb-4" />

            <h2 className="text-lg font-semibold text-gray-800">
              No products available
            </h2>

            <p className="text-sm text-gray-500 mt-1 max-w-sm">
              We’re currently out of stock in this
              category. Please check back later or
              explore other categories.
            </p>
          </motion.div>
        </AnimatePresence>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                         gap-6 mt-6 pb-6 w-full max-sm:gap-3"
            >
              {visibleProducts.map((product) => (
                <ProductsCard
                  key={product._id}
                  product={product}
                />
              ))}
            </motion.div>
          </AnimatePresence>

         
          <div className="flex justify-center mt-6">
            <button
              onClick={handleViewMore}
              className="px-6 py-2 rounded-full border border-gray-800 text-sm font-medium hover:bg-gray-800 hover:text-white transition"
            >
              View more
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Category;
