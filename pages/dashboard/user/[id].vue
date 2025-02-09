<script lang="ts" setup>
    definePageMeta({
        layout: 'admin',
        middleware: ['auth', 'authorization'],
        permission: 'view_user'
    })
</script>
<template>
    user detail
</template>