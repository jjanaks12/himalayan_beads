// import { Prisma, type Product } from '@prisma/client'
import { defineStore } from 'pinia'

/* const fullProduct = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: {
    category: true,
    prices: true,
    images: {
      include: {
        images: true
      }
    },
    stock: true
  }
})
export type FullProduct = Prisma.ProductGetPayload<typeof fullProduct>

const productWithImage = Prisma.validator<Prisma.ImageOnProductDefaultArgs>()({
  include: { images: true }
})
export type ProductWithImage = Prisma.ImageOnProductGetPayload<typeof productWithImage> */

export const useProductStore = defineStore('product', () => {
  const productList = ref<any[]>([])

  const fetchProduct = async () => {
    const a = await $fetch<APIResponse<any[]>>('/api/product')
    if (a.status == 'success')
      productList.value = a.data as any[]
  }

  const saveProduct = (values: any) => new Promise((resolve, reject) => {
    {
      $fetch<APIResponse<any>>('/api/product', {
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
