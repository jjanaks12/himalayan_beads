<script setup lang="ts">
    import type { Product } from '@prisma/client'
    import { debounce } from '~/lib/helper/debounce'

    interface ProductDescriptionProps {
        product: Product
    }

    const props = defineProps<ProductDescriptionProps>()
    const emit = defineEmits(['update'])
    const route = useRoute()

    const productDescription = ref('')
    const isLoading = ref(false)
    const isSaved = ref(false)

    watch(productDescription, async (newDescription) => {
        const hasChanged = newDescription !== props.product?.description

        if (hasChanged) {
            isLoading.value = true

            await $fetch(`/api/product/${route.params.id}/update_description`, {
                method: 'PUT',
                body: {
                    description: productDescription.value
                }
            })
                .then(() => {
                    emit('update')
                    isSaved.value = true
                })
                .finally(() => {
                    isLoading.value = false
                })
        }
    })

    watch(() => props.product, () => {
        if (props.product)
            productDescription.value = props.product.description || ''
    })

    watch(isSaved, () => {
        if (isSaved.value)
            debounce(() => { isSaved.value = false }, 2000)
    })

    onMounted(() => {
        if (props.product)
            productDescription.value = props.product.description || ''
    })
</script>

<template>
    <div class="content__block">
        <div class="content__block__title">
            <h2>Product description</h2>
            <span class="loading" v-if="isLoading"></span>
            <span class="text--success" v-if="isSaved">
                <MdiIcon icon="mdiContentSaveCheck" />
                saved
            </span>
        </div>
        <TiptapEditor v-model="productDescription" :disabled="isLoading" />
    </div>
</template>