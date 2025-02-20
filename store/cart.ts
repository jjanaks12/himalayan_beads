import type { Product } from '@prisma/client'
import { defineStore } from 'pinia'
import type { CartItem } from '~/himalayan_beads'

export const useCart = defineStore('cart', () => {
  const list = ref<CartItem<Product>[]>([])
  const isLoading = ref(false)

  const addToCart = (product: Product) => {
    list.value.push({ product, quantity: 1 })
  }

  const removeFromCart = (product_id: string) => {
    const ci: any = list.value.find((cartItem: CartItem<Product>) => cartItem?.product?.id === product_id)
    const index = list.value.indexOf(ci)

    if (index >= 0)
      list.value.splice(index, 1)
  }

  const isInCart = (product_id: string) => {
    const ci: any = list.value.find((cartItem: CartItem<Product>) => cartItem?.product?.id === product_id)
    return ci != null
  }

  const checkout = async () => {
    isLoading.value = true
    await $fetch('/api/cart/checkout', {
      method: 'POST',
      body: list.value
    })
      .finally(() => {
        isLoading.value = false
      })
  }

  return { list, isLoading, addToCart, removeFromCart, isInCart, checkout }
}, {
  persist: [{
    storage: persistedState.localStorage,
    pick: ['list']
  }]
})
