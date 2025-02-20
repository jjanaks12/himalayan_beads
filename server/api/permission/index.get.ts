import { Permission, PrismaClient } from "@prisma/client"
import { APIResponse } from "~/himalayan_beads"
import authCheck from '~/lib/middleware/authCheck'

const prisma = new PrismaClient()
export default defineEventHandler({
  onRequest: [authCheck],
  handler: async () => {
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
  }
})
