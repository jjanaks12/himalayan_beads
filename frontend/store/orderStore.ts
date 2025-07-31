import type { APIQuery, APIRequest, Order, OrderStatus } from "~/himalayan_beads"
import { useAxios } from "~/services/axios"

export const useOrderStore = defineStore('order', () => {
    const orders = ref<Order[]>()
    const lastCallFunction = ref<Function | null>(null)
    const query = ref<APIQuery<Order>>({
        s: '',
        sort: {
            field: 'createdAt',
            order: 'asc'
        }
    })

    const { axios } = useAxios()

    const fetch = async () => {
        isLoading.value = true
        lastCallFunction.value = fetch

        const { data: { data, ...p } } = await axios.get<APIRequest<Order[]>>('/orders', { params: { ...params.value, ...query.value } })
        orders.value = data
        params.value = p

        isLoading.value = false
    }

    const fetchUsers = async () => {
        isLoading.value = true
        lastCallFunction.value = fetchUsers

        const { data: { data, ...p } } = await axios.get('/users/orders', { params: { ...params.value, ...query.value } })
        orders.value = data
        params.value = p

        isLoading.value = false
    }

    const updateStatus = async (status: OrderStatus, id: string) => {
        await axios.put(`/orders/${id}/status`, { status })

        if (lastCallFunction.value)
            lastCallFunction.value()
    }

    const deleteOrder = async (id: string) => {
        await axios.delete(`/orders/${id}`)
    }

    const { isLoading, params } = useModalMeta()

    return {
        orders, isLoading, params, query,
        fetch, fetchUsers, updateStatus, deleteOrder
    }
})