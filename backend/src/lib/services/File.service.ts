import { Image, PrismaClient } from "@prisma/client"
import path from 'node:path'
import fs from 'node:fs'
import createHttpError from "http-errors"

import { generateUUID } from "@/lib/plugins"
import { __basedir } from "@/index"
import moment from "moment"

type AvailableFolders = 'images' | 'vidoes' | 'gpx'

const prisma = new PrismaClient()
export class FileHandler {
    uploadPath = path.join(__basedir, '/uploads/')
    folderName: AvailableFolders = 'images'

    constructor(folderName: AvailableFolders) {
        if (folderName)
            this.uploadPath = path.join(this.uploadPath, folderName)
    }

    async saveFile(base64STR: any, image_id: string = undefined): Promise<Image> {
        let image: Image
        const match = base64STR.match(/^data:(.*?)base64,/)
        if (!match && !match[1])
            createHttpError.InternalServerError('Something went bad')

        const decodedBase64 = base64STR.split('base64,')[1]
        const buffer = Buffer.from(decodedBase64, 'base64')
        const type = base64STR.split(';')[0].split('/')[1];
        let fileName = generateUUID() + Date.now().toString() + '.' + type
        const filePath = path.join(this.uploadPath, fileName)

        if (!fs.existsSync(this.uploadPath)) {
            fs.mkdirSync(this.uploadPath)
        }
        fs.writeFile(filePath, buffer, (err: NodeJS.ErrnoException) => {
            if (err)
                createHttpError.InternalServerError(err.message)
        })

        if (image_id) {
            const previousImage = await prisma.image.findFirst({ where: { id: image_id } })
            const deleteFilePath = path.join(this.uploadPath, previousImage.name)

            if (fs.existsSync(deleteFilePath))
                fs.unlinkSync(deleteFilePath)

            image = await prisma.image.update({
                where: {
                    id: image_id
                },
                data: {
                    name: fileName,
                    type: this.folderName,
                    updatedAt: moment().toISOString()
                }
            })
        } else
            image = await prisma.image.create({
                data: {
                    name: fileName,
                    description: ''
                }
            })

        return image
    }

    async deleteFile(name: string): Promise<boolean> {
        const deleteFilePath = path.join(this.uploadPath, name)

        if (fs.existsSync(deleteFilePath))
            fs.unlinkSync(deleteFilePath)

        return Promise.resolve(true)
    }
}