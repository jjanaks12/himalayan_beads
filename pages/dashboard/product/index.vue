<script lang="ts" setup>
    import type { Product } from '@prisma/client'

    import { useProductStore } from '@/store/product'
    import { formatDate } from '~/lib/filter'
    import ProductItem from './_component/Item.vue'

    import ProductForm from '@/components/product/form.vue'
    import Alert from '~/components/Alert.vue'

    useHead({
        title: 'Products :: Himalayan Beads'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth'
    })

    const { fetchProduct } = useProductStore()
    const { productList } = storeToRefs(useProductStore())

    const isDeleting = ref(false)
    const showForm = ref(false)
    const editProduct = ref<null | Product>(null)
    const deletingProduct = ref<null | Product>(null)

    const showDeleteAlert = computed(() => deletingProduct.value != null)

    const deleteProduct = () => {
        isDeleting.value = true

        $fetch(`/api/category/${deletingProduct.value?.id}/`, {
            method: 'DELETE'
        })
            .then(() => {
                deletingProduct.value = null
                fetchProduct()
            })
            .finally(() => {
                isDeleting.value = false
            })
    }

    watch(editProduct, () => {
        if (editProduct.value)
            showForm.value = true
        else
            showForm.value = false
    })
    onMounted(() => {
        fetchProduct()
    })
</script>

<template>
    <section class="datatable__section">
        <header class="datatable__header">
            <div class="datatable__header__holder">
                <h1>Product</h1>
            </div>
            <div class="datatable__header__action">
                <a class="btn btn__primary" href="#" @click.prevent="showForm = true">
                    <span class="prepend-icon icon-add"></span>
                    Add Product
                </a>
            </div>
        </header>
        <div class="datatable__body">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th class="text--left">Name</th>
                        <th>Created at</th>
                        <th class="text--right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in productList" :key="product.id">
                        <td class="sn">{{ index + 1 }}</td>
                        <td>
                            <product-item :product="product" />
                        </td>
                        <td class="text--center">{{ formatDate(product.createdAt) }}</td>
                        <td class="text--right">
                            <a class="btn btn--xs btn__info" href="#" @click.prevent="editProduct = product">
                                <span class="prepend-icon icon-edit"></span>
                                Edit
                            </a>
                            <a class="btn btn--xs btn__danger" href="#" @click.prevent="deletingProduct = product">
                                <span class="prepend-icon icon-trash"></span>
                                Delete
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Modal v-model:show="showForm" @modal:close="editProduct = null">
            <ProductForm :product="editProduct || null" @update-form="() => {
                showForm = false

                fetchProduct()
            }" />
        </Modal>
        <Alert title="Are you sure you want delete?" v-model:show="showDeleteAlert" v-model:loading="isDeleting"
            :onCancel="() => {
                deletingProduct = null
            }" :onConfirm="deleteProduct">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quo, explicabo necessitatibus
                laboriosam a
                voluptatem hic ratione eius excepturi doloremque quidem odit eaque blanditiis illo obcaecati. Dicta
                adipisci
                accusantium quidem.</p>
        </Alert>
    </section>
</template>