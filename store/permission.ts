import type { Permission } from '@prisma/client'
import { defineStore } from 'pinia'

export const usePermissionStore = defineStore('permission', () => {
    const permissionList = ref<Permission[]>([])

    const fetchUser = () => {
        $fetch('/api/permission', {
            method: 'GET'
        })
            .then((response: any) => {
                if (response.status == 'success')
                    permissionList.value = response.data
            })
    }

    return { permissionList, fetchUser }
})