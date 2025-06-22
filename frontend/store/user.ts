import type { APIParam, APIRequest, User } from "~/himalayan_beads"
import { isObjEq } from "~/lib/filters"
import { useAxios } from "~/services/axios"

export const useUserStore = defineStore('user', () => {
    const users = ref<User[]>()
    const { isLoading, params } = useModalMeta()
    
    const { axios } = useAxios()

    const fetch = async () => {
        isLoading.value = true
        const { data: { data, ...p } } = await axios.get<APIRequest<User[]>>('/users', {
            params: params.value
        })

        users.value = data
        params.value = p
        isLoading.value = false
    }

    const save = async (formData: any) => {
        const method = formData.id ? 'put' : 'post'
        const url = formData.id ? `/users/${formData.id}` : 'users'
        isLoading.value = true

        await axios[method](url, formData)
        isLoading.value = false
    }

    const getUser = async (id: string) => {
        const { data } = await axios.get<User>('/users/' + id)
        return data
    }

    watch(params, (oldValue, newValue) => {
        if (!isObjEq(oldValue, newValue))
            fetch()
    })

    return {
        users, isLoading, params,
        fetch, save, getUser
    }
})