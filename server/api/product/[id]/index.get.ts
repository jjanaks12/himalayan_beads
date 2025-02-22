import { PrismaClient, Product } from "@prisma/client"
import { APIResponse } from "~/himalayan_beads"

const prisma = new PrismaClient()
export default defineEventHandler((event) => new Promise(async (resolve, reject) => {
  const id = event.context.params?.id
  let response: APIResponse<Product> = {
    status: 'failed',
    message: ''
  }

  await prisma.product.findFirst({
    where: { id },
    include: {
      prices: {
        include: {
          price: true
        }
      },
      images: {
        include: {
          images: true
        }
      },
      category: true,
      stock: true
    }
  })
    .then((product: Product | null) => {
      if (product)
        resolve({
          status: 'success',
          data: product
        })
      else
        reject({
          status: 'failed',
          message: 'Product could not be found'
        })
    })
  return reject(response)
}))
