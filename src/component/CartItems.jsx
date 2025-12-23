import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { RiShoppingCartLine, RiLoginBoxLine, RiUserLine, RiCloseLine, RiAddLine, RiSubtractLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useCartItems, useClearCartItem, useDeleteCartItem, useUpdateCartItemQuantity } from "@/query/queryCart";


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
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 22,
    },
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

  const totalQuantity = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * Number(item.product.price),
    0
  );
  
  const {mutate:deleteCartItem, isPending} = useDeleteCartItem()
  const {mutate:deletAllCartItems, isPending: isClearingCart} = useClearCartItem()
  const {mutate: updateQuantity, isPending: isUpdatingQty} =  useUpdateCartItemQuantity()

  const increaseQty = (item) => {
  updateQuantity({
    productId: item.product._id,
    quantity: item.quantity + 1,
  });
};

const decreaseQty = (item) => {
  if (item.quantity <= 1) return;

  updateQuantity({
    productId: item.product._id,
    quantity: item.quantity - 1,
  });
};

  const deleteCart = (productId) => {
    deleteCartItem({productId})
  }
  const clearCart = () => {
  deletAllCartItems(undefined, {
    onSuccess: () => {
      setShowConfirm(false);
    },
  });
};


  return (
    <div className="relative z-30  ">
      
      <div className="flex items-center gap-5 text-2xl">
        <RiUserLine className="hover:cursor-pointer"/>
        <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-1 py-3 relative"
      >
        <RiShoppingCartLine className="" />
        <span className="absolute top-0 right-1 text-sm font-medium">
          {totalQuantity}
        </span>
      </button>
      
      </div>
    
      

      <AnimatePresence>
        {open && (
          <>
          
            <motion.div
              className="fixed inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

           
            <motion.div
              ref={navRef}
              className={`fixed top-0 right-0 w-2/4 h-full bg-white shadow-lg p-4 flex flex-col max-md:w-3/4 max-sm:w-4/4
${isClearingCart ? "pointer-events-none opacity-70" : ""}`}

              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold mb-4 ">
                Cart ({totalQuantity})
              </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="w-fit text-center rounded-full p-1 shadow-lg bg-white text-2xl  text-gray-500"
                >
                  <RiCloseLine />
                </button>
              </div>
              

              
              <motion.div
                className="flex-1 overflow-y-auto no-scrollbar space-y-4"

                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {cartItems.length === 0 && (
                  <p className="text-center text-gray-500">
                    Your cart is empty
                  </p>
                )}

                {cartItems.map((item) => (
                  <motion.div
                    key={item.product._id}
                    variants={itemVariants} 
                    className=" shadow-lg pb-3 mt-5 rounded-b-sm"
                  >
                    <div className="flex justify-between">
                      <div className="flex gap-3 mt-2 py-2">
                      <img
                        src={item.image}
                        className="w-16 h-16 object-cover rounded"
                      />

                      <div className="flex flex-col justify-between max-sm:text-sm">
                        <p className="font-medium">
                          {item.product.name}
                        </p>

                        <div className="flex items-center gap-3 mt-2 px-2 border border-gray-400 rounded-3xl w-fit py-1">
                        <button
                        onClick={() => decreaseQty(item)}
                        disabled={item.quantity <= 1 || isUpdatingQty}
                        className="text-gray-400 disabled:opacity-40"
                        >
                        <RiSubtractLine className="text-md" />
                        </button>
                         {/* {isUpdatingQty ? (
                          <>
                            <span className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full" />
                           
                          </>
                        ) : ( */}
                          <span>{item.quantity}</span>
                        {/* )} */}
                        

                        <button
                        onClick={() => increaseQty(item)}
                        disabled={isUpdatingQty}
                        className="text-gray-400 disabled:opacity-40"
                        >
                        <RiAddLine className="text-md" />
                        </button>
                        </div>

                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <button onClick={() => deleteCart(item.product._id)} className="ml-auto border border-gray-400 rounded-full p-1.5 hover:bg-gray-400/10">
                        <FaTrash />
                      </button>

                      <p>${item.product.price}</p>
                    </div>
                    </div>

                  
                  {item.variantAttributes && (
                    <div className="flex flex-wrap gap-2 mt-3 px-2">
                      {Object.entries(item.variantAttributes).map(([rawKey, rawValue]) => {
                        const key = rawKey.toLowerCase();
                        const value = String(rawValue).toLowerCase();

                        const isColour = key === "colour";

                        return (
                          <span
                            key={rawKey}
                            className={`
                              text-sm font-medium px-2 py-1 rounded-full
                              ${
                                isColour
                                  ? `bg-${value}-500/30 text-${value}-700`
                                  : "bg-blue-500/30 text-blue-700"
                                }
                              `}
                            >
                              {key}: {value}
                            </span>
                          );
                        })}
                    </div>
                  )}


                    
                  </motion.div>
                ))}
              </motion.div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>

               {cartItems.length > 0 &&(
                <div>
                   <div className="flex justify-between items-center">
                  <Link
                  to="/checkout"
                  onClick={() => setOpen(false)}
                  className="block text-center bg-blue-600 text-white py-3 rounded-2xl w-60"
                >
                  Checkout
                </Link>
                 <button
                  onClick={() => setShowConfirm(true)}
                  className="bg-red-500/30 text-red-700 p-2 rounded-full"
                >
                  <FaTrash />
                </button>

                </div>
                      
                </div>
               )}
               
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
  {showConfirm && (
    <>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-black/40 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-xl">
          <h3 className="text-lg font-semibold text-center">
            Empty Cart?
          </h3>

          <p className="text-sm text-gray-500 text-center mt-2">
            Are you sure you want to remove all items from your cart?
          </p>

          <div className="flex justify-between gap-4 mt-6">
            <button
              onClick={() => setShowConfirm(false)}
              disabled={isClearingCart}
              className="w-full py-2 rounded-lg border border-gray-300 text-gray-700"
            >
              Cancel
            </button>

            <button
              onClick={clearCart}
              disabled={isClearingCart}
              className="w-full py-2 rounded-lg bg-red-600 text-white flex items-center justify-center gap-2"
            >
              {isClearingCart ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
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
