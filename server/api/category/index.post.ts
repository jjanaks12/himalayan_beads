import { Category, Image, PrismaClient } from "@prisma/client"
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
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
    delete data.files
  }

  if (data.id) {
    const id = data.id
    delete data.id

    await prisma.category.findFirst({
      where: {
        id: data.id
      }
    })
      .then(async () => {
        await prisma.category.update({
          where: {
            id
          },
          data: {
            ...data,
            parent_id,
            image_id: imageList[0].id
          }
        })
          .then((category: Category) => {
            response = {
              status: 'success',
              data: category
            }
          })
          .catch(() => {
            response = {
              status: 'failed',
              message: `Cannot save ${data.name}`
            }
          })
      })
      .catch(() => {
        response = {
          status: 'failed',
          message: 'Cannot find the record'
        }
      })
  } else
    await prisma.category.create({
      data: {
        ...data,
        parent_id,
        image_id: imageList[0].id
      }
    })
      .then((category: Category) => {
        response = {
          status: 'success',
          data: category
        }
      })
      .catch(() => {
        response = {
          status: 'failed',
          message: 'Something wrong with the database'
        }
      })

  return response
})
