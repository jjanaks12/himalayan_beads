<script lang="ts" setup>
  import { useCart } from '~/store/cart'
  import CheckoutForm from './_components/CheckoutForm.vue'

  useHead({
    title: 'Checkout your order'
  })

  const { list } = storeToRefs(useCart())
</script>

<template>
  <section class="checkout__section">
    <div class="container">
      <div class="row">
        <div class="col-5">
          <aside class="checkout__sidebar">
            <h2>Product summary</h2>
            <pre>{{ list }}</pre>
          </aside>
        </div>
        <div class="col-7">
          <div class="checkout__content">
            <h2>Checkout details</h2>
            <CheckoutForm />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
