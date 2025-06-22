import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import moment from "moment"

import { FileHandler } from "@/lib/services/File.service"

const prisma = new PrismaClient()
export class PersonalController {
    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const body: any = {}

            if (request.body.image) {
                const fileUpload = new FileHandler('images')
                const image = await fileUpload.saveFile(request.body.image, request.body.image_id)
                body.image_id = image.id
            }
            if (request.body.first_name)
                body.first_name = request.body.first_name
            if (request.body.last_name)
                body.last_name = request.body.last_name
            if (request.body?.role_id)
                body.role_id = request.body.role_id

            await prisma.user.update({
                where: {
                    id: request.body.auth_user.id
                },
                data: {
                    ...body,
                    updatedAt: moment().toISOString()
                }
            })
            response.send()
        } catch (error) {
            next(error)
        }
    }
}