import { Prisma, type Category } from '@prisma/client'
import { defineStore } from 'pinia'
import type { APIResponse } from '~/himalayan_beads'

/* const categoryWithPredecessor = Prisma.validator<Prisma.CategoryDefaultArgs>()({
  include: {
    predecessor: true,
    image: true
  }
})
type CategoryWithPredecessor = Prisma.CategoryGetPayload<typeof categoryWithPredecessor> */

export const useProductCategoryStore = defineStore('product_category', () => {
  const categoryList = ref<any[]>([])

  const fetchCategory = async () => {
    $fetch<APIResponse<any[]>>('/api/category')
      .then(response => {
        if (response.status == 'success')
          categoryList.value = response.data as any[]
      })
  }

  const saveCategory = (values: any) => new Promise((resolve, reject) => {
    {
      $fetch<APIResponse<Category>>('/api/category', {
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

  return { fetchCategory, saveCategory, categoryList }
})
