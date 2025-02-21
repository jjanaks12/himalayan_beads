<script setup lang="ts">
    import { useProduct } from '~/composables/product'
    import { useCartStore } from '~/store/cart'

    interface ProductItemProps {
        product: any
    }

    const props = defineProps<ProductItemProps>()
    const { featuredImage, currentPrice } = useProduct(props.product)
    const { addToCart, isInCart } = useCartStore()
</script>

<template>
    <div class="product__item">
        <figure class="product__item__image">
            <img :src="featuredImage" :alt="product.name">
        </figure>
        <div class="product__item__detail">
            <h3 class="h6">
                <NuxtLink :to="'/product/' + product.id">{{ product.name }}</NuxtLink>
            </h3>
            <em class="product__category">{{ product.category.name }}</em>
            <em class="product__price" v-if="currentPrice">$ {{ currentPrice }}</em>
        </div>
        <div class="product__item__action">
            <Button permission="create_order" v-if="!isInCart(product.id) && currentPrice"
                @click.prevent="addToCart(product)">
                <span class="icon-add"></span>
                Add to cart
            </Button>
        </div>
    </div>
</template>