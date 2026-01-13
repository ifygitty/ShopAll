import { wishlist } from "salesive-api-axios";
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

export const addToWishList = async ({ productId, variantId }) => {
  try {
    const payload = variantId
      ? { productId, variantId,  }
      : { productId, };

    const response = await wishlist.addItem(payload);
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

export const getWishListItems = async () => {
    try {
        const response = await wishlist.get();
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

export const deleteWishListItem = async ({productId}) => {
    try {
        const response = await wishlist.removeItem(productId)
        return response?.data;
    }catch(err) {
        if (err instanceof Error) {
            throw new Error(err?.message || "Error occurred while trying to delete wish item");
        }
        throw new Error("Error occurred while trying to delete wish item");
    }
}

export const deleteCartItemVariant = async ({productId, variantId}) => {
    try {
        const response = await cart.removeVariant(productId, variantId);
        return response?.data;
    }catch(err) {
        if (err instanceof Error) {
            throw new Error(err?.message || "Error occurred while trying to delete items in wishList");
        }
        throw new Error("Unexpected error occurred while trying to delete items in wishList");
    }
}

export const deleteWishItemVariant = async ({productId, variantId}) => {
    try {
        const response = await wishlist.removeVariant(productId, variantId);
        return response?.data;
    }catch(err) {
        if (err instanceof Error) {
            throw new Error(err?.message || "Error occurred while trying to delete items in cart");
        }
        throw new Error("Unexpected error occurred while trying to delete items in cart");
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

export const deletAllWishListItems = async () => {
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
        console.log(variantId)
        const response = await cart.updateVariantQuantity(productId, variantId, {quantity});
        return response?.data;
    }catch(err) {
        if (err instanceof Error) {
            throw new Error(err?.message || "Error occurred while trying to update items in cart");
        }
        throw new Error("Unexpected error occurred while trying to update items in cart");
    }
}