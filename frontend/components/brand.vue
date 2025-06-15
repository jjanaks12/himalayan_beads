<script lang="ts" setup>
  import { useAuthStore } from '~/store/auth'

  const route = useRoute()
  const { isLoggedin } = storeToRefs(useAuthStore())

  const homeURL = computed(() => !isLoggedin.value
    ? 'index'
    : route.meta.layout == 'admin'
      ? 'dashboard'
      : 'index')
</script>

<template>
  <div class="logo w-[160px]">
    <nuxt-link :to="{ name: homeURL }">
      <img src="/images/logo.svg" alt="Himalayan Beads" class="w-full h-auto">
    </nuxt-link>
  </div>
</template>
