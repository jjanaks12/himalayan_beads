import { Prisma, type Product } from '@prisma/client'
import { defineStore } from 'pinia'
import { debounce } from '~/lib/helper/debounce'

const fullProduct = Prisma.validator<Prisma.ProductDefaultArgs>()({
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
export type ProductWithImage = Prisma.ImageOnProductGetPayload<typeof productWithImage>

export const useProductStore = defineStore('product', () => {
  const isLoading = ref(false)
  const param = ref<APIParam<any>>()
  const query = ref<APIQuery>({
    per_page: 15,
    current: 1,
    s: ''
  })

  const fetchProduct = async () => {
    isLoading.value = true
    const productResponse = await $fetch<APIResponse<APIParam<any>>>('/api/product', { query: query.value })

    if (productResponse.status == 'success') {
      param.value = productResponse.data
    }

    isLoading.value = false
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

  const nextPage = () => {
    const current = Math.min(param.value?.total_page as number, query.value.current + 1)

    if (current != param.value?.current)
      query.value = { ...query.value, current }
  }

  const prevPage = () => {
    const current = Math.max(0, query.value.current + 1)

    if (current != param.value?.current)
      query.value = { ...query.value, current }
  }

  const gotoPage = (page_no: number) => {
    const newPage = Math.min(param.value?.total_page || 0, Math.max(0, page_no))

    if (query.value.current != newPage)
      query.value = { ...query.value, current: newPage }
  }

  const productList = computed(() => param.value?.data)

  watch(query, () => {
    debounce(() => {
      fetchProduct()
    }, 500)
  }, {
    deep: true,
    immediate: true
  })

  return { fetchProduct, saveProduct, nextPage, prevPage, gotoPage, productList, isLoading, param, query }
})
