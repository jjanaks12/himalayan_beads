import type { Role } from "~/himalayan_beads"
import { useAxios } from "~/services/axios"

export const useRoleStore = defineStore('role', () => {
    const { isLoading } = useModalMeta()
    const roles = ref<Role[]>()

    const { axios } = useAxios()

    const fetch = async () => {
        isLoading.value = true
        const { data } = await axios.get<Role[]>('/roles')

        roles.value = data
        isLoading.value = false
    }

    const save = async (formData: any) => {
        const method = formData.id ? 'put' : 'post'
        const url = formData.id ? `/roles/${formData.id}` : 'roles'
        isLoading.value = true

        await axios[method](url, formData)
        isLoading.value = false
    }

    return {
        roles,
        isLoading,
        fetch, save
    }
})