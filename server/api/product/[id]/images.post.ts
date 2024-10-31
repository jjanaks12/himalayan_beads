import { Image, PrismaClient, Product } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const { files, product_id } = await readBody<{ files: File[], product_id: string }>(event)

  const product: Product | null = await prisma.product.findFirst({
    where: { id: product_id }
  })

  if (product) {
    const images = await $fetch('/api/image', {
      method: "POST",
      body: { files }
    })

    await prisma.product.update({
      where: { id: product_id },
      data: {
        images: {
          connect: images.map((image: Image) => ({ id: image.id }))
        }
      }
    })

    return { status: "success", data: product }
  } else
    return product
})
