import { Category, PrismaClient } from "@prisma/client"
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
  delete data.files

  /* const file: UploadingFile = data?.files[0]

  if (file) {
    const filePath = path.join(process.cwd(), 'public', file.name)
    var base64Data = file.dataURL.replace(/^data:image\/png;base64,/, "");
    base64Data += base64Data.replace('+', ' ')
    const binaryData = new Buffer(base64Data, 'base64').toString('binary')

    fs.writeFile(filePath, binaryData, 'binary', () => { })

    response = {
      status: 'success',
      data: {
        createdAt: new Date(),
        description: '',
        name: '',
        deletedAt: new Date(),
        id: '',
        parent_id: '',
        updatedAt: new Date()
      }
    }
  } */
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
            parent_id
          }
        })
          .then((category) => {
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
        parent_id
      }
    })
      .then((category) => {
        response = {
          status: 'success',
          data: category
        }
      })
      .catch((e) => {
        console.log(e);
        
        response = {
          status: 'failed',
          message: 'Something wrong with the database'
        }
      })

  return response
})
