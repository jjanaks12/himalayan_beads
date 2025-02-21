<script lang="ts" setup>
  import { formatDate } from '~/lib/filter'
  import { useOrderStore } from '~/store/order'

  definePageMeta({
    layout: 'admin'
  })

  useHead({
    title: 'My Order :: Himalayan Beads'
  })

  const { list } = storeToRefs(useOrderStore())
  const { fetch } = useOrderStore()

  onMounted(async () => {
    await fetch()
  })
</script>

<template>
  <section class="datatable__section">
    <header class="datatable__header">
      <div class="datatable__header__holder">
        <h1>Order</h1>
      </div>
      <div class="datatable__header__action">
      </div>
    </header>
    <div class="datatable__body">
      <table>
        <thead>
          <tr>
            <th></th>
            <th class="text--left">Order</th>
            <th>Ordered at</th>
            <th class="text--right">Status</th>
            <!-- <th class="text--right">Action</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in list">
            <td>{{ index + 1 }}</td>
            <td>
              <address>
                <strong>{{ order.shippingAddress.address }}</strong>
                <em class="d-block">
                  {{ order.shippingAddress.street }},
                  {{ order.shippingAddress.city }},
                  {{ order.shippingAddress.zipCode }},
                  {{ order.shippingAddress.country.name }}
                </em>
              </address>
            </td>
            <td>{{ formatDate(order.createdAt) }}</td>
            <td class="text--right">
              <span class="badge badge--info">{{ order.status }}</span>
            </td>
            <!-- <td class="text--right">
              <Button color="danger" permission="delete_order">Cancel</Button>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
