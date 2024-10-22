import type { Product } from '@prisma/client'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', () => {
  const productList = ref<Product[]>([])

  const fetchProduct = async () => {
    const a = await $fetch<APIResponse<Product[]>>('/api/product')
    if (a.status == 'success')
      productList.value = a.data
  }

  return { fetchProduct }
})
