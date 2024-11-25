import { Price, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const product_id = event.context.params?.id
  const data: any = await readBody(event)

  let response: APIResponse<Price> = {
    status: 'failed',
    message: ''
  }

  const price = await prisma.price.create({
    data: {
      amount: data.amount,
      parent_id: data.parent_id
    }
  })

  await prisma.priceOnProduct.create({
    data: {
      price_id: price?.id as string,
      product_id: product_id as string,
    }
  })

  response = {
    status: 'success',
    data: price
  }

  return response
})
