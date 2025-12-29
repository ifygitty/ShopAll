import { useEffect, useMemo, useState } from "react";
import { FaStar, FaCheck } from "react-icons/fa";
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

  const isLongDescription =
    product?.plainDescription?.length > DESCRIPTION_LIMIT;

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

  if (isLoading) return <FullPageLoader />;
  if (!product) return null;

  return (
    <div className="pt-10 space-y-10">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="flex justify-center h-100">
          <img
            src={product.image}
            className="rounded-lg bg-gray-100 h-full"
          />
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

          
          {attributeKeys.map((key) => (
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
          ))}

          {variantDetails && (
            <div className="w-full shadow-2xl p-3 mt-5 font-template-badoni rounded-2xl space-y-2 relative">
              {cartItem && (
                <div className="absolute bg-amber-300/20 text-amber-600 p-1 w-fit top-2 right-2 text-xs">
                  item is already in cart
                </div>
              )}

              <div
                className={`space-y-2 ${
                  cartItem ? "mt-4" : "mt-0"
                }`}
              >
                <div className="flex items-center gap-1">
                  Instock
                  {variantDetails.inStock ? (
                    <div className="bg-green-300/80 text-green-900 rounded-full p-1 text-sm">
                      <FaCheck />
                    </div>
                  ) : (
                    <div className="bg-yellow-500/50 text-yellow-500">
                      <RiErrorWarningFill />
                    </div>
                  )}
                </div>

                <div>
                  <strong>Product:</strong>{" "}
                  {variantDetails.sku}
                </div>

                <div>
                  <strong>Weight:</strong>{" "}
                  {variantDetails.weight}
                </div>

                <div>
                  {variantDetails.quantity}{" "}
                  {variantDetails.quantity <= 1
                    ? "unit"
                    : "units"}{" "}
                  available
                </div>

                <div className="mt-2 bg-green-300/80 text-green-900 w-fit p-2 font-medium rounded-2xl">
                  {formatPrice(variantDetails.price)}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mt-10">
            <div className="flex items-center border rounded-full px-4 py-2 gap-4">
              <button onClick={handleDecrease}>
                <RiSubtractLine />
              </button>

              <input
                type="text"
                value={qty}
                onChange={handleQtyChange}
                className="w-12 text-center bg-transparent outline-none"
              />

              <button onClick={handleIncrease}>
                <RiAddLine />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isadding || isupdating || isupdatingVariant}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl max-sm:text-sm max-sm:px-3"
            >
              <RiShoppingCartLine />
              {isadding || isupdating || isupdatingVariant ? (
                <div className="flex items-center gap-3">
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  {cartItem ? "updating..." : "adding..."}
                </div>
              ) : cartItem ? (
                "Update Cart"
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
