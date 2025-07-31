<script lang="ts" setup>
    import type { Order } from '~/himalayan_beads'
    import { orderStatus } from '~/lib/data'
    import { humanize, humanizeOrderAddress } from '~/lib/filters'

    interface OrderDetailProps {
        order: Order | null
    }

    const props = defineProps<OrderDetailProps>()

    const getQuantity = (id: string) => (props.order?.detail.find(cartItem => id == cartItem.product_id) || {}).quantity
    const getprice = (id: string) => {
        const priceId = (props.order?.detail.find(cartItem => id == cartItem.product_id) || {}).price_id
        const price = props.order?.prices.find(price => price.id == priceId)

        return price?.amount || 0
    }

    const total = computed(() => props.order?.detail
        .map(cartItem => cartItem.quantity * getprice(cartItem.product_id))
        .reduce((sum, amount) => sum + amount, 0)
    )
</script>

<template>
    <div class="max-h-full overflow-y-auto text-gray-400" v-if="order">
        <h3 class=" text-gray-600 font-medium mb-2">Ordered by</h3>
        <User :user="order?.user" v-if="order?.user" class="mb-8 px-3" />
        <h3 class=" text-gray-600 font-medium mb-2">Summary</h3>
        <ul class="flex flex-col gap-1 mb-8 px-3">
            <li class="flex justify-between text-xs uppercase text-gray-600">
                <strong class="font-normal">Product name</strong>
                <span class="">Quantity</span>
                <em class="not-italic">Rate</em>
            </li>
            <li v-for="product in order?.products" class="flex justify-between">
                <strong class="font-normal">{{ product.name }}</strong>
                <span>{{ getQuantity(product.id) }}</span>
                <em class="not-italic">${{ getprice(product.id) }}</em>
            </li>
            <li class="flex gap-2">
                <strong class="grow text-right font-normal text-gray-600">Total:</strong>
                <em class="not-italic">${{ total }}</em>
            </li>
        </ul>
        <h3 class=" text-gray-600 font-medium mb-2">Billing address</h3>
        <address class="not-italic mb-8 px-3">
            {{ humanizeOrderAddress(order.shippingAddress) }}
        </address>
        <h3 class=" text-gray-600 font-medium mb-2">Shipping address</h3>
        <address class="not-italic px-3 mb-8">
            {{ humanizeOrderAddress(order.shippingAddress) }}
        </address>
        <h3 class=" text-gray-600 font-medium mb-2">Status</h3>
        <div class="flex gap-2">
            <Badge variant="secondary">{{ humanize(order.type.toString()) }}</Badge>
            <Badge :variant="orderStatus[order.status]">
                {{ humanize(order.status.toString()) }}
            </Badge>
        </div>
    </div>
</template>