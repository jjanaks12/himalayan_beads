<script lang="ts" setup>
  import { showImage } from '~/lib/filters'
  import { useAppStore } from '~/store/app'
  import { useAuthStore } from '~/store/auth'

  const route = useRoute()
  const { isLoggedin } = storeToRefs(useAuthStore())
  const { company } = storeToRefs(useAppStore())

  const homeURL = computed(() => !isLoggedin.value
    ? 'index'
    : route.meta.layout == 'admin'
      ? 'dashboard'
      : 'index')
</script>

<template>
  <div class="logo w-[160px]">
    <nuxt-link :to="{ name: homeURL }">
      <img :src="showImage(company?.logo?.name as string)" :alt="company?.name" class="w-full h-auto">
    </nuxt-link>
  </div>
</template>
