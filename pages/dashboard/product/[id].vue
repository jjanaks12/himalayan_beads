<script lang="ts" setup>
  import type { FullProduct, ProductWithImage } from '~/store/product'
  import TiptapEditor from '~/components/TiptapEditor.vue'
  import ImageBlock from './_component/imageBlock.vue'

  useHead({
    title: 'Products :: Himalayan Beads'
  })

  definePageMeta({
    layout: 'admin',
    middleware: 'auth'
  })

  const route = useRoute()

  const product = ref<FullProduct>()
  const productDescription = ref('')

  onBeforeMount(() => {
    $fetch('/api/product/' + route.params.id)
      .then((data: any) => {
        if (data.status == 'success')
          product.value = data.data
      })
  })
</script>

<template>
  <section class="content__section">
    <header class="content__header">
      <div class="content__header__holder">
        <h1>{{ product?.name }}</h1>
      </div>
      <div class="content__header__action">
        <nuxt-link class="btn btn__primary" to="/dashboard/product">
          <MdiIcon icon="mdiReply" />
          Back
        </nuxt-link>
      </div>
    </header>
    <div class="content__body">
      <h2>Images</h2>
      <ImageBlock v-if="product" :id="product.id" :images="(product.images as ProductWithImage[])" />
      <h2>Rates</h2>
      <h2>Product description</h2>
      <TiptapEditor v-model="productDescription" />
    </div>
  </section>
</template>