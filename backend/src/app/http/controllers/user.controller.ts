import { APIQuery } from "@/lib/type"
import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express-serve-static-core"

const prisma = new PrismaClient()
export class UserController {
    public static async index(request: Request<{}, {}, {}, APIQuery>, response: Response, next: NextFunction) {
        try {
            const { per_page = 10, current = 1, s = '', sort } = request.query
            const skip = (current - 1) * per_page

            const users = await prisma.user.findMany({
                skip,
                take: parseInt(per_page.toString()),
                omit: {
                    password: true
                },
                include: {
                    image: true,
                    role: true
                },
                where: {
                    deletedAt: null
                },
                orderBy: [{ createdAt: 'desc' }],
            })

            const total = await prisma.user.count()

            response.send({
                per_page: Number(per_page),
                current: Number(current),
                sort,
                total,
                total_page: Math.ceil(total / per_page),
                data: users
            })
        } catch (error) {
            next(error)
        }
    }

    public static async view(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.user.findFirst({
                where: {
                    id: request.params.id
                },
                include: {
                    role: true,
                    image: true
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}