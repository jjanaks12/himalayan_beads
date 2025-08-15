<script lang="ts" setup>
    import { EllipsisVerticalIcon, EyeIcon, PencilIcon, PlusIcon, SlidersVerticalIcon, TrashIcon } from 'lucide-vue-next'

    import { useProductStore } from '~/store/product'

    import ProductForm from '@/components/pages/dashboard/product/form.vue'
    import ProductItem from '@/components/pages/dashboard/product/item.vue'

    useHead({
        title: 'Product'
    })

    definePageMeta({
        layout: 'admin',
        authorization: ['add_product', 'update_product', 'view_product', 'delete_product']
    })

    const { can } = useAuthorization()
    const { params, products, query } = storeToRefs(useProductStore())
    const { fetch, deleteProduct } = useProductStore()

    const isProductFormOpened = ref(false)
    const isProductDeleteOpened = ref(false)
    const productId = ref<string | null>(null)

    const close = () => {
        isProductFormOpened.value = false
        productId.value = null
    }

    onBeforeMount(() => {
        fetch()
    })
</script>

<template>
    <div class="flex items-center gap-4 mb-20">
        <div class="flex-grow">
            <div class="flex gap-2 mb-4">
                <SlidersVerticalIcon />
                Filters
            </div>
        </div>
        <div class="flex gap-2 items-center">
            <Search @update:search="(val) => { query = { ...query, s: val } }" />
            <Button @click="isProductFormOpened = true" permissions="create_product">
                <PlusIcon />
                Add product
            </Button>
        </div>
    </div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead class="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="product in products">
                <TableCell>
                    <ProductItem :product="product" />
                </TableCell>
                <TableCell class="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVerticalIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem v-if="can('update_product')" @click="() => {
                                productId = product.id
                                isProductFormOpened = true
                            }">
                                <PencilIcon />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem v-if="can('view_product')" @click="navigateTo({
                                name: 'dashboard-products-id',
                                params: {
                                    id: product.id
                                }
                            })">
                                <EyeIcon />
                                View
                            </DropdownMenuItem>
                            <DropdownMenuItem v-if="can('delete_product')" @click="() => {
                                isProductDeleteOpened = true
                                productId = product.id
                            }">
                                <TrashIcon />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <div class="flex items-center justify-end space-x-2 py-4">
        <div class="flex-1 text-sm text-muted-foreground">
            {{ params?.current }} of {{ params?.total_page }} pages
        </div>
        <div class="space-x-2">
            <Pagination v-slot="{ page }" :items-per-page="params.per_page" :total="params.total"
                :default-page="params.current" @update:page="(p) => { params = { ...params, current: p } }">
                <PaginationContent v-slot="{ items }">
                    <PaginationPrevious />
                    <template v-for="(item, index) in items" :key="index">
                        <PaginationItem v-if="item.type === 'page'" :value="item.value"
                            :is-active="item.value === page">
                            {{ item.value }}
                        </PaginationItem>
                    </template>
                    <PaginationEllipsis :index="4" />
                    <PaginationNext />
                </PaginationContent>
            </Pagination>
        </div>
    </div>
    <Dialog :open="isProductFormOpened" @update:open="state => {
        isProductFormOpened = state
        productId = null
    }">
        <DialogTrigger as-child>
        </DialogTrigger>
        <DialogContent class="bg-white">
            <DialogHeader>
                <DialogTitle>Add new product</DialogTitle>
                <DialogDescription>
                    Anyone who has this link will be able to view this.
                </DialogDescription>
            </DialogHeader>
            <ProductForm :id="productId" @update="close" />
        </DialogContent>
    </Dialog>
    <Dialog :open="isProductDeleteOpened" @update:open="state => {
        isProductDeleteOpened = state
        productId = null
    }">
        <DialogContent class="bg-white">
            <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                    Once deleted cannot be un done.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="destructive" @click="() => {
                    isProductDeleteOpened = false
                    productId = null
                }">Cancel</Button>
                <Button variant="secondary" @click="async () => {
                    await deleteProduct(productId as string)
                    isProductDeleteOpened = false
                    productId = null
                    fetch()
                }">Yes, delete it</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>