<script lang="ts" setup>
    import type { Product } from '@prisma/client'

    import { useProductStore } from '@/store/product'
    import { formatDate } from '~/lib/filter'
    import ProductItem from './_component/Item.vue'

    import ProductForm from '@/components/product/form.vue'
    import Alert from '~/components/Alert.vue'
    import Modal from '~/components/Modal.vue'
    import Pagination from '~/components/Pagination.vue'

    useHead({
        title: 'Products :: Himalayan Beads'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth'
    })

    const { fetchProduct, nextPage, prevPage, gotoPage } = useProductStore()
    const { productList, isLoading, param, query } = storeToRefs(useProductStore())

    const isDeleting = ref(false)
    const showForm = ref(false)
    const editProduct = ref<null | Product>(null)
    const deletingProduct = ref<null | Product>(null)

    const showDeleteAlert = computed(() => deletingProduct.value != null)

    const deleteProduct = async () => {
        isDeleting.value = true

        await $fetch(`/api/category/${deletingProduct.value?.id}/`, {
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
</script>

<template>
    <section class="datatable__section">
        <header class="datatable__header">
            <div class="datatable__header__holder">
                <h1>Product</h1>
            </div>
            <div class="datatable__header__action">
                <form action="#" class="search__form">
                    <div class="form__group">
                        <label for="sf__search">Search product</label>
                        <input type="search" name="s" id="sf__search" v-model="query.s"
                            placeholder="Search text here...">
                    </div>
                    <button type="submit">
                        <MdiIcon icon="mdiMagnify" size="24" />
                    </button>
                </form>
                <a class="btn btn__primary btn--icon" href="#" @click.prevent="fetchProduct" :disabled="isLoading">
                    <MdiIcon icon="mdiReload" size="16" />
                </a>
                <a class="btn btn__primary" href="#" @click.prevent="showForm = true">
                    <span class="prepend-icon icon-add"></span>
                    Add Product
                </a>
            </div>
        </header>
        <div class="datatable__filter">
            <form action="#" class="search__form"></form>
        </div>
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
                    <template v-if="!isLoading">
                        <tr v-for="(product, index) in productList" :key="product.id">
                            <td class="sn">{{ index + 1 }}</td>
                            <td>
                                <product-item :product="product" />
                            </td>
                            <td class="text--center">{{ formatDate(product.createdAt) }}</td>
                            <td class="text--right">
                                <a class="btn btn--xs btn__info" href="#" @click.prevent="editProduct = product">
                                    <MdiIcon icon="mdiPencil" size="16" />
                                    Edit
                                </a>
                                <a class="btn btn--xs btn__danger" href="#" @click.prevent="deletingProduct = product">
                                    <MdiIcon icon="mdiDelete" size="16" />
                                    Delete
                                </a>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <DatatableLoading :column="4" :row="3" />
                    </template>
                </tbody>
            </table>
        </div>
        <footer class="datatable__footer">
            <Pagination :current="query.current" :total="10" :onNext="nextPage" :onPrev="prevPage" :onGoto="gotoPage" />
        </footer>
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