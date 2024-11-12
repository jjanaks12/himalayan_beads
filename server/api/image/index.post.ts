import { Image, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const { files } = await readBody<{ files: File[] }>(event)
  const data: Image[] = []

  for (const file of files) {
    const name = await storeFileLocally(file, 8)
    await prisma.image.create({
      data: {
        name,
        url: '/uploads/' + name
      }
    })
      .then((image: Image) => {
        data.push(image)
      })
  }
  return data
})
