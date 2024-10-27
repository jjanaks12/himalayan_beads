import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  let res = {}

  await prisma.user.findMany({
    omit: {
      password: true
    },
    include: {
      image: true,
      role: true
    }
  })
    .then((users: any) => {
      res = {
        status: 'success',
        data: users
      }
    })

  return res
})
