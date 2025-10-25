import {create} from "zustand";

const useProductStore = create((set)=>{
    const product = {
        name: "",
        price: "",
        image: ""
    }

    addProduct: ({product})=>(set({
        name: product.name,
        price: product.price,
        image: product.image
    }));

    updateProduct: ((product)=>{
        set((state)=>{})
    })
})