<script lang="ts" setup>
  const route = useRoute()
  const product: any = await $fetch(`/api/product/${route.params.productId}`, {
    method: 'GET'
  })

  useHead({
    title: product?.name
  })

  definePageMeta({
    path: '/product/:productId'
  })

</script>

<template>
  <main id="main">
    <div class="container">
      <pre>{{ product }}</pre>
      <img :src="image.images.url" alt="" v-for="image in product?.data?.images">
    </div>
  </main>
</template>
