// import { useEffect, useMemo, useState } from "react";
// import { FaStar } from "react-icons/fa";
// import { RiAddLine, RiSubtractLine, RiShoppingCartLine } from "react-icons/ri";
// import { useParams } from "react-router-dom";

// import { useProductDetails } from "@/query/queryProducts";
// import {
//   useAddToCart,
//   useCartItems,
//   useUpdateCartItemQuantityVariant,
// } from "@/query/queryCart";

// import FullPageLoader from "@/component/FullPageLoader";

// const Product = () => {
//   const { id } = useParams();

//   const { data, isLoading } = useProductDetails(id);
//   const { data: cartResponse } = useCartItems();

//   const { mutate: addToCart } = useAddToCart();
//   const { mutate: updateQtyVariant } =
//     useUpdateCartItemQuantityVariant();

//   const product = data?.data;
//   const cartItems = cartResponse?.data?.items || [];

//   const [qty, setQty] = useState(1);

//   /* ================================
//      GROUP VARIANT ATTRIBUTES
//   ================================= */
//   const groupedAttributes = useMemo(() => {
//     if (!product?.variants) return {};

//     const map = {};
//     product.variants.forEach((variant) => {
//       Object.entries(variant.attributes).forEach(([key, value]) => {
//         if (!map[key]) map[key] = new Set();
//         map[key].add(value);
//       });
//     });

//     return map;
//   }, [product]);

//   const attributeKeys = useMemo(() => {
//     return Object.keys(groupedAttributes).sort((a, b) => {
//       if (a === "color") return 1;
//       if (b === "color") return -1;
//       return 0;
//     });
//   }, [groupedAttributes]);

//   const [selectedAttributes, setSelectedAttributes] = useState({});

//   /* ================================
//      DEFAULT ATTRIBUTE SELECTION
//   ================================= */
//   useEffect(() => {
//     if (!attributeKeys.length) return;

//     const defaults = {};
//     attributeKeys.forEach((key) => {
//       defaults[key] = [...groupedAttributes[key]][0];
//     });

//     setSelectedAttributes(defaults);
//   }, [attributeKeys, groupedAttributes]);

//   /* ================================
//      FIND SELECTED VARIANT
//   ================================= */
//   const selectedVariant = useMemo(() => {
//     return product?.variants?.find((variant) =>
//       Object.entries(selectedAttributes).every(
//         ([key, value]) => variant.attributes[key] === value
//       )
//     );
//   }, [product, selectedAttributes]);

//   const selectedVariantId = selectedVariant?.id;

//   /* ================================
//      CART ITEM MATCH
//   ================================= */
//   const cartItem = useMemo(() => {
//     if (!product || !selectedVariantId) return null;

//     return cartItems.find(
//       (item) =>
//         item.productId === product._id &&
//         item.variantId === selectedVariantId
//     );
//   }, [cartItems, product, selectedVariantId]);

//   useEffect(() => {
//     if (cartItem) {
//       setQty(cartItem.quantity);
//     } else {
//       setQty(1);
//     }
//   }, [cartItem]);

//   /* ================================
//      HANDLERS
//   ================================= */
//   const handleSelect = (key, value) => {
//     setSelectedAttributes((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const handleIncrease = () => {
//     const newQty = qty + 1;
//     setQty(newQty);

//     cartItem
//       ? updateQtyVariant({
//           productId: product._id,
//           variantId: selectedVariantId,
//           quantity: newQty,
//         })
//       : addToCart({
//           productId: product._id,
//           variantId: selectedVariantId,
//           quantity: newQty,
//         });
//   };

//   const handleDecrease = () => {
//     if (qty <= 1) return;
//     const newQty = qty - 1;
//     setQty(newQty);

//     updateQtyVariant({
//       productId: product._id,
//       variantId: selectedVariantId,
//       quantity: newQty,
//     });
//   };

//   const handleAddToCart = () => {
//     addToCart({
//       productId: product._id,
//       variantId: selectedVariantId,
//       quantity: qty,
//     });
//   };

//   /* ================================
//      COLOR STYLES
//   ================================= */
//   const getColorClasses = (color) => {
//     if (color === "white") return "bg-gray-200  text-gray-400 border b";
//     if (color === "black") return "bg-black/60 text-white";
//     if (color === "brown") return "bg-variant-brown/80 text-white";
//     return `bg-${color}-500/80 text-${color}-700`;
//   };

//   if (isLoading) return <FullPageLoader />;
//   if (!product) return null;

//   return (
//     <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
//       <div className="grid md:grid-cols-2 gap-16">
//         <img src={product.image} className="rounded-lg bg-gray-100 bg-bro" />

//         <div>
//           <h1 className="text-3xl font-medium ">{product.name}</h1>

//           <div className="flex items-center gap-2">
//             {[...Array(4)].map((_, i) => (
//               <FaStar key={i} className="text-orange-600 " />
//             ))}
//             <FaStar className="text-gray-300" />
//             <p>(4.5)</p>
//           </div>

//           <p className="text-gray-600 mt-4">
//             {product.plainDescription}
//           </p>

//           <p className="text-3xl font-semibold mt-6">
//             ₦{product.price}
//           </p>

//           {/* ================================
//               ATTRIBUTE VARIANTS
//           ================================= */}
//           {attributeKeys.map((key) => (
//             <div key={key} className="mt-6 space-y-2">
//               <p className="font-medium uppercase text-sm">{key}</p>

//               <div className="flex flex-wrap gap-2">
//                 {[...groupedAttributes[key]].map((value) => {
//                   const active = selectedAttributes[key] === value;
//                   const isColor = key === "color";

//                   return (
//                     <button
//                       key={value}
//                       onClick={() => handleSelect(key, value)}
//                       className={`
//                         px-3 py-1 rounded-full max-sm:text-sm font-medium transition
//                         border
//                         ${active ? "border-gray-800/80 border-3" : "border-transparent"}
//                         ${
//                           isColor
//                             ? getColorClasses(value.toLowerCase())
//                             : "bg-gray-200 text-gray-700"
//                         }
//                       `}
//                     >
//                       {value}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}

//           {/* ================================
//               QUANTITY + CART
//           ================================= */}
//           <div className="flex items-center gap-4 mt-10">
//             <div className="flex items-center border rounded-full px-4 py-2 gap-4">
//               <button onClick={handleDecrease}>
//                 <RiSubtractLine />
//               </button>

//               <input
//                 value={qty}
//                 readOnly
//                 className="w-10 text-center bg-transparent"
//               />

//               <button onClick={handleIncrease}>
//                 <RiAddLine />
//               </button>
//             </div>

//             <button
//               onClick={handleAddToCart}
//               className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl"
//             >
//               <RiShoppingCartLine />
//               {cartItem ? "Update Cart" : "Add to Cart"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;

import { useEffect, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import {
  RiAddLine,
  RiSubtractLine,
  RiShoppingCartLine,
  RiErrorWarningFill,
} from "react-icons/ri";
import { useParams } from "react-router-dom";

import { useProductDetails } from "@/query/queryProducts";
import {
  useAddToCart,
  useCartItems,
  useUpdateCartItemQuantityVariant,
} from "@/query/queryCart";

import FullPageLoader from "@/component/FullPageLoader";

const formatPrice = (amount) => {
  if (!amount && amount !== 0) return "₦0";

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const Product = () => {
  const { id } = useParams();

  const { data, isLoading } = useProductDetails(id);
  const { data: cartResponse } = useCartItems();

  const { mutate: addToCart } = useAddToCart();
  const { mutate: updateQtyVariant } =
    useUpdateCartItemQuantityVariant();

  const product = data?.data;
  const cartItems = cartResponse?.data?.items || [];

  const [qty, setQty] = useState(1);

  const DESCRIPTION_LIMIT = 160;
  const [showFullDescription, setShowFullDescription] =
    useState(false);

  const isLongDescription =
    product?.plainDescription?.length > DESCRIPTION_LIMIT;

  const displayedDescription = showFullDescription
    ? product?.plainDescription
    : product?.plainDescription?.slice(0, DESCRIPTION_LIMIT);

 
  const groupedAttributes = useMemo(() => {
    if (!product?.variants) return {};

    const map = {};
    product.variants.forEach((variant) => {
      Object.entries(variant.attributes).forEach(([key, value]) => {
        if (!map[key]) map[key] = new Set();
        map[key].add(value);
      });
    });

    return map;
  }, [product]);

  const attributeKeys = useMemo(() => {
    return Object.keys(groupedAttributes).sort((a, b) => {
      if (a === "color") return 1;
      if (b === "color") return -1;
      return 0;
    });
  }, [groupedAttributes]);

  const [selectedAttributes, setSelectedAttributes] = useState({});

  
  useEffect(() => {
    if (!attributeKeys.length) return;

    const defaults = {};
    attributeKeys.forEach((key) => {
      defaults[key] = [...groupedAttributes[key]][0];
    });

    setSelectedAttributes(defaults);
  }, [attributeKeys, groupedAttributes]);

 
  const selectedVariant = useMemo(() => {
    return product?.variants?.find((variant) =>
      Object.entries(selectedAttributes).every(
        ([key, value]) => variant.attributes[key] === value
      )
    );
  }, [product, selectedAttributes]);

  const selectedVariantId = selectedVariant?.id;

  
  const cartItem = useMemo(() => {
    if (!product || !selectedVariantId) return null;

    return cartItems.find(
      (item) =>
        item.productId === product._id &&
        item.variantId === selectedVariantId
    );
  }, [cartItems, product, selectedVariantId]);

  const variantDetails = useMemo(() => {
    if (!product || !selectedVariantId) return null;

    return product.variants.find(
      (item) =>
        item.id === selectedVariantId
    );
  }, [cartItems, product, selectedVariantId]);

  console.log(variantDetails)

  useEffect(() => {
    if (cartItem) {
      setQty(cartItem.quantity);
    } else {
      setQty(1);
    }
  }, [cartItem]);

  const handleSelect = (key, value) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleIncrease = () => {
    const newQty = qty + 1;
    setQty(newQty);

    cartItem
      ? updateQtyVariant({
          productId: product._id,
          variantId: selectedVariantId,
          quantity: newQty,
        })
      : addToCart({
          productId: product._id,
          variantId: selectedVariantId,
          quantity: newQty,
        });
  };

  const handleDecrease = () => {
    if (qty <= 1) return;
    const newQty = qty - 1;
    setQty(newQty);

    updateQtyVariant({
      productId: product._id,
      variantId: selectedVariantId,
      quantity: newQty,
    });
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      variantId: selectedVariantId,
      quantity: qty,
    });
  };

  const getColorClasses = (color) => {
    if (color === "white")
      return "bg-gray-200 text-gray-400 border";
    if (color === "black") return "bg-black/60 text-white";
    if (color === "brown")
      return "bg-variant-brown/80 text-white";
    return `bg-${color}-500/80 text-${color}-700`;
  };

  if (isLoading) return <FullPageLoader />;
  if (!product) return null;

  return (
    <div className=" pt-14 space-y-10">
      <div className="grid md:grid-cols-2 gap-16">
        <img
          src={product.image}
          className="rounded-lg bg-gray-100"
        />

        <div>
          <h1 className="text-3xl font-medium">
            {product.name}
          </h1>

          <div className="flex items-center gap-2">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} className="text-orange-600" />
            ))}
            <FaStar className="text-gray-300" />
            <p>(4.5)</p>
          </div>

          
          <p className="text-gray-600 mt-4">
            {displayedDescription}
            {!showFullDescription && isLongDescription && "..."}
          </p>

          {isLongDescription && (
            <button
              onClick={() =>
                setShowFullDescription((prev) => !prev)
              }
              className="text-blue-600 mt-2 text-sm font-medium"
            >
              {showFullDescription ? "View less" : "View more"}
            </button>
          )}

          <p className="text-3xl font-semibold mt-6">
            {formatPrice(product.price)}
          </p>

        
          {attributeKeys.map((key) => (
            <div key={key} className="mt-6 space-y-2">
              <p className="font-medium uppercase text-sm">
                {key}
              </p>

              <div className="flex flex-wrap gap-2">
                {[...groupedAttributes[key]].map((value) => {
                  const active =
                    selectedAttributes[key] === value;
                  const isColor = key === "color";

                  return (
                    <button
                      key={value}
                      onClick={() =>
                        handleSelect(key, value)
                      }
                      className={`px-3 py-1 rounded-full text-sm font-medium transition border
                        ${
                          active
                            ? "border-gray-800/60 border-3"
                            : "border-transparent"
                        }
                        ${
                          isColor
                            ? getColorClasses(
                                value.toLowerCase()
                              )
                            : "bg-gray-200 text-gray-700"
                        }`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {variantDetails?  
          <div className="w-full shadow-2xl p-3 mt-5 font-template-badoni rounded-2xl space-y-2 relative">
            
              {cartItem? <div className="absolute bg-amber-300/20 text-amber-600 p-1 w-fit top-2 right-2 text-xs">item is already in cart</div> : null}
             <div className={`${cartItem? "mt-4" : "mt-0"}`}>
               <div className={`w-fit flex items-center gap-1`}>Instock{variantDetails.inStock === true? <div className="bg-green-300/80 text-green-900 rounded-full p-1 text-sm"><FaCheck /></div>: <div className="bg-yellow-500/50 text-yellow-500"><RiErrorWarningFill /></div>}</div>
            <div><span className="font-bold">product:</span> {variantDetails.sku}</div>
            <div><span className="font-bold">Weight:</span> {variantDetails.weight}</div>
            <div className="mt-2 bg-green-300/80 text-green-900 w-fit p-2 font-medium rounded-2xl ">{formatPrice(variantDetails.price)}</div>
             </div>
           
          </div> : null}

       
          <div className="flex items-center gap-4 mt-10">
            <div className="flex items-center border rounded-full px-4 py-2 gap-4">
              <button onClick={handleDecrease}>
                <RiSubtractLine />
              </button>

              <input
                value={qty}
                readOnly
                className="w-10 text-center bg-transparent"
              />

              <button onClick={handleIncrease}>
                <RiAddLine />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl max-sm:text-sm max-sm:px-3 "
            >
              <RiShoppingCartLine />
              {cartItem ? "Update Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
