<script lang="ts" setup>
    import { BaggageClaimIcon, ListTreeIcon, ShoppingBasketIcon } from 'lucide-vue-next'
    import { useCartStore } from '~/store/cartStore'
    import CartItem from './item.vue'

    const { totalCartItems, cartItems } = storeToRefs(useCartStore())

    const cartItemsCount = computed(() => totalCartItems.value)
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="relative">
                <ShoppingBasketIcon class="h-5 w-5" />
                <span v-if="cartItemsCount > 0"
                    class="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium text-[10px]">
                    {{ cartItemsCount > 9 ? "9+" : cartItemsCount }}
                </span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <span v-if="cartItems.length === 0" class="p-8 text-center text-gray-500 text-sm">Your cart is empty.</span>
            <div class="divide-y" v-else>
                <CartItem v-for="item in cartItems" :key="item.product.id" :item="item" />
            </div>
            <div class="p-3 border-t bg-gray-50 flex gap-2 empty:hidden" v-if="cartItems.length > 0">
                <Button as-child role="User">
                    <NuxtLink to="/dashboard/cart">
                        <ListTreeIcon />
                        Cart summary
                    </NuxtLink>
                </Button>
                <Button variant="secondary" as-child role="User">
                    <NuxtLink to="/dashboard/checkout">
                        <BaggageClaimIcon />
                        Checkout
                    </NuxtLink>
                </Button>
            </div>
        </DropdownMenuContent>
    </DropdownMenu>
</template>