<script lang="ts" setup>
  import { useCartStore } from '~/store/cart'
  import CheckoutForm from './_components/CheckoutForm.vue'
  import CartItem from '~/layouts/default/_partials/cart/cartItem.vue'

  useHead({
    title: 'Checkout your order'
  })

  const { list } = storeToRefs(useCartStore())
</script>

<template>
  <section class="checkout__section">
    <div class="container">
      <div class="row" v-if="list.length > 0">
        <div class="col-5">
          <aside class="checkout__sidebar">
            <h2>Product summary</h2>
            <div class="product__item__list product__item__list--list">
              <CartItem :cart-item="cartItem" :index="index" v-for="(cartItem, index) in list" />
            </div>
          </aside>
        </div>
        <div class="col-7">
          <div class="checkout__content">
            <h2>Checkout details</h2>
            <CheckoutForm />
          </div>
        </div>
      </div>
      <div class="checkout__empty text--center" v-else>
        <h1>Your cart is empty</h1>
        <p>Check <NuxtLink :to="{ name: 'product' }">these products</NuxtLink>, you may find what you are looking for</p>
      </div>
    </div>
  </section>
</template>
