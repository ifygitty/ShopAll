import React, { useMemo, useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaStar, FaShoppingCart,  } from "react-icons/fa";
import {
  RiLink,
  RiShoppingCartLine,
  RiAddLine,
  RiSubtractLine,
  RiErrorWarningFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";

import { toast } from "sonner";

import {
  useAddToCart,
  useCartItems,
  useGetWishListItems,
  useWishList,
  useUpdateCartItemQuantity,
  useUpdateCartItemQuantityVariant,
} from "@/query/queryCart";
import { motion, AnimatePresence } from "framer-motion";
import {

  
  RiCloseLine,
  
} from "react-icons/ri";
import { FaCheck } from "react-icons/fa";

import { formatPrice } from "@/utils/format";



const ProductQuickAddDrawer = ({ product, open, onClose }) => {
  const { data: cartResponse } = useCartItems();
  const cartItems = cartResponse?.data?.items || [];

  const { mutate: addToCart, isPending: adding } = useAddToCart();
  const { mutate: updateQty } = useUpdateCartItemQuantity();
  const { mutate: updateQtyVariant } =
    useUpdateCartItemQuantityVariant();

  const [qty, setQty] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [loading, setLoading] = useState(false);

  
  const groupedAttributes = useMemo(() => {
    if (!product?.variants?.length) return {};
    const map = {};
    product.variants.forEach((v) => {
      Object.entries(v.attributes).forEach(([k, val]) => {
        if (!map[k]) map[k] = new Set();
        map[k].add(val);
      });
    });
    return map;
  }, [product]);

  useEffect(() => {
    if (!open) return;
    const defaults = {};
    Object.keys(groupedAttributes).forEach(
      (k) => (defaults[k] = [...groupedAttributes[k]][0])
    );
    setSelectedAttributes(defaults);
  }, [open, groupedAttributes]);

  const selectedVariant = useMemo(() => {
    if (!product?.variants?.length) return null;
    return product.variants.find((v) =>
      Object.entries(selectedAttributes).every(
        ([k, val]) => v.attributes[k] === val
      )
    );
  }, [selectedAttributes, product]);

  const cartItem = useMemo(() => {
    return cartItems.find(
      (i) =>
        i.productId === product._id &&
        i.variantId === selectedVariant?.id
    );
  }, [cartItems, product, selectedVariant]);

  useEffect(() => {
    setQty(cartItem?.quantity || 1);
  }, [cartItem]);

  const handleAdd = () => {
    setLoading(true);

    setTimeout(() => {
      if (cartItem) {
        updateQtyVariant(
          {
            productId: product._id,
            variantId: selectedVariant.id,
            quantity: qty,
          },
          {
            onSuccess: () => {
              toast.success("Cart updated");
              setLoading(false);
              onClose();
            },
          }
        );
      } else {
        addToCart(
          {
            productId: product._id,
            variantId: selectedVariant?.id,
            quantity: qty,
          },
          {
            onSuccess: () => {
              toast.success("Added to cart");
              setLoading(false);
              onClose();
            },
          }
        );
      }
    }, 2000); 
  };

  const maxQty =
  selectedVariant?.quantity ??
  product?.quantity ??
  1;


  return (
<AnimatePresence>
  {open && (
    <>

      <motion.div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />


      <motion.div
        initial={{
          opacity: 0,
          y: window.innerWidth >= 768 ? 0 : "100%",
          scale: window.innerWidth >= 768 ? 0.95 : 1,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: window.innerWidth >= 768 ? 0 : "100%",
          scale: window.innerWidth >= 768 ? 0.95 : 1,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 22 }}
        className="
          fixed z-50
          bottom-0 left-0 right-0
          md:bottom-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
          bg-white/90 backdrop-blur-xl
          rounded-t-[32px] md:rounded-3xl
          shadow-[0_-30px_60px_rgba(0,0,0,0.25)]
          md:shadow-[0_40px_80px_rgba(0,0,0,0.35)]
          px-6 pt-6 pb-8
          max-h-[55vh] md:max-h-[80vh]
          w-full md:w-[520px] lg:w-[560px]
          overflow-y-auto no-scrollbar
        "
        style={{ overscrollBehavior: "contain" }}
      >

        <button
          onClick={onClose}
          className="
            hidden md:flex absolute top-4 right-4
            w-9 h-9 rounded-full
            bg-gray-100 hover:bg-gray-200
            items-center justify-center
            transition
          "
        >
          <RiCloseLine className="text-xl" />
        </button>

        <div onClick={onClose} className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-gray-300 md:hidden hover:cursor-pointer" />

  
        <div className="flex gap-4 items-center">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={product.image}
              className="w-full h-full object-cover"
            />
            {cartItem && (
              <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] px-2 py-[2px] rounded-full">
                In cart
              </span>
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 leading-tight">
              {product.name}
            </h3>
            <p className="text-xl font-bold mt-1">
              {formatPrice(selectedVariant?.price || product.price)}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {Object.keys(groupedAttributes).map((key) => {
            const isColor = key === "color" || key === "colour";

            return (
              <div key={key}>
                <p className="text-xs font-semibold uppercase text-gray-500 mb-2">
                  {key}
                </p>

                <div className="flex flex-wrap gap-2">
                  {[...groupedAttributes[key]].map((val) => {
                    const active = selectedAttributes[key] === val;

                    return (
                      <motion.button
                        key={val}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setSelectedAttributes((p) => ({
                            ...p,
                            [key]: val,
                          }))
                        }
                        className={`
                          relative px-4 py-2 rounded-full text-sm font-medium transition-all
                          ${
                            active
                              ? "bg-gray-700 text-white shadow-lg"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:cursor-pointer"
                          }
                        `}
                      >
                        {isColor ? (
                          <span
                            className="block w-5 h-5 rounded-full border"
                            style={{ backgroundColor: val.toLowerCase() }}
                          />
                        ) : (
                          val
                        )}

                        {active && (
                          <motion.span
                            layoutId={`active-${key}`}
                            className="absolute inset-0 rounded-full  "
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {selectedVariant && (
          <div className="mt-3 flex items-center gap-3 text-sm">
            {selectedVariant.inStock ? (
              <span className="flex items-center gap-1 text-green-600">
                <FaCheck />
                In stock · {selectedVariant.quantity} left
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-500">
                <RiErrorWarningFill />
                Out of stock
              </span>
            )}
          </div>
        )}

        {cartItem && (
          <div className="mt-2 flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-xl w-fit">
            <RiErrorWarningFill />
            This item is already in your cart
          </div>
        )}
         
        <div className="mt-4 flex items-center justify-between">
          {product?.variants?.length? null : <span className="text-sm font-medium text-gray-600">
            Quantity: {product?.quantity}
          </span> }
          

          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">
            <button
              disabled={qty === 1}
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="disabled:opacity-40 disabled:cursor-not-allowed hover:cursor-pointer w-9 h-9 rounded-full bg-white shadow flex items-center justify-center"
            >
              <RiSubtractLine />
            </button>

            <span className="w-6 text-center font-semibold">
              {qty}
            </span>

            <button
             disabled={qty === maxQty}
              onClick={() => setQty((q) => q + 1)}
              className="disabled:opacity-40 disabled:cursor-not-allowed w-9 h-9 rounded-full bg-white shadow flex items-center hover:cursor-pointer justify-center"
            >
              <RiAddLine />
            </button>
          </div>
        </div>
        <motion.button
          onClick={handleAdd}
          disabled={loading}
          whileTap={{ scale: 0.97 }}
          className="
            mt-7 w-full h-14 rounded-2xl
            bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800
            text-white font-semibold text-base
            flex items-center justify-center gap-3
            shadow-xl disabled:opacity-70
          "
        >
          {loading ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "linear",
                }}
                className="w-5 h-5 rounded-full border-2 border-white border-t-transparent"
              />
              Processing…
            </>
          ) : (
            <>
              <RiShoppingCartLine className="text-xl" />
              {cartItem ? "Update Cart" : "Add to Cart"}
            </>
          )}
        </motion.button>
      </motion.div>
    </>
  )}
</AnimatePresence>

  );
};


const ProductsCard = ({ product }) => {
  const { data: cartResponse } = useCartItems();
  const { data: wishListResponse } = useGetWishListItems();
  const { mutate: addToWishList, isPending } = useWishList();

  const cartItems = cartResponse?.data?.items || [];
  const wishItems = wishListResponse?.data?.items || [];

  const [openDrawer, setOpenDrawer] = useState(false);

  const isInCart = cartItems.some(
    (i) => i.product?._id === product._id
  );

  const iswishList = wishItems.some(
    (i) => i.product?._id === product._id
  );

    const handleWishList = () => {
    if (isInCart) return;

    let variantId;

    if (product.hasVariants && Array.isArray(product.variants)) {
      variantId = product.variants[0]?.id;
    }

    addToWishList(
      {
        productId: product._id,
        variantId,
      },
      {
        onSuccess: () => {
          toast.success("Item added to wishlist successfully");
        },
        onError: () => {
          toast.error("Failed to add item to wishList");
        },
      }
    );
  };

  return (
    <>

      <div className="group relative flex flex-col w-full max-w-[260px] rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300">
  <div  className="relative">
    <div className="relative h-[240px] bg-gray-100 overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

     
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <button
        onClick={handleWishList}
        disabled={isPending}
        className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow-md hover:scale-110 transition hover:cursor-pointer"
      >
        <AnimatePresence mode="wait">
          {!iswishList ? (
            <motion.span
              key="cart"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
            >
              <AiOutlineHeart className="text-lg text-gray-700" />
           
            </motion.span>
          ) : (
            <motion.span
              key="added"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative"
            >
              <AiFillHeart  className="text-lg text-green-500" />
             
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold shadow">
        {formatPrice(product.price)}
      </div>
    </div>
  </div>

  
  <div className="flex flex-col gap-3 p-4">

   
    <h3 className="font-medium text-sm leading-tight line-clamp-2 text-gray-900">
      {product.name}
    </h3>

    <div className="flex items-center gap-1 text-xs">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={i < 4 ? "text-orange-400" : "text-gray-300"}
        />
      ))}
      <span className="ml-1 text-gray-400">(4.5)</span>
    </div>

    <div className="flex items-center justify-between mt-1">

   
      <Link to={`/product/${product._id}`} className="text-base font-semibold text-gray-900">
        <RiLink />
      </Link>

   
       <button
        onClick={() => setOpenDrawer(true)}
        disabled={isPending}
        className="relative flex items-center justify-center w-11 h-11 rounded-full bg-blue-800/60 text-white hover:scale-105 transition disabled:opacity-60 hover:cursor-pointer"
      >
        <AnimatePresence mode="wait">
          {!isInCart ? (
            <motion.span
              key="cart"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
            >
              <RiShoppingCartLine className="text-lg" />
            </motion.span>
          ) : (
            <motion.span
              key="added"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative"
            >
              <FaShoppingCart className="text-lg" />
              <FaCheck className="absolute -top-1 -right-1 text-[10px] bg-green-500 text-white rounded-full p-[2px]" />
            </motion.span>
          )}
        </AnimatePresence>
      </button> 
    </div> 
  </div>

 
  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5 group-hover:ring-black/10 transition" />
</div>
      <ProductQuickAddDrawer
        product={product}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />
    </>
  );
};

export default ProductsCard;
