import { Category, Image, PrismaClient } from "@prisma/client"
import { APIResponse } from "~/himalayan_beads"

import authCheck from "~/lib/middleware/authCheck"

const prisma = new PrismaClient()

export default defineEventHandler({
  onRequest: [authCheck],
  handler: async (event) => {
    try {
      const data = await readBody(event)
      let response: APIResponse<Category> = {
        status: 'failed',
        message: ''
      }

      const parent_id = data.parent_category || null
      delete data.parent_category

      // When there is images
      let imageList: Image[] = []

      if (data.files.length > 0) {
        imageList = await $fetch('/api/image', {
          method: "POST",
          body: { files: data.files }
        })
      }
      delete data.files

      if (data?.id) {
        const id = data.id
        delete data.id

        await prisma.category.findFirst({
          where: {
            id: data.id
          }
        })

        const category = await prisma.category.update({
          where: {
            id
          },
          data: {
            ...data,
            parent_id,
            image_id: imageList[0].id
          }
        })

        return category
      } else {
        const category = await prisma.category.create({
          data: {
            ...data,
            parent_id,
            image_id: imageList[0]?.id || null
          }
        })

        return category
      }
    } catch (e) {
      throw e
    }
  }
})
