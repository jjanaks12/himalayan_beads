<script lang="ts" setup>
    import { useOrderStore } from '~/store/orderStore'

    import OrderListing from '@/components/pages/dashboard/order/listing.vue'

    useHead({
        title: 'My orders'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        authorization: ['view_order']
    })

    const { fetchUsers } = useOrderStore()

    onMounted(() => {
        fetchUsers()
    })
</script>

<template>
    <OrderListing @update="fetchUsers()" />
</template>