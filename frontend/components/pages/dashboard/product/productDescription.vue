<script setup lang="ts">
    import { LoaderIcon, SaveIcon } from 'lucide-vue-next'

    import type { Product } from '~/himalayan_beads'
    import { debounce } from '~/lib/filters'
    import { useProductStore } from '~/store/product'

    interface ProductDescriptionProps {
        product: Product
    }

    const props = defineProps<ProductDescriptionProps>()
    const emit = defineEmits(['update'])
    const route = useRoute()
    const { saveDescription } = useProductStore()
    const { can } = useAuthorization()

    const productDescription = ref('')
    const isLoading = ref(false)
    const isSaved = ref(false)

    watch(productDescription, async (newDescription) => {
        const hasChanged = newDescription !== props.product?.description

        if (hasChanged) {
            isLoading.value = true
            await saveDescription(route.params.id as string, productDescription.value)
            emit('update')
            isLoading.value = false
            isSaved.value = true
        }
    })

    watch(() => props.product, () => {
        if (props.product)
            productDescription.value = props.product.description || ''
    })

    watch(isSaved, () => {
        if (isSaved.value)
            setTimeout(() => { isSaved.value = false }, 2000)
    })

    onMounted(() => {
        if (props.product)
            productDescription.value = props.product.description || ''
    })
</script>

<template>
    <div class="mb-2">
        <div class="flex">
            <h2 class="text-lg grow">Product description</h2>
            <div class="flex gap-1 text-sm items-center">
                <LoaderIcon class="loading" :size="16" v-if="isLoading" />
                <span class="text-green-700 flex gap-0.5 items-center" v-if="isSaved">
                    <SaveIcon :size="16" />
                    saved
                </span>
            </div>
        </div>
        <TiptapEditor v-model="productDescription" :disabled="isLoading || can('update_product')" />
    </div>
</template>