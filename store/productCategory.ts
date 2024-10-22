import { Prisma, type Category } from '@prisma/client'
import { defineStore } from 'pinia'

const categoryWithPredecessor = Prisma.validator<Prisma.CategoryDefaultArgs>()({
  include: { predecessor: true }
})
type CategoryWithPredecessor = Prisma.CategoryGetPayload<typeof categoryWithPredecessor>

export const useProductCategoryStore = defineStore('product_category', () => {
  const categoryList = ref<CategoryWithPredecessor[]>([])

  const fetchCategory = async () => {
    $fetch<APIResponse<CategoryWithPredecessor[]>>('/api/category')
      .then(response => {
        if (response.status == 'success')
          categoryList.value = response.data
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
