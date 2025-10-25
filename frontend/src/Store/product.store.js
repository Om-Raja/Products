import {create} from "zustand";

export const useProductStore = create((set)=>({
    products: [],

    setProducts: (products)=>set({
       products: products,
    }),

    createProduct: async (newProduct)=>{
        if(!newProduct.name || !newProduct.price || !newProduct.image)
            return {success: false, message: "All fields are required."};

        const response = await fetch("/api/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({product: newProduct}),
        })

        const data = await response.json();

        set((state)=>({
            products:[...state.products, data.data]
        }));

        return {success: true, message: "Product created successfully!"};
    }
}))