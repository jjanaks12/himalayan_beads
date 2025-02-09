<script setup lang="ts">
    import { useCart } from '~/store/cart'
    import CartItem from './cartItem.vue'

    const { list, isLoading } = storeToRefs(useCart())
    const { checkout } = useCart()

    const hasItemInCart = computed(() => list.value.length > 0)
</script>

<template>
    <Dropdown class="cart cart--notification">
        <template v-slot:opener="{ clickHandler }">
            <a href="#" class="dropdown__opener" @click.prevent="clickHandler" v-if="hasItemInCart">
                <span class="icon-cart"></span>
            </a>
        </template>
        <div class="product__item__list product__item__list--list">
            <CartItem :cart-item="cartItem" :index="index" v-for="(cartItem, index) in list" />
        </div>
        <div class="cart__action" v-if="hasItemInCart">
            <a href="#" :class="{ 'btn btn__danger': true, 'loading': isLoading }" @click.prevent="checkout">
                Checkout
            </a>
        </div>
    </Dropdown>
</template>