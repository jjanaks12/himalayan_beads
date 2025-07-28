<script lang="ts" setup>
    import { useCartStore } from '~/store/cartStore'

    import CartItem from '@/layouts/default/_cart/item.vue'
    import { BaggageClaimIcon } from 'lucide-vue-next'

    useHead({
        title: 'Cart summary'
    })

    definePageMeta({
        layout: 'admin',
        auth: true,
        authorization: '*',
        role: 'User'
    })

    const { cartItems, total, tax, discount, grandtotal } = storeToRefs(useCartStore())
</script>

<template>
    <section class="pb-4 md:pb-14">
        <!-- <header class="bg-secondary text-white text-center py-4 md:py-14">
            <h1 class="text-4xl">Cart summary</h1>
            <em class="not-italic">Review your selected items below before proceeding to secure checkout.</em>
        </header> -->
        <div class="container pt-4 md:pt-14">
            <div class="flex" v-if="cartItems.length > 0">
                <div class="w-2/3">
                    <div class="mb-16">
                        <h2 class="text-2xl">On your cart</h2>
                        <p>Check your cart items carefully before continuing to payment or checkout.</p>
                    </div>
                    <CartItem v-for="cartItem of cartItems" :item="cartItem" />
                </div>
                <div class="w-1/3 px-4 border-l">
                    <ul role="list" class="divide-y divide-gray-100">
                        <li class="flex justify-between gap-x-6 py-5">
                            <div class="flex min-w-0 gap-x-4">
                                <div class="min-w-0 flex-auto">
                                    <p class="text-sm/6 font-semibold text-gray-900">Total</p>
                                </div>
                            </div>
                            <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p class="text-sm/6 text-gray-900">${{ total }}</p>
                            </div>
                        </li>
                        <li class="flex justify-between gap-x-6 py-5">
                            <div class="flex min-w-0 gap-x-4">
                                <div class="min-w-0 flex-auto">
                                    <p class="text-sm/6 font-semibold text-gray-900">Tax</p>
                                    <p class="mt-1 text-xs/5 text-gray-500">13% of total</p>
                                </div>
                            </div>
                            <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p class="text-sm/6 text-gray-900">${{ tax }}</p>
                            </div>
                        </li>
                        <li class="flex justify-between gap-x-6 py-5">
                            <div class="flex min-w-0 gap-x-4">
                                <div class="min-w-0 flex-auto">
                                    <p class="text-sm/6 font-semibold text-gray-900">Discount</p>
                                </div>
                            </div>
                            <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p class="text-sm/6 text-gray-900">-${{ discount }}</p>
                            </div>
                        </li>
                        <li class="flex justify-between gap-x-6 py-5">
                            <div class="flex min-w-0 gap-x-4">
                                <div class="min-w-0 flex-auto">
                                    <p class="text-sm/6 font-semibold text-gray-900">Grandtotal</p>
                                </div>
                            </div>
                            <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p class="text-sm/6 text-gray-900">${{ grandtotal }}</p>
                            </div>
                        </li>
                    </ul>
                    <div class="text-right">
                        <Button variant="secondary" as-child role="User">
                            <NuxtLink to="/dashboard/checkout">
                                <BaggageClaimIcon />
                                Procced to checkout
                            </NuxtLink>
                        </Button>
                    </div>
                </div>
            </div>
            <Alert variant="warn" v-else>
                <TriangleAlertIcon />
                <AlertTitle>No items in the cart.</AlertTitle>
                <AlertDescription>
                    <span>
                        Please go back to <Button variant="link" size="link" as-child>
                            <NuxtLink to="/products">products</NuxtLink>
                        </Button> and fill cart before checkout.
                    </span>
                </AlertDescription>
            </Alert>
        </div>
    </section>
</template>