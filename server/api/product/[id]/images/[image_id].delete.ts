import { Image, ImageOnProduct, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.image_id

  let response: APIResponse<ImageOnProduct> = {
    status: 'failed',
    message: ''
  }

  if (!id)
    response.message = 'You need to send ID of the image'

  const image: any | null = await prisma.imageOnProduct.findFirst({
    where: { id },
    include: {
      images: true
    }
  })

  if (!image)
    response.message = "That image doesnot exits"
  else {
    const res: any = await $fetch(`/api/image/${image.images.id}`, {
      method: 'DELETE'
    })

    if (res.status == 'failed')
      response.message = 'Could not delete image'
    else {
      await prisma.imageOnProduct.delete({
        where: { id }
      })

      response = {
        status: 'success',
        data: 'Deleted'
      }
    }
  }

  return response
})
