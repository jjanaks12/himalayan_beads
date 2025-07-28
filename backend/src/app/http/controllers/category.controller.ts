import { FileHandler } from "@/lib/services/File.service"
import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"

const prisma = new PrismaClient()
export class CategoryController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.category.findMany({
                where: {
                    deletedAt: null,
                    parent_id: null
                },
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    predecessor: true
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const body: any = {
                name: request.body.name,
                slug: request.body.slug,
                description: request.body.description,
                parent_id: request.body.parent_id
            }

            if (request.body.image) {
                const fileUpload = new FileHandler('images')
                const image = await fileUpload.saveFile(request.body.image, request.body.image_id)
                body.image_id = image.id
            }

            response.send(await prisma.category.create({
                data: body
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const body: any = {}

            if (request.body.image) {
                const fileUpload = new FileHandler('images')
                const image = await fileUpload.saveFile(request.body.image, request.body.image_id)
                body.image_id = image.id
            }
            if (request.body.name)
                body.name = request.body.name
            if (request.body.description)
                body.description = request.body.description
            if (request.body.parent_id)
                body.parent_id = request.body.parent_id

            response.send(await prisma.category.update({
                where: {
                    id: request.body.id
                },
                data: body
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async delete(request: Request, response: Response, next: NextFunction) {
        try {

            response.send()
        } catch (error) {
            next(error)
        }
    }
}