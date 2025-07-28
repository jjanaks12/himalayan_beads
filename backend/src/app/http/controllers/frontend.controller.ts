import { APIQuery } from "@/lib/type"
import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"

const prisma = new PrismaClient()
export class FrontendController {
    public static async products(request: Request<{}, {}, {}, APIQuery>, response: Response, next: NextFunction) {
        try {
            const { per_page = 10, current = 1, s = '', sort, filter } = request.query
            const skip = (current - 1) * per_page

            response.send({
                per_page: Number(per_page),
                current: Number(current),
                sort,
                total: await prisma.product.count(),
                data: await prisma.product.findMany({
                    skip,
                    take: parseInt(per_page.toString()),
                    where: {
                        deletedAt: null,
                        id: { contains: s },
                        category: {
                            id: filter['category']
                        },
                        name: { contains: s }
                    },
                    orderBy: [{ createdAt: 'desc' }],
                    include: {
                        category: true,
                        prices: {
                            where: {
                                deletedAt: null
                            }
                        },
                        images: {
                            include: {
                                image: true,
                                products: true
                            }
                        },
                        stock: true
                    }
                })
            })
        } catch (error) {
            next(error)
        }
    }
}