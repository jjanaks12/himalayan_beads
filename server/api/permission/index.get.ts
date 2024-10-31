import { Permission, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  let res: APIResponse<Permission[]> = {
    status: 'failed',
    message: ''
  }

  await prisma.permission.findMany()
    .then((pemissions: Permission[]) => {
      res = {
        status: 'success',
        data: pemissions
      }
    })

  return res
})
