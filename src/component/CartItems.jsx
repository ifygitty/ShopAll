// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   RiShoppingCartLine,
//   RiUserLine,
//   RiCloseLine,
//   RiAddLine,
//   RiSubtractLine,
// } from "react-icons/ri";
// import { FaTrash } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import {
//   useCartItems,
//   useClearCartItem,
//   useDeleteCartItem,
//   useUpdateCartItemQuantity,
// } from "@/query/queryCart";

// const listVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.12,
//       delayChildren: 0.08,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, x: 60 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { type: "spring", stiffness: 280, damping: 22 },
//   },
// };

// const CartItems = () => {
//   const [open, setOpen] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const navRef = useRef(null);

//   const { data: cartResponse } = useCartItems();

//   const cartItems = Array.isArray(cartResponse?.data?.items)
//     ? cartResponse.data.items
//     : [];
//     console.log(cartItems)

//   const totalQuantity = cartItems.reduce(
//     (acc, item) => acc + item.quantity,
//     0
//   );

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.quantity * Number(item.product.price),
//     0
//   );

//   const { mutate: deleteCartItem } = useDeleteCartItem();
//   const { mutate: clearAll, isPending: isClearing } = useClearCartItem();
//   const { mutate: updateQty, isPending: isUpdating } =
//     useUpdateCartItemQuantity();

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (navRef.current && !navRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };

//     if (open) document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, [open]);



//   const increaseQty = (e, item) => {
//     e.stopPropagation();

//     updateQty({
//       productId: item.product._id,
//       quantity: item.quantity + 1,
//     });
//   };

//   const decreaseQty = (e, item) => {
//     e.stopPropagation();
//     if (item.quantity <= 1) return;

//     updateQty({
//       productId: item.product._id,
//       quantity: item.quantity - 1,
//     });
//   };

//   const removeItem = (e, productId) => {
//     e.stopPropagation();
//     deleteCartItem({ productId });
//   };

//   const clearCart = () => {
//     clearAll(undefined, {
//       onSuccess: () => setShowConfirm(false),
//     });
//   };

//   return (
//     <div className="relative z-30">
//        <div className="">
        
//         <button
//        onClick={() => setOpen(true)}
//        className="flex items-center gap-2 px-1 py-3 relative"
//      >
//        <RiShoppingCartLine className="text-2xl" />
//        <span className="absolute top-0 right-1 text-sm font-medium">
//         {totalQuantity}
//        </span>
//      </button>
//            </div>
//       <AnimatePresence>
//         {open && (
//           <>
//             <motion.div
//               className="fixed inset-0 bg-black/40"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             />

//             <motion.div
//               ref={navRef}
//               className={`fixed top-0 right-0 h-full w-2/4 max-md:w-3/4 max-sm:w-full bg-white shadow-lg p-4 flex flex-col ${
//                 isClearing ? "pointer-events-none opacity-60" : ""
//               }`}
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="font-semibold">Cart ({totalQuantity})</h2>
//                 <button className="w-fit text-center rounded-full p-1 shadow-lg bg-white text-2xl  text-gray-500" onClick={() => setOpen(false)}>
//                   <RiCloseLine size={22} />
//                 </button>
//               </div>

//               <motion.div
//                 className="flex-1 overflow-y-auto no-scrollbar space-y-4"
//                 variants={listVariants}
//                 initial="hidden"
//                 animate="visible"
//               >
//                 {cartItems.length === 0 && (
//                   <p className="text-center text-gray-500">
//                     Your cart is empty
//                   </p>
//                 )}

//                 {cartItems.map((item) => (
//                   <motion.div
//                     key={`${item.product._id}`}
//                     variants={itemVariants}
//                     className="shadow p-3 rounded"
//                   >
//                     <div className="flex justify-between">
//                       <div className="flex gap-3">
//                         <img
//                           src={item.image}
//                           className="w-16 h-16 rounded object-cover"
//                         />

//                         <div>
//                           <p className="font-medium">
//                             {item.product.name}
//                           </p>

//                           <div className="flex items-center gap-3 mt-2 border rounded-full px-3 py-1">
//                             <button
//                               onClick={(e) => decreaseQty(e, item)}
//                               disabled={item.quantity <= 1 || isUpdating}
//                             >
//                               <RiSubtractLine />
//                             </button>

//                             <span>{item.quantity}</span>

//                             <button
//                               onClick={(e) => increaseQty(e, item)}
//                               disabled={isUpdating}
//                             >
//                               <RiAddLine />
//                             </button>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex flex-col items-end justify-between">
//                         <button className="ml-auto border border-gray-400 rounded-full p-1.5 hover:bg-gray-400/10"
//                           onClick={(e) =>
//                             removeItem(e, item.product._id)
//                           }
//                         >
//                           <FaTrash />
//                         </button>

//                         <p>${item.product.price}</p>
//                       </div>
//                     </div>
//                      {item.variantAttributes && (
//                     <div className="flex flex-wrap gap-2 mt-3 px-2">
//                       {Object.entries(item.variantAttributes).map(([rawKey, rawValue]) => {
//                         const key = rawKey.toLowerCase();
//                         const value = String(rawValue).toLowerCase();

//                         const isColour = key === "colour";

//                         return (
//                           <span
//                             key={rawKey}
//                             className={`
//                               text-sm font-medium px-2 py-1 rounded-full
//                               ${
//                                 isColour
//                                   ? `bg-${value}-500/30 text-${value}-700`
//                                   : "bg-blue-500/30 text-blue-700"
//                                 }
//                               `}
//                             >
//                               {key}: {value}
//                             </span>
//                           );
//                         })}
//                     </div>
//                   )}
//                   </motion.div>
//                 ))}
//               </motion.div>

//               <div className="border-t pt-4">
//                 <div className="flex justify-between font-medium mb-3">
//                   <span>Total</span>
//                   <span>${totalPrice}</span>
//                 </div>

//                 {cartItems.length > 0 && (
//                   <div className="flex justify-between items-center">
//                     <Link
//                       to="/checkout"
//                       onClick={() => setOpen(false)}
//                       className="bg-blue-600 text-white px-6 py-3 rounded-2xl"
//                     >
//                       Checkout
//                     </Link>

//                     <button
//                       onClick={() => setShowConfirm(true)}
//                       className="bg-red-500/30 text-red-700 p-2 rounded-full"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                 )}
//               </div>

              
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showConfirm && (
//           <>
//             <motion.div className="fixed inset-0 bg-black/40 z-50" />

//             <motion.div className="fixed inset-0 z-50 flex items-center justify-center">
//               <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm">
//                 <h3 className="font-semibold text-center">
//                   Empty Cart?
//                 </h3>

//                 <p className="text-sm text-gray-500 text-center mt-2">
//                   Remove all items from cart?
//                 </p>

//                 <div className="flex gap-4 mt-6">
//                   <button
//                     onClick={() => setShowConfirm(false)}
//                      disabled={isClearing}
//                     className="w-full border rounded py-2"
//                   >
//                     Cancel
//                   </button>

//                              <button
//               onClick={clearCart}
//               disabled={isClearing}
//               className="w-full py-2 rounded-lg bg-red-600 text-white flex items-center justify-center gap-2"
//             >
//               {isClearing ? (
//                 <>
//                   <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
//                   Clearing...
//                 </>
//               ) : (
//                 "Proceed"
//               )}
//             </button>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default CartItems;




import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiShoppingCartLine,
  RiUserLine,
  RiCloseLine,
  RiAddLine,
  RiSubtractLine,
} from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useCartItems,
  useClearCartItem,
  useDeleteCartItem,
  useDeleteCartItemVariant,
  useUpdateCartItemQuantity,
  useUpdateCartItemQuantityVariant,
} from "@/query/queryCart";
import { formatPrice } from "@/utils/format";

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



  // const increaseQty = (e, item) => {
  //   e.stopPropagation();

  //   updateQty({
  //     productId: item.product._id,
  //     quantity: item.quantity + 1,
  //   });
  // };

  const increaseQty = (e, item) => {
  e.stopPropagation();

  if (item.variantId) {
    console.log(item.variantId)
    updateVariantQty({
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity + 1,
    });
  } else {
    
    updateQty({
      productId: item.productId,
      quantity: item.quantity + 1,
    });
  }
};


  // const decreaseQty = (e, item) => {
  //   e.stopPropagation();
  //   if (item.quantity <= 1) return;

  //   updateQty({
  //     productId: item.product._id,
  //     quantity: item.quantity - 1,
  //   });
  // };

  const decreaseQty = (e, item) => {
  e.stopPropagation();
  if (item.quantity <= 1) return;

  if (item.variantId) {
    updateVariantQty({
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity - 1,
    });
  } else {
    updateQty({
      productId: item.productId,
      quantity: item.quantity - 1,
    });
  }
};


  // const removeItem = (e, productId) => {
  //   e.stopPropagation();
  //   deleteCartItem({ productId });
  // };

  const removeItem = (e, item) => {
  e.stopPropagation();

  if (item.variantId) {
    deleteCartVariant({
      productId: item.productId,
      variantId: item.variantId,
    });
  } else {
    deleteCartItem({
      productId: item.productId,
    });
  }
};


  const clearCart = () => {
    clearAll(undefined, {
      onSuccess: () => setShowConfirm(false),
    });
  };

  return (
    <div className="relative z-30">
       <div className="">
        
        <button
       onClick={() => setOpen(true)}
       className="flex items-center gap-2 px-1 py-3 relative"
     >
       <RiShoppingCartLine className="text-2xl" />
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
              className={`fixed top-0 right-0 h-full w-2/4 max-md:w-3/4 max-sm:w-full bg-white shadow-lg p-4 flex flex-col ${
                isClearing ? "pointer-events-none opacity-60" : ""
              }`}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">Cart ({totalQuantity})</h2>
                <button className="w-fit text-center rounded-full p-1 shadow-lg bg-white text-2xl  text-gray-500" onClick={() => setOpen(false)}>
                  <RiCloseLine size={22} />
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
                    key={`${item.product._id}`}
                    variants={itemVariants}
                    className="shadow p-3 rounded"
                  >
                    <div className="flex justify-between">
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          className="w-16 h-16 rounded object-cover"
                        />

                        <div>
                          <p className="font-medium">
                            {item.product.name}
                          </p>

                          <div className="flex items-center gap-3 mt-2 border rounded-full px-3 py-1">
                            <button
                              onClick={(e) => decreaseQty(e, item)}
                              disabled={item.quantity <= 1 || isUpdating}
                            >
                              <RiSubtractLine />
                            </button>

                            <span>{item.quantity}</span>

                            <button
                              onClick={(e) => increaseQty(e, item)}
                              disabled={isUpdating}
                            >
                              <RiAddLine />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <button className="ml-auto border border-gray-400 rounded-full p-1.5 hover:bg-gray-400/10"
                          onClick={(e) => removeItem(e, item)}
                        >
                          <FaTrash />
                        </button>

                        <p>{formatPrice(item.product.price)}</p>
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

              <div className="border-t pt-4">
                <div className="flex justify-between font-medium mb-3">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>

                {cartItems.length > 0 && (
                  <div className="flex justify-between items-center">
                    <Link
                      to="/checkout"
                      onClick={() => setOpen(false)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-2xl"
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
                )}
              </div>

              
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfirm && (
          <>
            <motion.div className="fixed inset-0 bg-black/40 z-50" />

            <motion.div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm">
                <h3 className="font-semibold text-center">
                  Empty Cart?
                </h3>

                <p className="text-sm text-gray-500 text-center mt-2">
                  Remove all items from cart?
                </p>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setShowConfirm(false)}
                     disabled={isClearing}
                    className="w-full border rounded py-2"
                  >
                    Cancel
                  </button>

                             <button
              onClick={clearCart}
              disabled={isClearing}
              className="w-full py-2 rounded-lg bg-red-600 text-white flex items-center justify-center gap-2"
            >
              {isClearing ? (
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

