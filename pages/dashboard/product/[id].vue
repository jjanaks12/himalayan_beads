<script lang="ts" setup>
  import type { Product } from '@prisma/client'
  import TiptapEditor from '~/components/TiptapEditor.vue'

  useHead({
    title: 'Products :: Himalayan Beads'
  })

  definePageMeta({
    layout: 'admin'
  })

  const route = useRoute()

  const product = ref<Product>()
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
      <TiptapEditor v-model="productDescription" />
    </div>
  </section>
</template>