import type { Permission } from "~/himalayan_beads"
import { useAxios } from "~/services/axios"

export const usePermissionStore = defineStore('permission', () => {
    const { isLoading } = useModalMeta()
    const permissions = ref<Permission[]>()

    const { axios } = useAxios()

    const fetch = async () => {
        isLoading.value = true
        const { data } = await axios.get<Permission[]>('/permissions')

        permissions.value = data
        isLoading.value = false
    }

    const save = async (formData: any) => {
        const method = formData.id ? 'put' : 'post'
        const url = formData.id ? `/permissions/${formData.id}` : 'permissions'
        isLoading.value = true

        await axios[method](url, formData)
        isLoading.value = false
    }

    return {
        permissions,
        isLoading,
        fetch, save
    }
})