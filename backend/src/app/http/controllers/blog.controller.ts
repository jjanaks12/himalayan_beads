import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

import { APIQuery } from '@/lib/type'
import { blogCreateSchema, blogImageSchema } from '@/app/lib/schema/blog.schema'
import createHttpError from 'http-errors'
import moment from 'moment'
import { FileHandler } from '@/lib/services/File.service'
import { slugify } from '@/lib/plugins'

const prisma = new PrismaClient()
export class BlogController {
    public static async index(request: Request<{}, {}, {}, APIQuery>, response: Response, next: NextFunction) {
        try {
            const { per_page = 10, current = 1, s = '', sort, filter } = request.query
            const skip = (current - 1) * per_page
            let filters: any = {}

            if (filter.published == 'true')
                filters = {
                    NOT: {
                        publishedAt: null
                    }
                }

            response.send({
                per_page: Number(per_page),
                current: Number(current),
                sort,
                total: await prisma.blog.count({
                    where: {
                        deletedAt: null
                    }
                }),
                data: await prisma.blog.findMany({
                    where: {
                        deletedAt: null,
                        ...filters
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
                        category: true,
                        image: true,
                        tags: true
                    }
                })
            })
        } catch (error) {
            next(error)
        }
    }

    public static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await blogCreateSchema.validate(request.body, { abortEarly: false })

            response.send(await prisma.blog.create({
                data: {
                    title: validationData.title,
                    slug: validationData.slug,
                    excerpt: validationData.excerpt,
                    user_id: request.body?.auth_user?.id as string,
                    category_id: request.body.category_id
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {

            response.send(await prisma.blog.update({
                where: {
                    id: request.params.id
                },
                data: {
                    title: request.body.title,
                    slug: request.body.slug,
                    excerpt: request.body.excerpt,
                    user_id: request.body?.auth_user?.id as string,
                    category_id: request.body.category_id
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async destory(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id
            if (!id)
                createHttpError.NotFound('Blog not found')

            await prisma.blog.update({
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
            response.send(await prisma.blog.findFirst({
                where: {
                    id: request.params.id
                },
                include: {
                    user: {
                        include: {
                            image: true
                        }
                    },
                    category: true,
                    tags: true,
                    image: true
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async bySlug(request: Request, response: Response, next: NextFunction) {
        try {
            const slug = request.params.slug

            if (!slug)
                throw createHttpError.BadRequest('You need to send Slug')

            response.send(await prisma.blog.findFirst({
                where: {
                    slug
                },
                include: {
                    user: {
                        include: {
                            image: true
                        }
                    },
                    category: true,
                    tags: true,
                    image: true
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async publish(request: Request, response: Response, next: NextFunction) {
        try {
            const blogId = request.params.id

            if (!blogId)
                throw createHttpError.BadRequest('You need to send ID')

            response.send(await prisma.blog.update({
                where: { id: blogId },
                data: {
                    publishedAt: moment().toISOString()
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async updateDescription(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.blog.update({
                where: {
                    id: request.params.id
                },
                data: {
                    body: request.body.body
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async saveImage(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await blogImageSchema.validate(request.body, { abortEarly: false })

            const blog = await prisma.blog.findFirst({ where: { id: request.params.id } })
            const fileUpload = new FileHandler('images')

            const image = await fileUpload.saveFile(validationData.image, blog.image_id)
            await prisma.blog.update({
                where: {
                    id: request.params.id,
                },
                data: {
                    image_id: image.id
                }
            })

            response.send('blog')
        } catch (error) {
            next(error)
        }
    }

    public static async addTag(request: Request, response: Response, next: NextFunction) {
        try {
            const blogId = request.params.id

            if (!blogId)
                throw createHttpError.BadRequest('You need to send ID')

            console.log(request.body.tags);

            response.send(await prisma.blog.update({
                where: { id: request.params.id },
                data: {
                    tags: {
                        connectOrCreate: [{
                            where: { name: slugify(request.body.tag) },
                            create: { name: slugify(request.body.tag) }
                        }]
                    }
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}