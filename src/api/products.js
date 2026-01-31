import { products }from "salesive-api-axios";




export const getAllProducts = async ({ page = 1, limit = 10 }) => {
  try {
    const response = await products.list({
      page,
      limit,
    });

    return response;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        err.message || "Error occurred while trying to fetch products"
      );
    }

    throw new Error("Unexpected error occurred while trying to fetch products");
  }
};





export const getProductDetails = async (id) => {
    try {
        const response = await products.getById(id);
        return response?.data;
    }catch(err) {
        if (err instanceof Error) {
            throw new Error(err?.message || "Error occurred while trying to fetch product details")
        }
        throw new Error("Error occurred while trying to fetch product details");
    }
}

export const listProductsByCategory = async (categoryId) => {
    try {
        const data = await products.listByCategory(categoryId);
        return data?.data;
    }catch(err) {
        if (err instanceof Error) {
            throw new Error(err?.message || "Error getting products category");
        }
        throw new Error("Error getting products category");
    }
}


export const  listAllCategories = async () => {
    try {
        const data = await products.listCategories();
        return data.data;
    }catch(err) {
        if (err instanceof Error) {
            throw new Error(err?.message || "Error fetching categories");
        }
        throw new Error("Error fetching categories");
    }
}

