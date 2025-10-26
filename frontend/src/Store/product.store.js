import {create} from "zustand";

export const useProductStore = create((set)=>({
    products: [],
    loading: true,

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
    },

    fetchProducts: async()=>{
        const response = await fetch("/api/product", {
            method: "GET",
            headers:{
                "Contetn-Type": "application/json",
            }
        });

        const data = await response.json();

        set({products: data.data, loading: false});
    },

    deleteProduct: async(productId)=>{
        if(!productId) return {success: false, message: "Product Id is required"};


        const response = await fetch(`api/product/${productId}`, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        set((state)=>{
            let index = state.products.findIndex((obj)=>obj._id === productId);

            console.log(state.products);
            
            //return karna jaruri hai
            return state.products.splice(index, 1);
        })

        return {success: true, message: "Deleted product successfully!", data: data.data};

    },


}))