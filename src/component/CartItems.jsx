import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { RiShoppingCartLine, RiLoginBoxLine, RiUserLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useCartItems, useClearCartItem, useDeleteCartItem } from "@/query/queryCart";


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
  const {mutate:deletAllCartItems, ispending} = useClearCartItem()
  const deleteCart = (productId) => {
    deleteCartItem({productId})
  }
  const clearCart = () => {
    deletAllCartItems()
  }

  return (
    <div className="relative z-30  ">
      
      <div className="flex items-center gap-5 text-2xl">
        <RiUserLine className="hover:cursor-pointer"/>
        <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-1 py-3 relative"
      >
        <RiShoppingCartLine className="" />
        <span className="absolute top-0 right-0 text-sm font-medium">
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
              className="fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg p-4 flex flex-col md:w-2/4 max-sm:w-full"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35 }}
            >
              <h2 className="text-lg font-semibold mb-4">
                Cart ({totalQuantity})
              </h2>

              
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
                    className="flex justify-between border-b pb-3"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.product.image}
                        className="w-16 h-16 object-cover rounded"
                      />

                      <div className="flex-1">
                        <p className="font-medium">
                          {item.product.name}
                        </p>

                        <div className="flex items-center gap-3 mt-2 px-2 border border-gray-400 rounded-3xl w-fit">
                          <FaMinus className="text-gray-400 text-sm" />
                          <span>{item.quantity}</span>
                          <FaPlus className="text-gray-400 text-sm" />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <button onClick={() => deleteCart(item.product._id)} className="ml-auto border border-gray-400 rounded-full p-1.5 hover:bg-gray-400/10">
                        <FaTrash />
                      </button>

                      <p>${item.product.price}</p>
                    </div>
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
                 <button onClick={clearCart} className="bg-red-500/30 text-red-700 p-2 rounded-full">
                  <FaTrash />
                 </button>
                </div>
                

                <button
                  onClick={() => setOpen(false)}
                  className="w-full text-center text-red-500"
                >
                  Close
                </button>
                </div>
               )}
               
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartItems;
