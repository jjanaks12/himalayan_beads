import { type H3Event } from 'h3'
import { Prisma, PrismaClient } from "@prisma/client"

import { APIResponse } from "~/himalayan_beads"

const prisma = new PrismaClient()
const userWithRoles = Prisma.validator<Prisma.UserDefaultArgs>()({
  omit: {
    password: false
  },
  include: {
    role: {
      include: {
        permissions: true
      }
    }
  }
})
export type UserWithRoles = Prisma.UserGetPayload<typeof userWithRoles>
export default defineEventHandler(async (event: H3Event) => {
  let response: APIResponse<UserWithRoles> = {
    status: 'failed',
    message: ''
  }
  const { email } = await readBody(event)

  const user: UserWithRoles | null = await prisma.user.findUnique({
    where: {
      email
    },
    include: {
      role: {
        include: {
          permissions: true
        }
      }
    }
  })

  if (user) {
    const { password, ...withoutPassword } = user

    response = {
      status: 'success',
      data: withoutPassword as UserWithRoles
    }
  }

  return response
})
