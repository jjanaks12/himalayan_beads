import { Category, PrismaClient } from "@prisma/client"
import { APIResponse } from "~/himalayan_beads"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  let response: APIResponse<Category[] | string> = {
    status: 'success',
    data: []
  }

  await prisma.category.findMany({
    where: {
      deletedAt: null,
      parent_id: null
    },
    include: {
      predecessor: true,
      image: true,
      _count: true
    }
  })
    .then((data) => {
      response = {
        status: 'success',
        data
      }
    })
    .catch(() => {
      response = {
        status: 'failed',
        message: 'Something wrong with the database'
      }
    })

  return response
})

