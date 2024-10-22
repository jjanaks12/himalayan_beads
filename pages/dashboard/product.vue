<script lang="ts" setup>
  import { useProductStore } from '@/store/product'

  useHead({
    title: 'Products :: Himalayan Beads'
  })

  definePageMeta({
    layout: 'admin'
  })

  const { fetchProduct } = useProductStore()

  onMounted(() => {
    fetchProduct()
  })
</script>

<template>
  
</template>