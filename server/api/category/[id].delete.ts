import { Category, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  let response: APIResponse<Category> = {
    status: 'failed',
    message: ''
  }

  await prisma.category.findFirst({
    where: { id }
  })
    .then(() => {
      prisma.category.update({
        where: { id },
        data: {
          deletedAt: new Date()
        }
      })
        .then((category) => {
          response = {
            status: 'success',
            data: category
          }
        })
    })
    .catch(() => {
      response = {
        status: 'failed',
        message: 'Cannot find the record'
      }
    })
  return event.context.params?.id
})
