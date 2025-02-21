import type { Product } from '@prisma/client'
import { defineStore } from 'pinia'
import type { CartItem, FullProduct, ProductWithRate } from '~/himalayan_beads'

export const useCartStore = defineStore('cart', () => {
  const list = ref<CartItem<ProductWithRate>[]>([])
  const isLoading = ref(false)

  const addToCart = ({ prices, ...product }: FullProduct) => {
    list.value.push({
      product: {
        ...product,
        prices,
        rate: prices[prices.length - 1].price
      }, quantity: 1
    })
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
