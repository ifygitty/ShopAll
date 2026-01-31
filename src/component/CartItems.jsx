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
import { Link, useNavigate } from "react-router-dom";
import {
  useCartItems,
  useClearCartItem,
  useDeleteCartItem,
  useDeleteCartItemVariant,
  useUpdateCartItemQuantity,
  useUpdateCartItemQuantityVariant,
} from "@/query/queryCart";
import { formatPrice } from "@/utils/format";
import { toast } from "sonner";

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

const CartItems = () => {
  const [open, setOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navRef = useRef(null);

  const { data: cartResponse } = useCartItems();

  const cartItems = Array.isArray(cartResponse?.data?.items)
    ? cartResponse.data.items
    : [];
    console.log(cartItems)

  const totalQuantity = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * Number(item.product.price),
    0
  );

  const { mutate: deleteCartItem } = useDeleteCartItem();
  const { mutate:deleteCartVariant } = useDeleteCartItemVariant();
  const { mutate: clearAll, isPending: isClearing } = useClearCartItem();
  const { mutate: updateQty, isPending: isUpdating } =
    useUpdateCartItemQuantity();
  const { mutate:updateVariantQty, isPending: isUpdatingv } =
    useUpdateCartItemQuantityVariant();

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


  const increaseQty = (e, item) => {
  e.stopPropagation();

  if (item.variantId) {
    console.log(item.variantId)
    updateVariantQty({
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity + 1,
    },
    {
      onSuccess: () =>
        toast.success("Cart item updated successfully"),
      onError: () =>
        toast.error("Failed to update cart item"),
      }
  );
  } else {
    
    updateQty({
      productId: item.productId,
      quantity: item.quantity + 1,
    },
    {
      onSuccess: () =>
        toast.success("Cart item updated successfully"),
      onError: () =>
        toast.error("Failed to update cart item"),
      }
  );
  }
};



  const decreaseQty = (e, item) => {
  e.stopPropagation();
  if (item.quantity <= 1) return;

  if (item.variantId) {
    updateVariantQty({
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity - 1,
    },
    {
      onSuccess: () =>
        toast.success("Cart item updated successfully"),
      onError: () =>
        toast.error("Failed to update cart item"),
      }
  );
  } else {
    updateQty({
      productId: item.productId,
      quantity: item.quantity - 1,
    },
    {
      onSuccess: () =>
        toast.success("Cart item updated successfully"),
      onError: () =>
        toast.error("Failed to update cart item"),
      }
  );
  }
};

  const removeItem = (e, item) => {
  e.stopPropagation();

  if (item.variantId) {
    deleteCartVariant({
      productId: item.productId,
      variantId: item.variantId,
    },
    {
            onSuccess: () => {
              toast.success("cart item deleted successfully");
            },
            onError: () => {
              toast.error("Failed delete cart item");
            },
        }
  );
  } else {
    deleteCartItem({
      productId: item.productId,
    });
  }
};


  const clearCart = () => {
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

  const navigate = useNavigate()

  const handleCheckOut = () =>{
    setOpen(false)
    if(cartItems.length > 0){
      navigate("/cart")
    }
  }

  return (
    
    <div className={`relative
                          ${open === false ? "z-20" : "z-30"}`}>
   
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center justify-center h-12 w-12 rounded-full
                   hover:bg-gray-100 transition group max-sm:h-8 max-sm:w-8 hover:cursor-pointer"
      >
        <RiShoppingCartLine className="text-2xl text-gray-800 max-sm:text-xl" />

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
              <div className="flex items-center justify-between px-6 py-5 border-b relative z-40">
                <div>
                  <p className="text-lg font-semibold">Your Cart</p>
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
                {cartItems.length === 0 && (
                  <p className="text-center text-gray-500 mt-20">
                    Your cart is empty
                  </p>
                )}

                {cartItems.map((item) => (
                  <motion.div
                    key={item.product._id}
                    layout
                    className="relative rounded-2xl border bg-white shadow-sm p-4"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        className="w-16 h-16 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {item.product.name}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {formatPrice(item.product.price)}
                        </p>

                       
                        <div
                          className="mt-3 inline-flex items-center gap-3
                                     bg-gray-100 rounded-full px-3 py-1"
                        >
                          <button
                            onClick={(e) => decreaseQty(e, item)}
                            disabled={item.quantity <= 1 || isUpdating}
                            className="text-gray-600"
                          >
                            <RiSubtractLine />
                          </button>

                          <span className="text-sm font-semibold w-4 text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={(e) => increaseQty(e, item)}
                            disabled={isUpdating}
                            className="text-gray-600"
                          >
                            <RiAddLine />
                          </button>
                        </div>

                      
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
                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>

               {cartItems.length > 0 && (
                <button
                  onClick={handleCheckOut}
                  className="block w-full text-center py-4 rounded-2xl
                             bg-blue-600 text-white font-semibold
                             hover:bg-blue-800 transition"
                >
                 Finalize Purchase
                </button>
                )}

                {cartItems.length > 0 && (
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="w-full text-sm text-red-600 hover:underline text-center"
                  >
                    Empty cart
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
                  Empty cart?
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
                    onClick={clearCart}
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

export default CartItems;

