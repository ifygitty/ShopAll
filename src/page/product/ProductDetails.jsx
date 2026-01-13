import { useEffect, useMemo, useState } from "react";
import { FaStar, FaCheck } from "react-icons/fa";
import {
  RiAddLine,
  RiSubtractLine,
  RiShoppingCartLine,
  RiErrorWarningFill,
} from "react-icons/ri";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useProductDetails } from "@/query/queryProducts";
import {
  useAddToCart,
  useCartItems,
  useUpdateCartItemQuantityVariant,
} from "@/query/queryCart";
import { useUpdateCartItemQuantity } from "@/query/queryCart";

import FullPageLoader from "@/component/FullPageLoader";
import { toast } from "sonner";

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

  const { mutate: addToCart, isPending: isadding } = useAddToCart();
  const {
    mutate: updateQtyVariant,
    isPending: isupdatingVariant,
  } = useUpdateCartItemQuantityVariant();
  const {
    mutate: updateQty,
    isPending: isupdating,
  } = useUpdateCartItemQuantity();

  const product = data?.data;
  const cartItems = cartResponse?.data?.items || [];

  const [qty, setQty] = useState(1);

  
  const DESCRIPTION_LIMIT = 160;
  const [showFullDescription, setShowFullDescription] =
    useState(false);

  const isLongDescription =  product?.plainDescription?.length > DESCRIPTION_LIMIT;

  const displayedDescription = showFullDescription
    ? product?.plainDescription
    : product?.plainDescription?.slice(0, DESCRIPTION_LIMIT);

  
  const groupedAttributes = useMemo(() => {
    if (!product?.variants?.length) return {};

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
    if (!product?.variants?.length) return null;

    return product.variants.find((variant) =>
      Object.entries(selectedAttributes).every(
        ([key, value]) => variant.attributes[key] === value
      )
    );
  }, [product, selectedAttributes]);

  const selectedVariantId = selectedVariant?.id;

 
  const cartItem = useMemo(() => {
    if (!product) return null;

    return cartItems.find((item) => {
      if (selectedVariantId) {
        return (
          item.productId === product._id &&
          item.variantId === selectedVariantId
        );
      }
      return item.productId === product._id;
    });
  }, [cartItems, product, selectedVariantId]);

  const variantDetails = useMemo(() => {
    if (!product?.variants?.length || !selectedVariantId)
      return null;

    return product.variants.find(
      (item) => item.id === selectedVariantId
    );
  }, [product, selectedVariantId]);

  useEffect(() => {
    if (cartItem) {
      setQty(cartItem.quantity);
    } else {
      setQty(1);
    }
  }, [cartItem]);

  
  const handleIncrease = () => {
    setQty((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQty((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleQtyChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setQty(value ? Number(value) : 1);
  };

  
  const handleAddToCart = () => {
    if (!product) return;

   
    if (cartItem) {
      if (selectedVariantId) {
        updateQtyVariant(
          {
            productId: product._id,
            variantId: selectedVariantId,
            quantity: qty,
          },
          {
            onSuccess: () =>
              toast.success("Cart updated successfully"),
            onError: () =>
              toast.error("Failed to update cart"),
          }
        );
      } else {
        updateQty(
          {
            productId: product._id,
            quantity: qty,
          },
          {
            onSuccess: () =>
              toast.success("Cart updated successfully"),
            onError: () =>
              toast.error("Failed to update cart"),
          }
        );
      }

      return;
    }

    addToCart(
      {
        productId: product._id,
        ...(selectedVariantId && {
          variantId: selectedVariantId,
        }),
        quantity: qty,
      },
      {
        onSuccess: () =>
          toast.success("Item added to cart successfully"),
        onError: () =>
          toast.error("Failed to add item to cart"),
      }
    );
  };


  const getColorClasses = (color) => {
    if (color === "white")
      return "bg-gray-200 text-gray-400 border";
    if (color === "black") return "bg-black/60 text-white";
    if (color === "blue") return "bg-blue-500/80 text-blue-700";
    if (color === "gray") return "bg-gray-500/80 text-gray-700";
    if (color === "yellow")
      return "bg-yellow-500/80 text-yellow-700";
    if (color === "brown")
      return "bg-variant-brown/80 text-white";
    if (color === "red") return "bg-red-500/80 text-red-700";
    if (color === "green")
      return "bg-green-500/80 text-green-700";

    return `bg-${color}-500/80 text-${color}-700`;
  };

  const images = useMemo(() => {
  if (product?.images?.length) return product.images;
  if (product?.image) return [product.image];
  return [];
}, [product]);

const [activeImage, setActiveImage] = useState(null);

useEffect(() => {
  if (images.length) {
    setActiveImage(images[0]);
  }
}, [images]);

  if (isLoading) return <FullPageLoader />;
  if (!product) return null;

  return (
    <div className="pt-10 space-y-10 ">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-4 no-scrollbar">

 
          <div className="relative w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={activeImage}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          
          <motion.div
          className="relative w-full overflow-hidden"
        >
          <motion.div
            className="flex gap-3 pr-2 no-scrollbar"
            drag="x"
            dragElastic={0.15}
            dragConstraints={{ left: 0, right: 0 }}
          >
            {images.map((img, index) => {
              const isActive = img === activeImage;

              return (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveImage(img)}
                  className={`relative shrink-0 w-[72px] h-[72px] sm:w-[80px] sm:h-[80px]
                    rounded-xl overflow-hidden border transition no-scrollbar
                    ${
                      isActive
                        ? "border-2 border-gray-800 "
                        : "shadow-lg opacity-70 hover:opacity-100"
                    }`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                  />

                  {isActive && (
                    <motion.div
                      layoutId="activeThumb"
                      className="absolute inset-0 ring-2 ring-black rounded-xl"
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>

        </div>


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

          
          {/* {attributeKeys.map((key) => (
            <div key={key} className="mt-6 space-y-2">
              <p className="font-medium uppercase text-sm">
                {key}
              </p>

              <div className="flex flex-wrap gap-2">
                {[...groupedAttributes[key]].map((value) => {
                  const active =
                    selectedAttributes[key] === value;
                  const isColor =
                    key === "color" || key === "colour";

                  return (
                    <button
                      key={value}
                      onClick={() =>
                        setSelectedAttributes((prev) => ({
                          ...prev,
                          [key]: value,
                        }))
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
          ))} */}
          {attributeKeys.map((key) => {
  const isColor = key === "color" || key === "colour";

  return (
    <div
      key={key}
      className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
    >
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-800">
          {key}
        </h3>

        <span className="text-xs text-gray-400">
          {selectedAttributes[key]}
        </span>
      </div>

     
      <div
        className={`grid gap-3 ${
          isColor ? "grid-cols-6 sm:grid-cols-8" : "grid-cols-2 sm:grid-cols-3"
        }`}
      >
        {[...groupedAttributes[key]].map((value) => {
          const active = selectedAttributes[key] === value;

          return (
            <motion.button
              key={value}
              onClick={() =>
                setSelectedAttributes((prev) => ({
                  ...prev,
                  [key]: value,
                }))
              }
              whileTap={{ scale: 0.96 }}
              className={`relative flex items-center justify-center rounded-xl transition-all duration-300
                ${
                  isColor
                    ? "h-10 w-10"
                    : "px-4 py-3 text-sm font-medium"
                }
                ${
                  active
                    ? "bg-gray-800 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
         
              {isColor ? (
                <span
                  className="h-6 w-6 rounded-full border"
                  style={{ backgroundColor: value.toLowerCase() }}
                />
              ) : (
                value
              )}

            
              {active && (
                <motion.span
                  layoutId={`active-${key}`}
                  className="absolute inset-0 rounded-xl ring-2 ring-gray-800"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
})}




          {variantDetails && (
  <div className="relative w-full max-w-md mt-10 bg-gradient-to-tr from-gray-50 via-white to-gray-50 shadow-xl rounded-3xl p-6 overflow-hidden border border-gray-100">

    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-2xl shadow-md z-10">
      {variantDetails.inStock ? "In Stock" : "Out of Stock"}
    </div>

    <div className="mb-4">
      <span className="text-gray-500 text-sm">Product SKU:</span>
      <h2 className="text-lg font-bold text-gray-800">{variantDetails.sku}</h2>
    </div>

    
    <div className="flex justify-between items-center mb-4">
      <div className="flex flex-col">
        <span className="text-gray-400 text-xs uppercase">Weight</span>
        <span className="font-medium text-gray-700">{variantDetails.weight}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-gray-400 text-xs uppercase">Available</span>
        <span className="font-medium text-gray-700">
          {variantDetails.quantity} {variantDetails.quantity <= 1 ? "unit" : "units"}
        </span>
      </div>
    </div>

   
    <div className="relative bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-2xl p-4 shadow-inner flex items-center justify-between">
      <div>
        <span className="text-sm text-gray-500">Price</span>
        <h3 className="text-xl font-bold text-gray-900 mt-1">{formatPrice(variantDetails.price)}</h3>
      </div>
      <div className="flex items-center gap-2 text-green-600">
        {variantDetails.inStock ? (
          <FaCheck className="text-xl" />
        ) : (
          <RiErrorWarningFill className="text-xl" />
        )}
      </div>
    </div>

  
    {cartItem && (
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold shadow-md flex items-center gap-2">
        <RiErrorWarningFill /> Item already in cart
      </div>
    )}
  </div>
)}



          <div className="mt-5 rounded-3xl bg-white/70 backdrop-blur-xl border border-gray-100 shadow-xl p-5 flex flex-col gap-5">


  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-gray-600">
      Quantity
    </span>

    <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 shadow-inner">
      <button
        onClick={handleDecrease}
        className="h-9 w-9 flex items-center justify-center rounded-full text-gray-600 hover:bg-white hover:shadow transition"
      >
        <RiSubtractLine />
      </button>

      <input
        type="text"
        value={qty}
        onChange={handleQtyChange}
        className="w-12 text-center bg-transparent outline-none text-base font-semibold text-gray-800"
      />

      <button
        onClick={handleIncrease}
        className="h-9 w-9 flex items-center justify-center rounded-full text-gray-600 hover:bg-white hover:shadow transition"
      >
        <RiAddLine />
      </button>
    </div>
  </div>


  <button
    onClick={handleAddToCart}
    disabled={isadding || isupdating || isupdatingVariant}
    className={`relative flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-semibold text-base transition-all
      ${
        cartItem
          ? "bg-black hover:bg-gray-900"
          : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
      }
      disabled:opacity-70 disabled:cursor-not-allowed
    `}
  >
   
    {(isadding || isupdating || isupdatingVariant) ? (
      <div className="flex items-center gap-3">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        <span className="tracking-wide">
          {cartItem ? "Updating cart…" : "Adding to cart…"}
        </span>
      </div>
    ) : (
      <>
        <RiShoppingCartLine className="text-xl" />
        <span className="tracking-wide">
          {cartItem ? "Update Cart" : "Add to Cart"}
        </span>
      </>
    )}
  </button>
</div>



        </div>
      </div>
    </div>
  );
};

export default Product;
