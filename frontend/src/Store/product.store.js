import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  loading: true,

  setProducts: (products) =>
    set({
      products: products,
    }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image)
      return { success: false, message: "All fields are required." };

    const response = await fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: newProduct }),
    });

    const data = await response.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      products: [...state.products, data.data],
    }));

    return { success: true, message: data.message };
  },

  fetchProducts: async () => {
    const response = await fetch("/api/product", {
      method: "GET",
      headers: {
        "Contetn-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!data.success) return { success: false, message: data.message };

    set({ products: data.data, loading: false });

    return { success: true, message: data.message };
  },

  deleteProduct: async (productId) => {
    if (!productId)
      return { success: false, message: "Product Id is required" };

    const response = await fetch(`api/product/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!data.success) return { success: false, message: data.message };

    set((state) => {
      let index = state.products.findIndex((obj) => obj._id === productId);

      //return karna jaruri hai
      return state.products.splice(index, 1);
    });

    return { success: true, message: data.message };
  },

  updateProduct: async (productId, updatedProduct) => {
    const response = await fetch(`/api/product/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({newProduct: updatedProduct}),
    });

    const data = await response.json();

    if (!data.success) return { success: false, message: data.message };

    //updates UI without pressing refresh button because it changes the store and that UI is subscribed to the store
    set((state)=>{
        const index = state.products.findIndex((prod)=>prod._id === productId);

        if(index === -1) return state.products;
        else return state.products.splice(index, 1, updatedProduct);
    })

    return { success: true, message: data.message };
  },
}));
