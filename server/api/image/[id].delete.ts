import { Image, PrismaClient } from "@prisma/client"
import fs from "node:fs/promises"
import path from "node:path"

import { APIResponse } from "~/himalayan_beads"

const { storage } = useRuntimeConfig()
const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const id = event.context.params?.id

    let response: APIResponse<Image> = {
        status: 'failed',
        message: ''
    }

    if (!id)
        response.message = 'You need to send ID of the image'

    const image: Image | null = await prisma.image.findFirst({ where: { id } })

    if (!image)
        response.message = "That image doesnot exits"
    else {
        const deletePath = path.join(storage, image.name)
        await fs.unlink(deletePath)

        await prisma.image.delete({
            where: { id }
        })

        response = {
            status: 'success',
            data: image
        }
    }
    return response
})