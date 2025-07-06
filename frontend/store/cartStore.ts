// file: stores/cartStore.ts

import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Product, CartItem } from "~/himalayan_beads";

export const useCartStore = defineStore("cart", () => {
  // --- STATE ---
  const wishlistItems = ref<Product[]>([]);
  const cartItems = ref<CartItem<Product>[]>([]);

  // --- GETTERS ---
  const isWishlisted = computed(() => (productId: string): boolean => {
    return wishlistItems.value.some((item) => item && item.id === productId);
  });

  const isCarted = computed(() => (productId: string): boolean => {
    return cartItems.value.some(
      (item) => item && item.product && item.product.id === productId
    );
  });

  const totalCartItems = computed((): number => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  });

  // --- ACTIONS ---
  function toggleWishlist(product: Product) {
    const index = wishlistItems.value.findIndex(
      (item) => item.id === product.id
    );
    if (index > -1) {
      wishlistItems.value.splice(index, 1);
    } else {
      wishlistItems.value.push(product);
    }
  }

  function addToCart(product: Product) {
    const existingItem = cartItems.value.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.value.push({ product, quantity: 1 });
    }
  }

  // --- NEW REMOVAL FUNCTIONS ---

  /**
   * Removes an item completely from the wishlist by its ID.
   * @param productId The ID of the product to remove from the wishlist.
   */
  function removeFromWishlist(productId: string) {
    wishlistItems.value = wishlistItems.value.filter(
      (item) => item.id !== productId
    );
  }

  /**
   * Removes an item line completely from the cart by its product ID.
   * @param productId The ID of the product to remove from the cart.
   */
  function removeFromCart(productId: string) {
    cartItems.value = cartItems.value.filter(
      (item) => item.product.id !== productId
    );
  }

  /**
   * Decreases an item's quantity in the cart. If the quantity reaches zero, it removes the item.
   * @param productId The ID of the product whose quantity should be decreased.
   */
  function decreaseCartItemQuantity(productId: string) {
    const existingItem = cartItems.value.find(
      (item) => item.product.id === productId
    );

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
      } else {
        // If quantity is 1, remove the item completely by calling our other function.
        removeFromCart(productId);
      }
    }
  }

  // The return object, structured according to your convention
  return {
    // State
    wishlistItems,
    cartItems,
    // Getters
    isWishlisted,
    isCarted,
    totalCartItems,
    // Actions
    toggleWishlist,
    addToCart,
    removeFromWishlist,
    removeFromCart,
    decreaseCartItemQuantity,
  };
},
  {
    // Persistence configuration
    persist: {
      pick: ["wishlistItems", "cartItems"]
    },
  }
);