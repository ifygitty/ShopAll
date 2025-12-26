import { useEffect, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import { RiAddLine, RiSubtractLine, RiShoppingCartLine } from "react-icons/ri";
import { useParams } from "react-router-dom";

import { useProductDetails } from "@/query/queryProducts";
import {
  useAddToCart,
  useCartItems,
  useUpdateCartItemQuantity,
} from "@/query/queryCart";

import FullPageLoader from "@/component/FullPageLoader";

const Product = () => {
  const { id } = useParams();

  const { data, isLoading } = useProductDetails(id);
  const { data: cartResponse } = useCartItems();

  const { mutate: addToCart } = useAddToCart();
  const { mutate: updateQty } = useUpdateCartItemQuantity();

  const product = data?.data;
  const cartItems = cartResponse?.data?.items || [];

  const [selectedVariantId, setSelectedVariantId] = useState(null);

  useEffect(() => {
    if (product?.variants?.length) {
      setSelectedVariantId(product.variants[0].id);
    }
  }, [product]);

  const cartItem = useMemo(() => {
    return cartItems.find(
      (item) =>
        item.productId === product?._id &&
        item.variantId === selectedVariantId
    );
  }, [cartItems, product?._id, selectedVariantId]);

 
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (cartItem) {
      setQty(cartItem.quantity);
    } else {
      setQty(1);
    }
  }, [cartItem]);

  if (isLoading) return <FullPageLoader />;
  if (!product) return null;

  
  const handleIncrease = () => {
    const newQty = qty + 1;
    setQty(newQty);

    cartItem
      ? updateQty({ productId: product._id, quantity: newQty })
      : addToCart({
          productId: product._id,
          quantity: newQty,
          variantId: selectedVariantId,
        });
  };

  const handleDecrease = () => {
    if (qty <= 1) return;
    const newQty = qty - 1;
    setQty(newQty);
    updateQty({ productId: product._id, quantity: newQty });
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      quantity: qty,
      variantId: selectedVariantId,
    });
  };

  
  return (
    <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
      <div className="grid md:grid-cols-2 gap-16">
        <img
          src={product.image}
          className="rounded-lg bg-gray-100"
        />

        <div>
          <h1 className="text-3xl font-medium">{product.name}</h1>

          <div className="flex items-center gap-2">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} className="text-orange-600" />
            ))}
            <FaStar className="text-gray-300" />
            <p>(4.5)</p>
          </div>

          <p className="text-gray-600 mt-4">
            {product.plainDescription}
          </p>

          <p className="text-3xl font-semibold mt-6">
            ₦{product.price}
          </p>

         
          {product.variants?.length > 0 && (
            <div className="mt-6 space-y-2">
              <p className="font-medium">Variants</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => {
                  const active = variant.id === selectedVariantId;

                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition
                        ${
                          active
                            ? "bg-blue-500/70 text-blue-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                    >
                      {Object.values(variant.attributes).join(" / ")}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          
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
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl"
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
