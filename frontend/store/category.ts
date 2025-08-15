import * as Y from 'yup'

import type { Category } from "~/himalayan_beads"
import type { categoryCreateSchema } from '~/lib/schemas/product.schema'
import { useAxios } from "~/services/axios"

export const useCatgoryStore = defineStore('category', () => {
    const categories = ref<Category[]>([])
    const { isLoading } = useModalMeta()

    const { axios } = useAxios()

    const productCategories = computed(() => categories.value.filter(category => category.type == 'PRODUCT'))
    const blogCategories = computed(() => categories.value.filter(category => category.type == 'BLOG'))
    const categoryWithProduct = computed(() => productCategories.value.filter(category => category._count.products > 0))

    const fetch = async () => {
        isLoading.value = true

        const { data } = await axios.get('/categories')
        categories.value = data

        isLoading.value = false
    }

    const save = async (formData: Y.InferType<typeof categoryCreateSchema>) => {
        const method = formData.id ? 'put' : 'post'
        const url = formData.id ? `/categories/${formData.id}` : 'categories'
        isLoading.value = true

        await axios[method](url, formData)
        await fetch()
        isLoading.value = false
    }

    const getCategory = (id: string): Category => categories.value.find(c => c.id === id) as Category

    return {
        categories, isLoading,
        blogCategories, productCategories, categoryWithProduct,
        fetch, save, getCategory
    }
})