<script lang="ts" setup>
  // import type { FullProduct, ProductWithImage } from '~/store/product'

  import ImageBlock from './_component/imageBlock.vue'
  import ProductDescription from './_component/productDescription.vue'
  import Rate from './_component/rate/index.vue'

  useHead({
    title: 'Products :: Himalayan Beads'
  })

  definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'authorization'],
    permission: 'view_product'
  })

  const route = useRoute()

  const product = ref<any>()

  const fetchProductDetail = () => {
    $fetch('/api/product/' + route.params?.id)
      .then((data: any) => {
        if (data.status == 'success') {
          product.value = data.data
        }
      })
  }

  onBeforeMount(() => {
    fetchProductDetail()
  })
</script>

<template>
  <section class="content__section">
    <header class="content__header">
      <div class="content__header__holder">
        <h1>{{ product?.name }}</h1>
        <em>{{ product?.category?.name }}</em>
      </div>
      <div class="content__header__action">
        <nuxt-link class="btn btn__primary" to="/dashboard/product">
          <MdiIcon preserveAspectRatio="xMidYMid meet" icon="mdiReply" />
          Back
        </nuxt-link>
      </div>
    </header>
    <div class="content__body">
      <ImageBlock v-if="product" :id="product.id" :images="(product.images as any[])" @update="fetchProductDetail" />
      <Rate :prices="product?.prices" @update="fetchProductDetail" />
      <ProductDescription :product="product" v-if="product" @update="fetchProductDetail" />
    </div>
  </section>
</template>