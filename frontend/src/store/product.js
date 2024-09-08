import { set } from 'mongoose'
import { useState } from 'react'
import {create} from 'zustand'

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {success:false, message: "Please fill in all fields."}
        }
        const res = await fetch("/api/Products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });
        const data = await res.json();
        set((state) => ({products: [...state.products, data.data]}));
        return {success:true, message: "Product created successfully"};
    },

    fetchProducts: async() => {
        const res = await fetch("/api/Products");
        const data = await res.json();
        set({products: data.data})
    },

    deleteProduct: async (pid) => {
        const res = await fetch(`/api/Products/${pid}`,{
            method: "DELETE",
        })
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};

        set(state => ({ products: state.products.filter(product => product._id !== pid)}));
        return {success: true, message: data.message};
    },

    updateProduct: async(pid, updateProduct) => {
        const res = await fetch(`/api/Products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateProduct),
        });
        const data = await res.json();
        if(!data.success) return{ success: false, message: data.message};

        //update UI without refresh
        set(state=> ({
            products: state.products.map((product) => (product._id === pid ? data.data : product)),
        }));
        return {success: true, message: data.message};
    }
}));

