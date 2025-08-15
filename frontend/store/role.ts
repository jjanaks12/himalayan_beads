import * as Y from 'yup'

import type { Role } from "~/himalayan_beads"
import { assignRoleSchema } from '~/lib/schemas/role.schema'
import { useAxios } from "~/services/axios"
import { useAuthStore } from './auth'

export const useRoleStore = defineStore('role', () => {
    const { isLoading } = useModalMeta()
    const roles = ref<Role[]>([])

    const { axios } = useAxios()
    const { fetch: fetchProfile } = useAuthStore()

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
        fetch()
        fetchProfile()
    }

    const destory = async (id: string) => {
        await axios.delete(`/roles/${id}`)
    }

    const assignUserRole = async (formData: Y.InferType<typeof assignRoleSchema>) => {
        console.log(formData);

        await axios.put(`/users/assignRole/`, formData)
    }

    return {
        roles,
        isLoading,
        fetch, save, destory, assignUserRole
    }
})