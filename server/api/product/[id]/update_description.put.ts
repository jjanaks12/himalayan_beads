import { PrismaClient, Product } from "@prisma/client"
import { APIResponse } from "~/himalayan_beads"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const data = await readBody(event)

  let response: APIResponse<Product> = {
    status: 'failed',
    message: ''
  }

  await prisma.product.update({
    where: { id },
    data: { description: data.description }
  })
    .then((product: Product) => {
      response = {
        status: 'success',
        data: product
      }
    })
  return response
})
