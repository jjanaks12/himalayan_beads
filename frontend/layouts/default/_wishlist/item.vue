<script lang="ts" setup>
    import { XIcon } from 'lucide-vue-next'

    import type { Product } from '~/himalayan_beads'
    import { showImage } from '~/lib/filters'
    import { useCartStore } from '~/store/cartStore'

    interface WishlistItemProps {
        item: Product
    }

    const props = defineProps<WishlistItemProps>()

    const { removeFromWishlist } = useCartStore()
    const price = computed(() => props.item.prices && props.item.prices.length > 0
        ? props.item.prices[props.item.prices.length - 1].amount
        : 0)
    const image = computed(() => props.item.images && props.item.images.length > 0
        ? showImage(props.item.images.find(image => image.featured)?.image.name as string)
        : '')
</script>

<template>
    <div class="flex items-center gap-4 p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
        <figure :class="{ 'w-16 h-16 bg-gray-100 rounded overflow-hidden': true, 'p-1': !image }">
            <img :src="image" :alt="item.name" class="w-full h-full object-cover" v-if="image">
            <img src="/images/logo.svg" class="w-full h-full object-contain" v-else />
        </figure>
        <div class="flex-grow min-w-0">
            <p class="text-sm font-medium text-gray-800 line-clamp-2">{{ item.name }}</p>
            <p class="text-sm text-[#A0522D] font-semibold">${{ price }}</p>
        </div>
        <button @click.stop="removeFromWishlist(item.id)" title="Remove from wishlist"
            class="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors">
            <XIcon class="w-4 h-4" />
        </button>
    </div>
</template>