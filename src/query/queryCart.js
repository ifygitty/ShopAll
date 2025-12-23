import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addToCart, deleteCartItem, getCartItems, deletAllCartItems, updateCartItemQuantity } from "@/api/cart";


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

export const useCartItems = () => {
  return useQuery({
    queryKey: ["cart-items"],
    queryFn: getCartItems,
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
