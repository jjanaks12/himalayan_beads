<script lang="ts" setup>
    useHead({
        title: 'User'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth'
    })
</script>

<template>
    <h1>Hello world</h1>
</template>