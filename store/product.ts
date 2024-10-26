import { Prisma, type Product } from '@prisma/client'
import { defineStore } from 'pinia'

const fullProduct = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: {
    category: true,
    prices: true,
    images: true,
    stock: true
  }
})
type FullProduct = Prisma.ProductGetPayload<typeof fullProduct>

export const useProductStore = defineStore('product', () => {
  const productList = ref<FullProduct[]>([])

  const fetchProduct = async () => {
    const a = await $fetch<APIResponse<FullProduct[]>>('/api/product')
    if (a.status == 'success')
      productList.value = a.data
  }

  const saveProduct = (values: any) => new Promise((resolve, reject) => {
    {
      $fetch<APIResponse<Product>>('/api/product', {
        method: 'POST',
        body: values
      })
        .then((a) => {
          if (a.status == 'success')
            resolve(true)
          else
            reject(a.message)
        })
    }
  })

  return { fetchProduct, saveProduct, productList }
})
