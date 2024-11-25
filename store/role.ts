// import { Prisma } from '@prisma/client'
import { defineStore } from 'pinia'

/* const roleWithProduct = Prisma.validator<Prisma.RoleDefaultArgs>()({
    include: {
        permissions: true
    }
})
export type RoleWithProduct = Prisma.RoleGetPayload<typeof roleWithProduct> */

export const useRoleStore = defineStore('role', () => {
    const roleList = ref<any[]>([])

    const fetchRoles = async () => {
        const roles: any = await $fetch('/api/role', {
            method: 'GET'
        })

        roleList.value = roles.data
    }

    return { roleList, fetchRoles }
})