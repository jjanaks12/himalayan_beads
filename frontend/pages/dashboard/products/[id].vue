<script lang="ts" setup>
    import { MoveLeftIcon } from 'lucide-vue-next'

    import type { Product } from '~/himalayan_beads'
    import { useProductStore } from '~/store/product'

    import ProductDescription from '~/components/pages/dashboard/product/productDescription.vue'
    import ProductImage from '@/components/pages/dashboard/product/imageBlock.vue'
    import Prices from '~/components/pages/dashboard/product/Prices.vue'

    useHead({
        title: 'Product'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        authorization: 'manage_product'
    })

    const route = useRoute()
    const { getProduct } = useProductStore()

    const product = ref<Product>()
    const isStockDialogOpen = ref(false)

    const fetchProductDetail = async () => {
        const p = await getProduct(route.params.id as string)

        product.value = p
    }

    onBeforeMount(() => {
        fetchProductDetail()
    })
</script>

<template>
    <div class="flex items-center gap-4 mb-20">
        <div class="flex-grow">
            <h1 class="text-2xl">{{ product?.name }}</h1>
        </div>
        <div class="flex gap-2 items-center">
            <Button @click="navigateTo({ name: 'dashboard-products' })">
                <MoveLeftIcon />
                Back
            </Button>
        </div>
    </div>
    <div class="flex flex-gap mb-8">
        <div class="w-2/3">
            <ProductImage :product-id="(product?.id as string)" :images="product?.images"
                @update="fetchProductDetail" />
            <Prices :price-list="product?.prices || []" :product-id="(product?.id as string)"
                @update="fetchProductDetail" />
        </div>
        <div class="w-1/3">
            <h2 class="text-lg">Stats</h2>
            <dl class="text-sm">
                <dt class="font-medium">Stock</dt>
                <dd class="mb-3">
                    <template v-if="product?.stock">
                        {{ product.stock.quantity }}
                    </template>
                    &nbsp;
                    <Button variant="link" size="sm" @click="isStockDialogOpen = true">
                        {{ product?.stock?.quantity && product.stock?.quantity > 0
                            ? 'Update stock'
                            : 'Add Stock' }}
                    </Button>
                </dd>
                <dt class="font-medium">Orders</dt>
                <dd class="mb-3 text-gray-300 text-sm">
                    {{ product?._count?.orders
                        ? product?._count?.orders
                        : 'no orders yet' }}
                </dd>
            </dl>
        </div>
    </div>
    <ProductDescription :product="product" v-if="product" @update="fetchProductDetail" />
    <Dialog :open="isStockDialogOpen" @update:open="isStockDialogOpen = false">
        <DialogContent class="bg-white">
            <DialogHeader>
                <DialogTitle>Add stock</DialogTitle>
            </DialogHeader>
            <PagesDashboardProductStockForm :product-id="(product?.id as string)" :stock="product?.stock" @update="() => {
                isStockDialogOpen = false
                fetchProductDetail()
            }" />
        </DialogContent>
    </Dialog>
</template>