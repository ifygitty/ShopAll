import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiShoppingCartLine,
  RiUserLine,
  RiCloseLine,
  RiAddLine,
  RiSubtractLine,
  RiEyeLine,
} from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useCartItems,
  useClearCartItem,
  useClearWishItem,
  useDeleteCartItem,
  useDeleteCartItemVariant,
  useDeleteWishItem,
  useDeleteWishItemVariant,
  useGetWishListItems,
  useUpdateCartItemQuantity,
  useUpdateCartItemQuantityVariant,
} from "@/query/queryCart";
import { formatPrice } from "@/utils/format";
import { toast } from "sonner";
import { AiOutlineHeart } from "react-icons/ai";
import { deleteWishListItem } from "@/api/cart";

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 280, damping: 22 },
  },
};

const WishListItems = () => {
  const [open, setOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navRef = useRef(null);

  const { data: cartResponse } = useCartItems();
  const { mutate: deleteWishItem } = useDeleteWishItem();
    const { mutate:deleteWishItemVariant } = useDeleteWishItemVariant();
  const { data: wishListResponse } = useGetWishListItems();
  const { mutate: clearAll, isPending: isClearing } = useClearWishItem();

  
    const wishItems = Array.isArray(wishListResponse?.data?.items)
    ? wishListResponse.data.items
    : [];

    console.log(wishItems)


  const totalQuantity = wishItems.length

  

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);


  const removeItem = (e, item) => {
  e.stopPropagation();

  if (item.variant) {
    deleteWishItemVariant({
      productId: item.product._id,
      variantId: item.product.variant._id,
    },
    {
            onSuccess: () => {
              toast.success("wish item deleted successfully");
            },
            onError: () => {
              toast.error("Failed delete wish item");
            },
        }
  );
  } else {
    deleteWishItem({
      productId: item.product._id,
    },
    {
            onSuccess: () => {
              toast.success("wish item deleted successfully");
            },
            onError: () => {
              toast.error("Failed delete wish item");
            },
        }
);
  }
};


  const clearWishList = () => {
    clearAll(undefined, {
      onSuccess: () => setShowConfirm(false),
    },
    {
            onSuccess: () => {
              toast.success(" cart cleared successfully");
            },
            onError: () => {
              toast.error("Failed to clear cart");
            },
    }
  );
  };

  return (
   
    
    <div className={`relative
                          ${open === false ? "z-20" : "z-30"}`}>
   
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center justify-center h-12 w-12 rounded-full
                   hover:bg-gray-100 transition group max-sm:h-8 max-sm:w-8"
      >
        <AiOutlineHeart className="text-2xl text-gray-800 max-sm:text-xl " />

        {totalQuantity > 0 && (
          <span
            className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1
                       rounded-full bg-black text-white text-xs font-semibold
                       flex items-center justify-center shadow-lg
                       scale-95 group-hover:scale-100 transition"
          >
            {totalQuantity}
          </span>
        )}
      </button>

    
      <AnimatePresence>
        {open && (
          <>
          
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              ref={navRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className={`fixed top-0 right-0 h-full w-[420px] max-sm:w-full
                          bg-white flex flex-col z-50
                          ${isClearing ? "pointer-events-none opacity-70" : ""}`}
            >
          
              <div className="flex items-center justify-between px-6 py-5 border-b ">
                <div>
                  <p className="text-lg font-semibold">Your wishlist</p>
                  <p className="text-xs text-gray-500">
                    {totalQuantity} item{totalQuantity !== 1 && "s"}
                  </p>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="h-9 w-9 rounded-full flex items-center justify-center
                             hover:bg-gray-100 transition"
                >
                  <RiCloseLine size={20} />
                </button>
              </div>

              
              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 no-scrollbar">
                {wishItems.length === 0 && (
                  <p className="text-center text-gray-500 mt-20">
                    Your wishlist is empty
                  </p>
                )}

                {wishItems.map((item) => (
                  <motion.div
                    key={item.product._id}
                    layout
                    className="relative rounded-2xl border bg-white shadow-sm p-4"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.product.image}
                        className="w-16 h-16 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {item.product.name}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {formatPrice(item.product.price)}
                        </p>

                    
                        

                      
                        {item.variantAttributes && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {Object.entries(item.variantAttributes).map(
                              ([k, v]) => (
                                <span
                                  key={k}
                                  className="text-xs px-2 py-1 rounded-full
                                             bg-gray-100 text-gray-600"
                                >
                                  {k}: {v}
                                </span>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                  
                    <button
                      onClick={(e) => removeItem(e, item)}
                      className="absolute top-3 right-3 text-gray-400
                                 hover:text-red-500 transition"
                    >
                      <FaTrash size={14} />
                    </button>

                    <Link
                      to={`product/${item.product.id}`}
                      onClick={() => setOpen(false)}
                      className="absolute bottom-3 right-3 text-gray-400
                                 hover:text-black transition"
                    >
                      <RiEyeLine size={18} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="border-t px-6 py-5 space-y-4">
          
                {wishItems.length > 0 && (
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="w-full text-sm text-red-600 hover:underline text-center"
                  >
                    Empty wishList?
                  </button>
                )}
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

     
      <AnimatePresence>
        {showConfirm && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm">
                <h3 className="font-semibold text-center">
                  Empty wishList?
                </h3>

                <p className="text-sm text-gray-500 text-center mt-2">
                  This action cannot be undone.
                </p>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setShowConfirm(false)}
                    disabled={isClearing}
                    className="w-full border rounded-xl py-2"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={clearWishList}
                    disabled={isClearing}
                    className="w-full py-2 rounded-xl bg-red-600
                               text-white flex items-center justify-center gap-2"
                  >
                    {isClearing ? (
                      <>
                        <span className="animate-spin h-4 w-4 border-2
                                         border-white border-t-transparent rounded-full" />
                        Clearing...
                      </>
                    ) : (
                      "Proceed"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WishListItems;

