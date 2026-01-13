import { getAllProducts, getProductDetails, listAllCategories, listProductsByCategory } from "@/api/products";
import { useQuery } from "@tanstack/react-query";



// export const useGetListProducts = () => {
//   return useQuery({
//     queryKey: ["products"],    
//     queryFn: getAllProducts,  
//     refetchOnReconnect: "always",
//     refetchOnWindowFocus: false
//   });
// };

export const useGetListProducts = ({ page, limit }) => {
  return useQuery({
    queryKey: ["products", page],
    queryFn: () => getAllProducts({ page, limit }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};



export const useProductDetails = (id) => {
  return useQuery({
    queryKey: ["product-details", id],
    queryFn: () => getProductDetails(id),
    enabled: !!id,  
  })
}

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product-details", id],
    queryFn: () => getProductDetails(id),
    enabled: !!id,  
  })
}


export const useProductsByCategory = (categoryId) => {
  return useQuery({
    queryKey: ["products-by-category", categoryId],
    queryFn: () => listProductsByCategory(categoryId),
    enabled: !!categoryId,  
  });
};


export const useAllCategories = () => {
  return useQuery({
    queryKey: ["all-categories"],
    queryFn: listAllCategories,
  });
};



