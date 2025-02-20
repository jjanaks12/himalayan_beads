import { Image, PrismaClient } from "@prisma/client"
import { type H3Event } from 'h3'

import authCheck from "~/lib/middleware/authCheck"

const prisma = new PrismaClient()
export default defineEventHandler({
  onRequest: [authCheck],
  handler: async (event: H3Event) => {
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
  }
})
