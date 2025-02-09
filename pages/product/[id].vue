<script lang="ts" setup>
  import { useCart } from '~/store/cart'

  const route = useRoute()
  const product: any = await $fetch(`/api/product/${route.params.productId}`, {
    method: 'GET'
  })

  useHead({
    title: product?.data?.name + ' - Product :: Himalayan Beads'
  })

  definePageMeta({
    path: '/product/:productId'
  })

  const sliderRef = ref(null)
  useSwiper(sliderRef)
  const { addToCart, isInCart } = useCart()

  const currentPrice = computed(() => {
    let price

    if (product?.data?.prices.length > 0) {
      const pricedProduct = product?.data?.prices[product?.data?.prices.length - 1]
      price = pricedProduct.price.amount
    }
    return price
  })

</script>

<template>
  <main id="main">
    <div class="container">
      <div class="product__section">
        <div class="container container--lg">
          <header class="product__section__header">
            <h1>{{ product?.data?.name }}</h1>
          </header>
          <div class="product__body">
            <figure class="product__image">
              <ClientOnly>
                <swiper-container ref="sliderRef">
                  <swiper-slide v-for="(image, index) in product?.data?.images" :key="index">
                    <img :src="image.images.url" :alt="product?.data?.name">
                  </swiper-slide>
                </swiper-container>
              </ClientOnly>
            </figure>
            <div class="product__description">
              <em class="product__category">{{ product?.data?.category.name }}</em>
              <div class="text__holder" v-html="product?.data?.description" />
              <template v-if="currentPrice">
                <em class="product__price">$ {{ currentPrice }}</em>
                <div class="product__item__action">
                  <a class="btn btn__primary" href="#" @click.prevent="addToCart(product?.data)"
                    v-if="!isInCart(product?.data?.id)">
                    <span class="icon-add"></span>
                    Add to cart
                  </a>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>