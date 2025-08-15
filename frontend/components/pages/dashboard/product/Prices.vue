<script lang="ts" setup>
    import { TrashIcon } from 'lucide-vue-next'

    import type { Price } from '~/himalayan_beads'
    import { useProductStore } from '~/store/product'

    import PriceForm from '@/components/pages/dashboard/product/priceForm.vue'

    interface ProductPriceProps {
        priceList: Price[]
        productId: string
    }

    defineProps<ProductPriceProps>()
    const emit = defineEmits(['update'])
    const { deletePrice } = useProductStore()

    const isDialogOpen = ref(false)
    const editPrice = ref<Price | null>(null)
</script>

<template>
    <div class="mb-8 border-b border-dashed pb-8">
        <div class="flex items-center mb-3">
            <h2 class="text-lg grow">Prices</h2>
            <Button variant="secondary" @click="() => {
                isDialogOpen = true
                if (priceList.length > 0)
                    editPrice = priceList[priceList.length - 1]
            }" permissions="update_product">
                {{ priceList.length == 0 ? 'Add price' : 'update price' }}
            </Button>
        </div>
        <ul class="flex flex-col gap-1">
            <li v-for="(price, index) of priceList" class="flex justify-between">
                <em :class="{
                    'not-italic': true,
                    'line-through': index !== priceList.length - 1
                }">{{ price.amount }}</em>
                <Button size="sm" variant="destructive" @click="async () => {
                    await deletePrice(price.id)
                    emit('update')
                }" permissions="update_product">
                    <TrashIcon />
                    Delete
                </Button>
            </li>
        </ul>
    </div>
    <Dialog :open="isDialogOpen" @update:open="() => {
        isDialogOpen = false
    }">
        <DialogContent class="bg-white">
            <DialogHeader>
                <DialogTitle>Add price</DialogTitle>
            </DialogHeader>
            <PriceForm :price="editPrice" :product-id="productId" @update="() => {
                emit('update')
                isDialogOpen = false
            }" />
        </DialogContent>
    </Dialog>
</template>