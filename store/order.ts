import type { Order } from '@prisma/client'
import { defineStore } from 'pinia'
import type { OrderWithShippingAddress } from '~/himalayan_beads'

export const useOrderStore = defineStore('order', () => {
  const list = ref<OrderWithShippingAddress[]>([])

  const fetch = async () => {
    const orders = await $fetch<OrderWithShippingAddress[]>('/api/order')
    list.value = orders
  }

  return { list, fetch }
})
