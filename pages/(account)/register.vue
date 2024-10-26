<script setup lang="ts">
  definePageMeta({
    layout: 'simple',
    middleware: 'auth',
    auth: {
      unauthenticatedOnly: true,
      navigateAuthenticatedTo: '/dashboard'
    }
  })
</script>

<template>
  <div>
    <h1>register</h1>
    <NuxtLink to="/login">Login</NuxtLink>
  </div>
</template>