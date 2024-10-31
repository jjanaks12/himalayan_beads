import { PrismaClient, Product } from "@prisma/client"

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
      prices: true,
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
