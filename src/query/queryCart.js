import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addToCart, deleteCartItem, getCartItems, deletAllCartItems, updateCartItemQuantity, updateCartItemVariant, deleteCartItemVariant, addToWishList, getWishListItems, deleteWishListItem, deleteWishItemVariant, deletAllWishListItems } from "@/api/cart";


export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, quantity, variantId }) =>
      addToCart({ productId, quantity, variantId }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    },

    onError: (error) => {
      console.error(
        "Add to cart failed:",
        error?.response?.data || error.message
      );
    },
  });
};

export const useWishList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId,  variantId }) =>
      addToWishList({ productId,  variantId }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wish-items"] });
    },

    onError: (error) => {
      console.error(
        "Add to cart failed:",
        error?.response?.data || error.message
      );
    },
  });
};

export const useCartItems = () => {
  return useQuery({
    queryKey: ["cart-items"],
    queryFn: getCartItems,
  });
};

export const useGetWishListItems = () => {
  return useQuery({
    queryKey: ["wish-items"],
    queryFn: getWishListItems,
  });
};


export const useDeleteCartItem = () => {
  const queryClient = useQueryClient()
 return useMutation({
  mutationFn: ({productId}) => deleteCartItem({productId}),
  onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    },

    onError: (error) => {
      console.error(
        "delete cart item failed:",
        error.response?.data || error.message
      );
    },
 })
}

export const useDeleteWishItem = () => {
  const queryClient = useQueryClient()
 return useMutation({
  mutationFn: ({productId}) => deleteWishListItem({productId}),
  onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wish-items"] });
    },

    onError: (error) => {
      console.error(
        "delete wish item failed:",
        error.response?.data || error.message
      );
    },
 })
}

export const useDeleteCartItemVariant = () => {
  const queryClient = useQueryClient()
 return useMutation({
  mutationFn: ({productId, variantId}) => deleteCartItemVariant({productId, variantId}),
  onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    },

    onError: (error) => {
      console.error(
        "delete cart item failed:",
        error.response?.data || error.message
      );
    },
 })
}

export const useDeleteWishItemVariant = () => {
  const queryClient = useQueryClient()
 return useMutation({
  mutationFn: ({productId, variantId}) => deleteWishItemVariant({productId, variantId}),
  onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wish-items"] });
    },

    onError: (error) => {
      console.error(
        "delete wish item failed:",
        error.response?.data || error.message
      );
    },
 })
}


export const useClearCartItem = () => {
  const queryClient = useQueryClient()
 return useMutation({
  mutationFn: () => deletAllCartItems(),
  onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    },

    onError: (error) => {
      console.error(
        "delete cart item failed:",
        error.response?.data || error.message
      );
    },
 })
}

export const useClearWishItem = () => {
  const queryClient = useQueryClient()
 return useMutation({
  mutationFn: () => deletAllWishListItems(),
  onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wish-items"] });
    },

    onError: (error) => {
      console.error(
        "delete wish items failed:",
        error.response?.data || error.message
      );
    },
 })
}


export const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, quantity }) =>
      updateCartItemQuantity({ productId, quantity }),

    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    },

    onError: (error) => {
      console.error(
        "Update cart quantity failed:",
        error.response?.data || error.message
      );
    },
  });
};

export const useUpdateCartItemQuantityVariant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, variantId, quantity }) =>
      updateCartItemVariant({ productId, variantId, quantity }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    },

    onError: (error) => {
      console.error(
        "Update cart quantity failed:",
        error.response?.data || error.message
      );
    },
  });
};
