<script setup lang="ts">
    import type { FullProduct } from '~/store/product'
    import Copy from '~/components/copy.vue'

    interface ProductItemProps {
        product: FullProduct
    }
    const props = defineProps<ProductItemProps>()

    const featuredProduct = computed(() => {
        let image = ''

        if (props.product?.images.length > 0) {
            const featuredImage = props.product?.images.find(image => image.featured)
            if (featuredImage)
                image = featuredImage?.images?.url as string
        }

        return image
    })
</script>

<template>
    <div class="wrap">
        <figure class="image" v-if="featuredProduct">
            <img :src="featuredProduct" :alt="(product.name as string)">
        </figure>
        <div class="holder">
            <Copy class="id" :copy-text="product.id">{{ product.id }}</Copy>
            <NuxtLink :to="'/dashboard/product/' + product.id" class="title">{{ product.name }}</NuxtLink>
            <em class="subtitle">{{ product.category?.name }}</em>
        </div>
    </div>
</template>