<script lang="ts" setup>
    useHead({
        title: 'Dashboard'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        authorization: '*'
    })
</script>

<template>

</template>