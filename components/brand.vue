<script lang="ts" setup>
  const { status } = useAuth()

  const route = useRoute()

  const homeURL = computed(() => status.value == 'unauthenticated'
    ? 'index'
    : route.meta.layout == 'admin'
      ? 'dashboard'
      : 'index')
</script>

<template>
  <div class="logo">
    <nuxt-link :to="{ name: homeURL }">
      <img src="/images/logo.svg" alt="Himalayan Beads">
    </nuxt-link>
  </div>
</template>
