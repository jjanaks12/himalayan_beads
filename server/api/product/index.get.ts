import { PrismaClient, Product } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    let response: APIResponse<Product[] | string> = {
        status: 'success',
        data: []
    }

    await prisma.product.findMany({
        where: {
            deletedAt: null
        },
        include: {
            category: true,
            prices: true,
            images: {
                include: {
                    images: true
                }
            },
            stock: true
        }
    })
        .then((data: Product[]) => {
            response = {
                status: 'success',
                data
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