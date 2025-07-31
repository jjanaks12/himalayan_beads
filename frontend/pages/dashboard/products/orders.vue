<script lang="ts" setup>
    import { useOrderStore } from '~/store/orderStore'

    import OrderListing from '@/components/pages/dashboard/order/listing.vue'

    useHead({
        title: 'Orders'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        authorization: ['update_order', 'view_order']
    })

    const { fetch } = useOrderStore()

    onBeforeMount(() => {
        fetch()
    })
</script>

<template>
    <OrderListing @update="fetch()" />
</template>