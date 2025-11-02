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
        authorization: ['update_product', 'view_product']
    })

    const route = useRoute()
    const { getProduct } = useProductStore()

    const product = ref<Product | null>(null)
    const isStockDialogOpen = ref(false)

    const fetchProductDetail = async () => {
        const p = await getProduct(route.params.id as string)
        product.value = p
    }

    onMounted(() => {
        fetchProductDetail()
    })
</script>

<template>
    <template v-if="product">
        <div class="flex items-center gap-4 mb-20">
            <div class="flex-grow">
                <h1 class="text-2xl">{{ product?.name }}</h1>
            </div>
            <div class="flex gap-2 items-center">
                <Button variant="secondary" @click="fetchProductDetail">refresh</Button>
                <Button @click="navigateTo({ name: 'dashboard-products' })">
                    <MoveLeftIcon />
                    Back
                </Button>
            </div>
        </div>
        <div class="flex flex-gap mb-8">
            <div class="w-2/3">
                <ProductImage :product-id="(product?.id as string)" :images="product?.images" @update="async () => {
                    await fetchProductDetail()
                    console.log('updated');
                }" />
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
                        <Button variant="link" size="sm" @click="isStockDialogOpen = true" permissions="update_product">
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
</template>