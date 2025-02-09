import { PrismaClient, Role } from "@prisma/client"
import { APIResponse } from "~/himalayan_beads"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  let res: APIResponse<Role[]> = {
    status: 'failed',
    message: ''
  }

  await prisma.role.findMany({
    include: {
      permissions: true
    }
  })
    .then((roles: any) => {
      res = {
        status: 'success',
        data: roles
      }
    })

  return res
})
