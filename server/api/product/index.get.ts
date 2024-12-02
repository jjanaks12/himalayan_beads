import { PrismaClient, Product } from "@prisma/client"
import { type H3Event } from 'h3'

const prisma = new PrismaClient()
export default defineEventHandler(async (event: H3Event) => {
    let response: APIResponse<APIParam<any>> = {
        status: 'failed',
        message: ''
    }

    const { per_page = 10, current = 1, s = '', sort } = getQuery<APIQuery>(event)
    const skip = (current - 1) * per_page

    await prisma.product.findMany({
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
        .then(async (data: Product[]) => {
            const total = await prisma.product.count()
            response = {
                status: 'success',
                data: {
                    total,
                    total_page: Math.ceil(total / per_page),
                    current,
                    per_page,
                    data
                }
            }
        })
        .catch(() => {
            response = {
                status: 'failed',
                message: 'Something wrong with the database'
            }
        })

    return response
})