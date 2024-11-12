import { ImageOnProduct, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const id = event.context.params?.image_id
  const product_id = event.context.params?.id

  let response: APIResponse<ImageOnProduct> = {
    status: 'failed',
    message: ''
  }

  if (!id)
    response.message = 'You need to send ID of the image'

  const image: ImageOnProduct | null = await prisma.imageOnProduct.findFirst({ where: { id } })

  if (!image)
    response.message = "That image doesnot exits"
  else {
    await prisma.imageOnProduct.updateMany({
      where: {
        product_id: product_id,
        featured: true
      },
      data: {
        featured: false
      }
    })

    await prisma.imageOnProduct.update({
      where: { id },
      data: {
        featured: true
      }
    })
    
    response = {
      status: 'success',
      data: image
    }
  }

  return response
})
