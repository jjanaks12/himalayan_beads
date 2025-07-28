import { ref, computed } from "vue"
import { defineStore } from "pinia"

import type { Product, CartItem, Price } from "~/himalayan_beads"


export const useCartStore = defineStore("cart", () => {
  // --- STATE ---
  const wishlistItems = ref<Product[]>([])
  const cartItems = ref<CartItem<Product>[]>([])

  // --- GETTERS ---
  const isWishlisted = computed(() => (productId: string): boolean => wishlistItems.value.some((item) => item && item.id === productId))
  const isCarted = computed(() => (productId: string): boolean => cartItems.value.some((item) => item && item.product && item.product.id === productId))
  const totalCartItems = computed((): number => cartItems.value.reduce((total, item) => total + item.quantity, 0))
  const total = computed(() => cartItems.value.reduce((sum, item) => sum + (item.quantity * item.product.prices[item.product.prices.length - 1].amount), 0))
  const tax = computed(() => total.value * 0.13)
  const discount = computed(() => 0)
  const grandtotal = computed(() => total.value + tax.value - discount.value)

  // --- ACTIONS ---
  const toggleWishlist = (product: Product) => {
    const index = wishlistItems.value.findIndex((item) => item.id === product.id)

    if (index > -1) {
      wishlistItems.value.splice(index, 1)
    } else {
      wishlistItems.value.push(product)
    }
  }

  const addToCart = (product: Product, price: Price) => {
    const existingItem = cartItems.value.find((item) => item.product.id === product.id)

    if (existingItem) {
      existingItem.quantity++
    } else {
      cartItems.value.push({ product, quantity: 1, price })
    }
  }

  /**
   * Removes an item completely from the wishlist by its ID.
   * @param productId The ID of the product to remove from the wishlist.
   */
  const removeFromWishlist = (productId: string) => {
    wishlistItems.value = wishlistItems.value.filter((item) => item.id !== productId)
  }

  /**
   * Removes an item line completely from the cart by its product ID.
   * @param productId The ID of the product to remove from the cart.
   */
  const removeFromCart = (productId: string) => {
    cartItems.value = cartItems.value.filter((item) => item.product.id !== productId)
  }

  /**
   * Decreases an item's quantity in the cart. If the quantity reaches zero, it removes the item.
   * @param productId The ID of the product whose quantity should be decreased.
   */
  const decreaseCartItemQuantity = (productId: string) => {
    const existingItem = cartItems.value.find((item) => item.product.id === productId)

    if (existingItem)
      if (existingItem.quantity > 1) {
        existingItem.quantity--
      } else {
        // If quantity is 1, remove the item completely by calling our other function.
        removeFromCart(productId)
      }
  }

  const clearCart = () => {
    cartItems.value = []
  }

  // The return object, structured according to your convention
  return {
    // State
    wishlistItems, cartItems,
    // Getters
    isWishlisted, isCarted, totalCartItems, total, tax, discount, grandtotal,
    // Actions
    toggleWishlist, addToCart, removeFromWishlist, removeFromCart, decreaseCartItemQuantity, clearCart
  }
},
  {
    // Persistence configuration
    persist: {
      pick: ["wishlistItems", "cartItems"]
    },
  }
)