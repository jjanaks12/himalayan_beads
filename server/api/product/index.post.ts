import { PrismaClient, Product } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const data = await readBody(event)
  let response: APIResponse<Product> = {
    status: 'failed',
    message: ''
  }

  if (data.id) {
    const id = data.id
    delete data.id

    await prisma.product.findFirst({ where: { id } })
      .then(async () => {
        await prisma.product.update({
          where: { id },
          data: {
            ...data
          }
        })
          .then((product: Product) => {
            response = {
              status: 'success',
              data: product
            }
          })
          .catch(() => {
            response = {
              status: 'failed',
              message: `Cannot save ${data.name}`
            }
          })
      })
      .catch(() => {
        response = {
          status: 'failed',
          message: 'Cannot find the record'
        }
      })
  } else {
    await prisma.product.create({
      data
    })
      .then((product: Product) => {
        response = {
          status: 'success',
          data: product
        }
      })
      .catch(() => {
        response = {
          status: 'failed',
          message: 'Something wrong with the database'
        }
      })
  }

  return response
})
