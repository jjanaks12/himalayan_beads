import { Price, PrismaClient } from "@prisma/client"
import { APIResponse } from "~/himalayan_beads"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const product_id = event.context.params?.id

  let response: APIResponse<Price[]> = {
    status: 'failed',
    message: ''
  }

  const product: any = await prisma.product.findMany({
    where: {
      id: product_id
    },
    include: {
      prices: true
    }
  })

  response = {
    status: 'success',
    data: product.prices
  }

  return response
})
