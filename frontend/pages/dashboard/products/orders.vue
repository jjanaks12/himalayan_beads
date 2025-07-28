<script lang="ts" setup>
    useHead({
        title: 'Orders'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        authorization: ['update_order', 'view_order']
    })
</script>

<template>
orders
</template>