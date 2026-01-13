import ProductsCard from '@/component/productCard';
import { useAllCategories, useProductsByCategory } from '@/query/queryProducts';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ArrivalsSkeleton from '@/component/ArrivalsSkeleton';
import { RiInbox2Line } from 'react-icons/ri';
import SearchBar from '@/component/SearchBar';
import Pagination from '@/component/Pagination';

const Category = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1)
  const LIMIT = 10;

  const { data: catt, isLoading: loadingCategories } = useAllCategories();
  const { data, isLoading, isError, error } = useProductsByCategory(title);
  const products = data?.data?.products || [];
  console.log(data)
  const pagination = data?.data?.pagination;

  const cata = catt?.data || [];


  const categoryContainerRef = useRef(null);
  const activeCategoryRef = useRef(null);




  
  useEffect(() => {
    if (activeCategoryRef.current && categoryContainerRef.current) {
     
      activeCategoryRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [title, cata]);

  const handleCategoryClick = (catTitle) => {
    if (catTitle === title) return;
    navigate(`/category/${catTitle}`);
  };



  const filteredProducts = useMemo(() => {
      if (!search.trim()) return products;
  
      return products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }, [products, search]);

    const isSearching = search.trim().length > 0;

  return (
    <div className="pt-6">


      <div
        ref={categoryContainerRef}
        className="flex gap-3 overflow-x-auto pb-3 no-scrollbar"
      >
        {cata.map((cat) => {
          const isActive = cat.name.toLowerCase() === title?.toLowerCase();

          return (
            <motion.button
              key={cat._id}
              onClick={() => handleCategoryClick(cat.name)}
              ref={isActive ? activeCategoryRef : null} 
              layout
              whileTap={{ scale: 0.95 }}
              className={`relative whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors
                ${isActive
                  ? 'text-white'
                  : 'text-gray-600 hover:text-black'
                }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-black rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              <span className="relative z-10 capitalize">
                {cat.name}
              </span>
            </motion.button>
          );
        })}
      </div>

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
        <AnimatePresence mode="wait">
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center justify-center mt-16 text-center px-4"
          >
            <RiInbox2Line className="text-6xl text-gray-300 mb-4" />

            <h2 className="text-lg font-semibold text-gray-800">
              No products available
            </h2>

            <p className="text-sm text-gray-500 mt-1 max-w-sm">
              We’re currently out of stock in this category.  
              Please check back later or explore other categories.
            </p>
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                       gap-6 mt-6 pb-14 w-full max-sm:gap-3"
          >
            {filteredProducts.map((product) => (
              <ProductsCard key={product._id} product={product} />
            ))}

            {/* {!isSearching && pagination && (
            <Pagination
              page={pagination.page}
              pages={pagination.pages}
              hasNext={pagination.hasNext}
              hasPrev={pagination.hasPrev}
              onPageChange={setPage}
            />
          )} */}
          </motion.div>
        </AnimatePresence>
      )}

    </div>
  );
};

export default Category;
