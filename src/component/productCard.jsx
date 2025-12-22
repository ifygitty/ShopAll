import React, { useState, useMemo } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useAddToCart, useCartItems } from "@/query/queryCart";

const ProductsCard = ({ product }) => {
  const [currency] = useState("$");

  const { data: cartResponse } = useCartItems();
  const { mutate: addToCart, isPending } = useAddToCart();

  const cartItems = Array.isArray(cartResponse?.data?.items)
  ? cartResponse.data.items
  : [];

  console.log(cartItems)


  const isInCart = useMemo(() => {
  return cartItems.some(
    (item) => item.product?._id === product._id
  );
}, [cartItems, product._id]);


  const handleAddToCart = () => {
    addToCart({
  productId: product._id,
  quantity: 2,
});
  };

  return (
    <div className="flex flex-col items-start gap-0.5 max-w-[250px] w-full">
      <Link to={`/product/${product._id}`} className="w-full">
        <div className="relative h-52 bg-gray-100 overflow-hidden rounded-lg">
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

      <p className="font-medium pt-2 truncate w-full">{product.name}</p>

      <div className="flex items-center gap-0.5 text-sm">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar
            key={i}
            className={i < 4 ? "text-orange-600/60" : "text-gray-300"}
          />
        ))}
      </div>

      <div className="flex items-end justify-between w-full mt-1">
        <p className="text-base font-medium">
          {currency}
          {product.price}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={isPending}
          className="text-xl px-4 py-1.5 transition hover:bg-slate-50"
        >
          {isInCart ? (
            <FaShoppingCart className="text-blue-600/70" />
          ) : (
            <RiShoppingCartLine className="text-gray-500" />
           )} 
        </button>
      </div>
    </div>
  );
};

export default ProductsCard;
