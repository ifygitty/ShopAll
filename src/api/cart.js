import { cart } from "salesive-api-axios";


export const addToCart = async ({ productId, quantity, variantId }) => {
  try {
    const payload = variantId
      ? { productId, variantId, quantity }
      : { productId, quantity };

    const response = await cart.addItem(payload);
    return response?.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message || "Error adding item to cart");
    }
    throw new Error("Unexpected error occurred while adding item to cart");
  }
};


export const getCartItems = async () => {
    try {
        const response = await cart.get();
        return response?.data;
    }catch(err) {
        if (err instanceof Error) {
            throw new Error(err?.message || "Error occurred while  getting cart items");
        }
        throw new Error("Error occurred while  getting cart items");
    }
}


export const deleteCartItem = async ({productId}) => {
    try {
        const response = await cart.removeItem(productId)
        return response?.data;
    }catch(err) {
        if (err instanceof Error) {
            throw new Error(err?.message || "Error occurred while trying to delete cart item");
        }
        throw new Error("Error occurred while trying to delete cart item");
    }
}

export const deletAllCartItems = async () => {
    try {
        const response = await cart.clear();
        return response?.data;
    }catch(err) {
        if (err instanceof Error) {
            throw new Error(err?.message || "Error occurred while trying to delete items in cart");
        }
        throw new Error("Error occurred while trying to delete items in cart");
    }
}


export const updateCartItemQuantity = async ({productId, quantity}) => {
    try {   
        const response = await cart.updateItemQuantity(productId, {
            quantity
        });
        return response?.data;
    }catch(err) {
        if (err instanceof Error) {
            throw new Error(err?.message || "Error occurred while trying to update items in cart");
        }
        throw new Error("Unexpected error occurred while trying to update items in cart");
    }
}

export const updateCartItemVariant = async ({productId, variantId, quantity}) => {
    try {
        const response = await cart.updateVariantQuantity(productId, variantId, {
            quantity
        });
        return response?.data;
    }catch(err) {
        if (err instanceof Error) {
            throw new Error(err?.message || "Error occurred while trying to update items in cart");
        }
        throw new Error("Unexpected error occurred while trying to update items in cart");
    }
}