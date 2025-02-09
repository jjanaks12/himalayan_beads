<script setup lang="ts">
    import { useProduct } from '~/composables/product'
    import type { CartItem } from '~/himalayan_beads'
    import { useCart } from '~/store/cart'

    interface CartItemProps {
        cartItem: CartItem
    }

    const props = defineProps<CartItemProps>()
    const { currentPrice, featuredImage } = useProduct(props.cartItem.product)

    const { removeFromCart } = useCart()
</script>

<template>
    <div class="product__item">
        <figure class="product__item__image">
            <img :src="featuredImage" alt="product image">
        </figure>
        <div class="product__item__detail">
            <h3 class="h6">
                <NuxtLink :to="'/product/' + cartItem.product.id">{{ cartItem.product.name }}</NuxtLink>
            </h3>
            <em class="product__category">{{ cartItem.product.category.name }}</em>
            <em class="product__price">$ {{ currentPrice }}</em>
        </div>
        <div class="product__item__action">
            <a class="btn btn__primary btn--outline btn--xs" href="#"
                @click.prevent="removeFromCart(cartItem.product.id)">
                <span class="icon-add"></span>
                remove
            </a>
        </div>
    </div>
</template>