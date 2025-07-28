<script lang="ts" setup>
    import { XIcon } from 'lucide-vue-next'

    import type { CartItem, Product } from '~/himalayan_beads'
    import { showImage } from '~/lib/filters'
    import { useCartStore } from '~/store/cartStore'

    interface CartItemProps {
        item: CartItem<Product>
    }

    const props = defineProps<CartItemProps>()
    const { decreaseCartItemQuantity, addToCart, removeFromCart } = useCartStore()

    const price = computed(() => props.item.product.prices && props.item.product.prices.length > 0
        ? props.item.product.prices[props.item.product.prices.length - 1].amount
        : 0)
    const image = computed(() => props.item.product.images && props.item.product.images.length > 0
        ? showImage(props.item.product.images.find(image => image.featured)?.image.name as string)
        : '')
</script>

<template>
    <div :key="item.product.id"
        class="flex items-start gap-4 p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
        <figure :class="{ 'w-16 h-16 bg-gray-100 rounded overflow-hidden': true, 'p-1': !image }">
            <img :src="image" :alt="item.product.name" class="w-full h-full object-cover" v-if="image">
            <img src="/images/logo.svg" class="w-full h-full object-contain" v-else />
        </figure>
        <div class="flex-grow min-w-0">
            <p class="text-sm font-medium text-gray-800 line-clamp-2">{{ item.product.name }}</p>
            <p class="text-sm text-gray-600 mt-1">${{ price }}</p>
            <div class="flex items-center gap-2 border border-gray-200 rounded w-fit mt-2">
                <button @click.stop="decreaseCartItemQuantity(item.product.id)"
                    class="px-2 py-0.5 text-lg hover:bg-gray-200">-</button>
                <span class="text-sm font-medium px-1">{{ item.quantity }}</span>
                <button @click.stop="addToCart(item.product)" class="px-2 py-0.5 text-lg hover:bg-gray-200">+</button>
            </div>
        </div>
        <div class="text-right">
            <p class="text-sm text-[#A0522D] font-semibold">${{ (price * item.quantity).toFixed(2) }}</p>
            <Button variant="ghost" size="icon" @click.stop="removeFromCart(item.product.id)" title="Remove from cart">
                <XIcon class="w-4 h-4" />
            </Button>
        </div>
    </div>
</template>