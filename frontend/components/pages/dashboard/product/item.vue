<script lang="ts" setup>
    import type { Product } from '~/himalayan_beads'
    import { showImage } from '~/lib/filters';

    interface ProductItemProps {
        product: Product
    }

    const props = defineProps<ProductItemProps>()

    const featuredImage = computed(() => props.product.images.length > 0
        ? showImage(props.product.images.find(image => image.featured)?.image.name as string)
        : '')
</script>

<template>
    <div class="flex gap-2">
        <figure class="w-[100px] rounded-sm overflow-hidden" v-if="featuredImage">
            <img :src="featuredImage" :alt="product.name">
        </figure>
        <div class="grow">
            <em class="not-italic block text-gray-400">{{ product.id }}</em>
            <strong class="text-lg block">
                <NuxtLink :to="{
                    name: 'dashboard-products-id',
                    params: {
                        id: product.id
                    }
                }">{{ product.name }}</NuxtLink>
            </strong>
            <Badge>{{ product.category.name }}</Badge>
        </div>
    </div>
</template>