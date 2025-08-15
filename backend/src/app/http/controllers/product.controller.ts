import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors"
import moment from 'moment'

import { APIQuery } from "@/lib/type"
import { productImageSchema, productPriceSchema, productSchema, productStockSchema } from "@/app/lib/schema/product.schema"
import { FileHandler } from "@/lib/services/File.service"

const prisma = new PrismaClient()
export class ProductController {
    public static async index(request: Request<{}, {}, {}, APIQuery>, response: Response, next: NextFunction) {
        try {
            const { per_page = 10, current = 1, s = '', sort } = request.query
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

    public static async view(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.product.findFirstOrThrow({
                where: {
                    id: request.params.id,
                    deletedAt: null
                },
                include: {
                    category: true,
                    prices: {
                        where: {
                            deletedAt: null
                        }
                    },
                    stock: true,
                    images: {
                        include: {
                            image: true
                        }
                    },
                    _count: {
                        select: {
                            orders: true
                        }
                    }
                },
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async updateDescription(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.product.update({
                where: {
                    id: request.params.product_id
                },
                data: {
                    description: request.body.description
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async saveImages(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await productImageSchema.validate(request.body, { abortEarly: false })

            for (const rawImage of validationData.images) {
                const fileUpload = new FileHandler('images')

                const image = await fileUpload.saveFile(rawImage)
                await prisma.imageOnProduct.create({
                    data: {
                        product_id: request.params.product_id,
                        image_id: image.id
                    }
                })
            }

            response.send('product')
        } catch (error) {
            next(error)
        }
    }

    public static async deleteImage(request: Request, response: Response, next: NextFunction) {
        try {
            await prisma.imageOnProduct.deleteMany({
                where: {
                    image_id: request.params.image_id
                }
            })
            const file = await prisma.image.delete({
                where: {
                    id: request.params.image_id
                }
            })

            const fileUpload = new FileHandler('images')
            await fileUpload.deleteFile(file.name)

            response.send('done')
        } catch (error) {
            next(error)
        }
    }

    public static async setFeaturedImage(request: Request, response: Response, next: NextFunction) {
        try {
            await prisma.imageOnProduct.updateMany({
                where: {
                    product_id: request.params.product_id,
                    featured: true
                },
                data: {
                    featured: false
                }
            })

            const updated = await prisma.imageOnProduct.update({
                where: {
                    id: request.params.image_id
                },
                data: {
                    featured: true
                }
            })
            response.send(updated)
        } catch (error) {
            next(error)
        }
    }

    public static async addStock(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await productStockSchema.validate(request.body, { abortEarly: false })

            response.send(await prisma.stock.create({
                data: {
                    product_id: request.params.product_id,
                    quantity: validationData.quantity
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async updateStock(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.stock.update({
                where: {
                    id: request.params.stock_id
                },
                data: {
                    quantity: parseInt(request.body.quantity)
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async addPrice(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await productPriceSchema.validate(request.body, { abortEarly: false })
            const price = await prisma.price.create({
                data: {
                    amount: validationData.amount
                }
            })
            response.send(await prisma.product.update({
                where: {
                    id: request.params.product_id
                },
                data: {
                    prices: {
                        connect: { id: price.id }
                    }
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async updatePrice(request: Request, response: Response, next: NextFunction) {
        try {
            const oldPrice = await prisma.price.update({
                where: {
                    id: request.params.price_id
                },
                data: {
                    updatedAt: moment().toISOString()
                }
            })
            const newPrice = await prisma.price.create({
                data: {
                    amount: parseFloat(request.body.amount),
                    parent_id: oldPrice.id
                }
            })
            response.send(await prisma.product.update({
                where: {
                    id: request.params.product_id
                },
                data: {
                    prices: {
                        connect: { id: newPrice.id }
                    }
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async deletePrice(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.price.update({
                where: {
                    id: request.params.price_id
                },
                data: {
                    deletedAt: moment().toISOString()
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}