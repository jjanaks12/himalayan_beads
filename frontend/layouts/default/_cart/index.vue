<script lang="ts" setup>
    import { ShoppingBasketIcon, XIcon } from 'lucide-vue-next'
    import { useCartStore } from '~/store/cartStore'
    import CartItem from './item.vue'

    const isCartOpen = ref(false)

    const { totalCartItems, cartItems } = storeToRefs(useCartStore())

    const cartItemsCount = computed(() => totalCartItems.value)

    const toggleCartDropdown = () => {
        isCartOpen.value = !isCartOpen.value
    }

    const closeDropdowns = () => {
        isCartOpen.value = false
    }
</script>

<template>
    <div class="relative">
        <Button @click.stop="toggleCartDropdown" variant="ghost" size="icon"
            class="hover:bg-gray-100 transition-colors duration-200 h-9 w-9">
            <ShoppingBasketIcon class="h-5 w-5" />
        </Button>
        <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 scale-0"
            enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-0">
            <span v-if="cartItemsCount > 0"
                class="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium text-[10px]">
                {{ cartItemsCount > 9 ? "9+" : cartItemsCount }}
            </span>
        </Transition>

        <!-- Cart Dropdown Panel -->
        <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-2">
            <div v-if="isCartOpen"
                class="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col">
                <div class="p-4 border-b flex justify-between items-center">
                    <h3 class="font-semibold text-gray-800">My Cart</h3>
                    <button @click="closeDropdowns" class="text-gray-400 hover:text-gray-700">
                        <XIcon class="w-4 h-4" />
                    </button>
                </div>
                <div class="overflow-y-auto max-h-80">
                    <div v-if="cartItems.length === 0" class="p-8 text-center text-gray-500 text-sm">Your cart
                        is empty.</div>
                    <ul v-else>
                        <CartItem v-for="item in cartItems" :key="item.product.id" :item="item" />
                    </ul>
                </div>
                <div class="p-3 border-t bg-gray-50" v-if="cartItems.length > 0">
                    <NuxtLink to="/cart" @click="closeDropdowns"
                        class="block w-full text-center bg-[#804224] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded text-sm transition-colors">
                        Go to Checkout
                    </NuxtLink>
                </div>
            </div>
        </Transition>
    </div>
</template>