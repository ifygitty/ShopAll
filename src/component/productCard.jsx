import React, { useMemo } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaStar, FaShoppingCart, FaCheck } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useAddToCart, useCartItems } from "@/query/queryCart";

const ProductsCard = ({ product }) => {
  const { data: cartResponse } = useCartItems();
  const { mutate: addToCart, isPending } = useAddToCart();

  const cartItems = Array.isArray(cartResponse?.data?.items)
    ? cartResponse.data.items
    : [];

  const isInCart = useMemo(() => {
    return cartItems.some(
      (item) => item.product?._id === product._id
    );
  }, [cartItems, product._id]);

  const handleAddToCart = () => {
    if (isInCart) return;

    let variantId;

    if (product.hasVariants && Array.isArray(product.variants)) {
      variantId = product.variants[0]?.id;
    }

    addToCart(
      {
        productId: product._id,
        quantity: 1,
        variantId,
      },
      {
        onSuccess: () => {
          toast.success("Item added to cart successfully");
        },
        onError: () => {
          toast.error("Failed to add item to cart");
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-1 max-w-[250px] w-full">
      <Link to={`/product/${product._id}`} className="w-full">
        <div className="relative h-52 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition"
          />
          <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow">
            <AiOutlineHeart />
          </button>
        </div>
      </Link>

      <p className="font-medium truncate">{product.name}</p>

      <div className="flex items-center gap-0.5 text-sm">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < 4 ? "text-orange-500/70" : "text-gray-300"}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-1">
        <p className="font-medium">${product.price}</p>

        <button
          onClick={handleAddToCart}
          disabled={isPending}
          className="relative text-xl p-2 rounded-full hover:bg-slate-50 disabled:opacity-60"
        >
          <AnimatePresence mode="wait">
            {!isInCart ? (
              <motion.span
                key="cart"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
              >
                <RiShoppingCartLine className="text-gray-500" />
              </motion.span>
            ) : (
              <motion.span
                key="added"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="relative"
              >
                <FaShoppingCart className="text-blue-600" />
                <FaCheck className="absolute -top-1 -right-1 text-xs text-green-500 bg-white rounded-full p-[2px]" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
};

export default ProductsCard;
