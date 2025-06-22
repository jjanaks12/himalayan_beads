import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors"
import moment from 'moment'

import { APIQuery } from "@/lib/type"
import { productSchema } from "@/app/lib/schema/product.schema"

const prisma = new PrismaClient()
export class ProductController {
    public static async index(request: Request<{}, {}, {}, APIQuery>, response: Response, next: NextFunction) {
        try {
            const { per_page = 10, current = 1, s = '', sort } = request.query
            const skip = (current - 1) * per_page

            response.send({
                per_page,
                current,
                sort,
                total: await prisma.product.count(),
                data: await prisma.product.findMany({
                    skip,
                    take: parseInt(per_page.toString()),
                    where: {
                        deletedAt: null,
                        id: { contains: s },
                        name: { contains: s }
                    },
                    orderBy: [{ createdAt: 'desc' }],
                    include: {
                        category: true,
                        prices: {
                            include: {
                                price: true
                            }
                        },
                        images: {
                            include: {
                                images: true
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

    public static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await productSchema.validate(request.body, { abortEarly: false })

            response.send(await prisma.product.create({
                data: {
                    name: validationData.name,
                    category_id: validationData.category_id
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.product_id
            if (!id)
                createHttpError.NotFound('Product not found')

            const product = await prisma.product.update({
                where: { id },
                data: {
                    name: request.body.name,
                    description: request.body.description,
                    category_id: request.body.category_id
                }
            })

            response.send(product)
        } catch (error) {
            next(error)
        }
    }

    public static async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.product_id
            if (!id)
                createHttpError.NotFound('Product not found')

            await prisma.product.update({
                where: { id },
                data: {
                    deletedAt: moment().toISOString()
                }
            })

            response.send('deleted')
        } catch (error) {
            next(error)
        }
    }
}