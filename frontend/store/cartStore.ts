// file: stores/cartStore.ts

import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  // State: The data of our store
  state: () => ({
    wishlistItems: [] as number[],
    cartItems: [] as number[],
  }),

  // Getters: Computed properties for our state
  getters: {
    /**
     * Checks if a product is in the wishlist.
     * @param state - The store's state.
     * @returns A function that takes a productId and returns a boolean.
     */
    isWishlisted: (state) => {
      return (productId: number) => state.wishlistItems.includes(productId);
    },
    isCarted: (state) => {
      return (productId: number) => state.cartItems.includes(productId);
    },
  },

  // Actions: Methods to change the state
  actions: {
    /**
     * Toggles a product's presence in the wishlist.
     * @param productId - The ID of the product to toggle.
     */
    toggleWishlist(productId: number) {
      const index = this.wishlistItems.indexOf(productId);
      if (index > -1) {
        this.wishlistItems.splice(index, 1); // Remove if exists
      } else {
        this.wishlistItems.push(productId); // Add if not
      }
    },

    /**
     * Adds a product to the cart (placeholder function).
     * @param productId - The ID of the product to add.
     */
    addToCart(productId: number) {
      this.cartItems.push(productId); // Add if not
      // In a real app, you would add logic here to manage cart items.
      console.log(`Product ${productId} added to cart!`);
    },
  },

  // Enable persistence for this store
  persist: true,
});
