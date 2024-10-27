<script lang="ts" setup>
  const { status } = useAuth()

  const route = useRoute()

  const homeURL = computed(() => status.value == 'unauthenticated'
    ? '/'
    : route.meta.layout == 'admin'
      ? '/dashboard'
      : '/')
</script>

<template>
  <div class="logo">
    <nuxt-link :to="homeURL">
      <img src="/images/logo.svg" alt="Himalayan Beads">
    </nuxt-link>
  </div>
</template>
