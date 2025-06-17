<script lang="ts" setup>
const route = useRoute()
useHead({
    title: 'Category :: ' + route.query.slug
})
</script>

<template>
</template>