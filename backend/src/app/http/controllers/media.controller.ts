import { APIQuery } from '@/lib/type'
import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'

const prisma = new PrismaClient()
export class MediaController {
    public static async index(request: Request<{}, {}, {}, APIQuery>, response: Response, next: NextFunction) {
        try {
            const { per_page = 10, current = 1, s = '', sort } = request.query
            const skip = (current - 1) * per_page

            response.send({
                per_page: Number(per_page),
                current: Number(current),
                sort,
                total: await prisma.image.count(),
                data: await prisma.image.findMany({
                    skip,
                    take: parseInt(per_page.toString()),
                    where: {
                        id: { contains: s },
                        name: { contains: s }
                    },
                    orderBy: [{ createdAt: 'desc' }]
                })
            })
        } catch (error) {
            next(error)
        }
    }

    public static async delete(request: Request, response: Response, next: NextFunction) {
        try {
            response.send('ok')
        } catch (error) {
            next(error)
        }
    }
}