import { APIQuery } from '@/lib/type'
import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import moment from 'moment'

const prisma = new PrismaClient()
export class OrderController {
    public static async index(request: Request<{}, {}, {}, APIQuery>, response: Response, next: NextFunction) {
        try {
            const { per_page = 10, current = 1, s = '', sort } = request.query
            const skip = (current - 1) * per_page

            response.send({
                per_page: Number(per_page),
                current: Number(current),
                sort,
                total: await prisma.order.count({
                    where: {
                        NOT: {
                            status: 'DELETED'
                        }
                    }
                }),
                data: await prisma.order.findMany({
                    where: {
                        NOT: {
                            status: 'DELETED'
                        }
                    },
                    skip,
                    take: parseInt(per_page.toString()),
                    orderBy: [{ createdAt: 'desc' }],
                    include: {
                        user: {
                            omit: {
                                password: true
                            },
                            include: {
                                image: true
                            }
                        },
                        products: true,
                        prices: {
                            where: {
                                deletedAt: null
                            }
                        },
                        billingAddress: {
                            include: {
                                country: true
                            }
                        },
                        shippingAddress: {
                            include: {
                                country: true
                            }
                        }
                    }
                })
            })
        } catch (error) {
            next(error)
        }
    }

    public static async updateStatus(request: Request, response: Response, next: NextFunction) {
        try {
            let data: any = {
                status: request.body.status,
                updatedAt: moment().toISOString()
            }

            if (request.body.status == 'COMPLETED')
                data.type = 'PAID'

            response.send(await prisma.order.update({
                where: {
                    id: request.params.id
                },
                data
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const orderId = request.params.id

            response.send(await prisma.order.update({
                where: {
                    id: orderId
                },
                data: {
                    status: 'DELETED'
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}