import * as Y from 'yup'

import type { APIQuery, APIRequest, Product } from "~/himalayan_beads"
import { debounce, isObjEq } from '~/lib/filters'
import type { productCreateSchema, productPriceSchema, productStockSchema } from "~/lib/schemas/product.schema"
import { useAxios } from "~/services/axios"

export const useProductStore = defineStore('product', () => {
    const products = ref<Product[]>([])
    const { isLoading, params } = useModalMeta()
    const query = ref<APIQuery<Product>>({
        s: '',
        sort: {
            field: 'createdAt',
            order: 'asc'
        }
    })

    const { axios } = useAxios()

    const fetch = () => {
        debounce(async () => {
            isLoading.value = true

            const { data } = await axios.get<APIRequest<Product[]>>('/products', { params: { ...params.value, ...query.value } })

            if (data) {
                const { data: d, ...p } = data
                products.value = d
                params.value = p
                isLoading.value = false
            }
        }, 500)
    }

    const save = async (formData: Y.InferType<typeof productCreateSchema>) => {
        const method = formData.id ? 'put' : 'post'
        const url = formData.id ? `/products/${formData.id}` : 'products'
        isLoading.value = true

        await axios[method](url, formData)
        await fetch()
        isLoading.value = false
    }

    const getProduct = async (id: string) => {
        let product = products.value.find(p => p.id === id)

        if (!product) {
            const { data } = await axios.get<Product>('/products/' + id)
            product = data
        }
        return product
    }

    const deleteProduct = async (id: string) => {
        await axios.delete(`/products/${id}`)
    }

    const saveDescription = async (id: string, description: string) => {
        await axios.put(`/products/${id}/update_description`, { description })
    }

    const saveImages = async (id: string, images: string[]) => {
        await axios.put(`/products/${id}/save_images`, { images })
    }

    const deleteImage = async (id: string) => {
        await axios.delete(`/products/${id}/delete_image`)
    }

    const setFeaturedImage = async (id: string, product_id: string) => {
        await axios.put(`/products/${product_id}/image/${id}/set_featured_image`)
    }

    const saveStock = async (formData: Y.InferType<typeof productStockSchema>, product_id: string, id: string | null = null) => {
        const method = id ? 'put' : 'post'
        const url = id ? `/products/${id}/update_stock` : `/products/${product_id}/add_stock`
        await axios[method](url, formData)
    }

    const savePrice = async (product_id: string, formData: Y.InferType<typeof productPriceSchema>) => {
        const method = formData.id ? 'put' : 'post'
        const url = formData.id ? `/products/${product_id}/price/${formData.id}/update_price` : `/products/${product_id}/add_price`
        await axios[method](url, formData)
    }

    const deletePrice = async (id: string) => {
        await axios.delete(`/products/${id}/delete_price`)
    }

    watch(params, (oldValue, newValue) => {
        if (!isObjEq(oldValue, newValue))
            fetch()
    })

    watch(query, (oldValue, newValue) => {
        if (!isObjEq(oldValue, newValue))
            fetch()
    }, {
        deep: true,
        immediate: true
    })

    return {
        products, isLoading, params, query,

        fetch, save, getProduct, saveDescription, deleteProduct,
        saveImages, deleteImage, setFeaturedImage,
        saveStock,
        savePrice, deletePrice
    }
})