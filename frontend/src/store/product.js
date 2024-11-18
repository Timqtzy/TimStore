import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: 'Please fill in all fields.' };
    }
    try {
      const res = await fetch('/api/Products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error creating product:', errorData);
        return { success: false, message: errorData.message || 'Failed to create product.' };
      }
      const data = await res.json();
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: 'Product created successfully' };
    } catch (error) {
      console.error('Error creating product:', error);
      return { success: false, message: 'An error occurred while creating the product.' };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await fetch('/api/Products');
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error fetching products:', errorData);
        set({ products: [] });
        return;
      }
      const data = await res.json();
      set({ products: data.data || [] });
    } catch (error) {
      console.error('Error fetching products:', error);
      set({ products: [] });
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/Products/${pid}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error deleting product:', errorData);
        return { success: false, message: errorData.message || 'Failed to delete product.' };
      }
      const data = await res.json();
      set((state) => ({
        products: state.products.filter((product) => product && product._id !== pid),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      console.error('Error deleting product:', error);
      return { success: false, message: 'An error occurred while deleting the product.' };
    }
  },

  updateProduct: async (pid, updateProduct) => {
    try {
      const res = await fetch(`/api/Products/${pid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateProduct),
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error updating product:', errorData);
        return { success: false, message: errorData.message || 'Failed to update product.' };
      }
      const data = await res.json();
      set((state) => ({
        products: state.products.map((product) => (product._id === pid ? data.data : product)),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      console.error('Error updating product:', error);
      return { success: false, message: 'An error occurred while updating the product.' };
    }
  },
}));
