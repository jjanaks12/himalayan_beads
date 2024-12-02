<script setup lang="ts">
    interface ProductItemProps {
        product: any
    }

    const props = defineProps<ProductItemProps>()

    const featuredProduct = computed(() => {
        let image = ''

        if (props.product?.images.length > 0) {
            const featuredImage = props.product?.images.find((image: any) => image.featured)
            if (featuredImage)
                image = featuredImage?.images?.url as string
        }

        return image
    })

    const currentPrice = computed(() => {
        let price

        if (props.product?.prices.length > 0) {
            const pricedProduct = props.product?.prices[props.product?.prices.length - 1]
            price = pricedProduct.price.amount
        }
        return price
    })
</script>

<template>
    <div class="product__item">
        <figure class="product__item__image">
            <img :src="featuredProduct" :alt="product.name">
        </figure>
        <div class="product__item__detail">
            <h3 class="h6">
                <NuxtLink :to="'/product/' + product.id">{{ product.name }}</NuxtLink>
            </h3>
            <em class="product__category">{{ product.category.name }}</em>
            <em class="product__price" v-if="currentPrice">$ {{ currentPrice }}</em>
        </div>
        <div class="product__item__action">
            <a class="btn btn--xs btn__primary btn--outline" href="#">
                <span class="icon-add"></span>
                Add to cart
            </a>
        </div>
    </div>
</template>