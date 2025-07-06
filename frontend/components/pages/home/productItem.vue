<script lang="ts" setup>
    import { HeartIcon, PlusIcon } from 'lucide-vue-next'

    import type { Product } from '~/himalayan_beads'
    import { showImage } from '~/lib/filters'
    import { useCartStore } from '~/store/cartStore'

    interface ProductItemProps {
        product: Product
        index: number
        show: boolean
    }

    const props = defineProps<ProductItemProps>()
    const { toggleWishlist, isWishlisted, isCarted, addToCart } = useCartStore()

    const image = computed(() => props.product.images && props.product.images.length > 0
        ? showImage(props.product.images.find(image => image.featured)?.image.name as string)
        : '')
    const currentPrice = computed(() => props.product.prices && props.product.prices.length > 0
        ? props.product.prices[props.product.prices.length - 1].amount
        : 0)
    const oldPrice = computed(() => props.product.prices && props.product.prices.length > 0
        ? props.product.prices[Math.max(props.product.prices.length - 2, 0)].amount
        : 0)
</script>

<template>
    <div :class="{
        'product__card bg-white transition-all duration-500 ease-out group overflow-hidden border border-[#E5E9EA] relative': true,
        'opacity-100 translate-y-0': show,
        'opacity-0 translate-y-8': !show,
    }" :style="{ transitionDelay: `${index * 80}ms` }">
        <div class="product__image relative aspect-[4/3] flex items-center justify-center">
            <button @click.stop="toggleWishlist(product)"
                class="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center bg-transparent rounded-full transition-all duration-300"
                :class="{
                    'text-[#A0522D]': isWishlisted(product.id),
                    'text-[#B7B5B4] hover:text-[#A0522D]':
                        !isWishlisted(product.id),
                }">
                <HeartIcon class="w-4 h-4 transition-all duration-300 cursor-pointer"
                    :class="{ 'fill-current': isWishlisted(product.id) }" />
            </button>
            <img :src="image" :alt="product.name" v-if="image"
                class="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105" />
            <img src="/images/logo.svg" v-else />
        </div>

        <div class="product__info p-4 text-center">
            <h3
                class="product__name text-sm font-medium text-gray-800 mb-1 leading-tight min-h-[2.5rem] flex items-center justify-center">
                <NuxtLink :to="`/product/${product.id}`">{{ product.name }}</NuxtLink>
            </h3>
            <p v-if="product.category" class="product__subtitle text-xs text-gray-500 mb-3 min-h-[1rem]">
                {{ product.category.name }}
            </p>
            <div v-else class="mb-3 min-h-[1rem]"></div>

            <div class="product__action relative min-h-[2.5rem] flex items-center justify-center">
                <div
                    class="price__container absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:opacity-0 group-hover:scale-95">
                    <div v-if="oldPrice && currentPrice != oldPrice" class="flex items-center justify-center gap-2">
                        <span class="original__price text-sm text-[#100804] line-through">${{ oldPrice
                        }}</span>
                        <span class="current__price text-base font-semibold">${{ currentPrice }}</span>
                    </div>
                    <div v-else-if="currentPrice">
                        <span class="current__price text-base font-semibold">${{ currentPrice }}</span>
                    </div>
                </div>
                <div
                    class="add__to__cart__container absolute inset-0 flex items-center justify-center opacity-0 scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                    <!-- CORRECTED: This now passes a 'Product' object to a function expecting one. -->
                    <button v-if="!isCarted(product.id)" @click.stop="addToCart(product)"
                        class="add__to__cart__btn cursor-pointer bg-white border border-[#804224] text-[#804224] hover:text-[#FFF] hover:bg-[#804224] px-4 py-2 rounded text-xs font-medium transition-all duration-300 flex items-center gap-1 transform hover:scale-105">
                        <PlusIcon class="w-3 h-3" />
                        ADD TO CART
                    </button>
                    <!-- <NuxtLink v-else to="/cart" @click.stop
                        class="add__to__cart__btn cursor-pointer bg-[#804224] border border-[#804224] text-white px-4 py-2 rounded text-xs font-medium transition-all duration-300 flex items-center gap-1 transform hover:scale-105">
                        <CheckIcon class="w-3 h-3" />
                        VIEW CART
                    </NuxtLink> -->
                </div>
            </div>
        </div>
    </div>
</template>