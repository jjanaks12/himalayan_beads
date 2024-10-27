import { Prisma, type User } from '@prisma/client'
import { defineStore } from 'pinia'

const fullUser = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    image: true,
    role: true
  }
})
export type FullUser = Prisma.UserGetPayload<typeof fullUser>
export const useUserStore = defineStore('user', () => {
  const userList = ref<FullUser[]>([])

  const fetchUser = () => new Promise(async (resolve, reject) => {
    $fetch('/api/user', {
      method: 'GET'
    })
      .then((response: any) => {
        if (response.status == 'success')
          userList.value = response.data
      })
  })

  return { userList, fetchUser }
})
