import { userCheckoutSchema } from "@/app/lib/schema/user.schema"
import { APIQuery } from "@/lib/type"
import { PrismaClient, User } from "@prisma/client"
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
            response.send(await prisma.user.findFirstOrThrow({
                where: {
                    id: request.params.id
                },
                include: {
                    role: true,
                    image: true
                },
                omit: {
                    password: true
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async checkout(request: Request, response: Response, next: NextFunction) {
        try {
            const user: User = request.body.auth_user as User
            const validationData = await userCheckoutSchema.validate(request.body, { abortEarly: false })
            let shippingInfo = null
            const billingInfo = await prisma.address.create({
                data: {
                    address: validationData.billing_address.address,
                    street: validationData.billing_address.street,
                    state: validationData.billing_address.state,
                    city: validationData.billing_address.city,
                    zipCode: validationData.billing_address.zipCode,
                    countryId: validationData.billing_address.countryId,
                    type: 'BILLING',
                }
            })
            if (!validationData.same_as_billing)
                shippingInfo = await prisma.address.create({
                    data: {
                        address: validationData.shipping_address.address,
                        street: validationData.shipping_address.street,
                        state: validationData.shipping_address.state,
                        city: validationData.shipping_address.city,
                        zipCode: validationData.shipping_address.zipCode,
                        countryId: validationData.shipping_address.countryId,
                        type: 'SHIPPING',
                    }
                })

            const order = await prisma.order.create({
                data: {
                    userId: user.id,
                    billingAddressId: billingInfo.id,
                    shippingAddressId: validationData.same_as_billing ? billingInfo.id : shippingInfo.id,
                    type: validationData.payment.cash_on_delivery ? 'CASH_ON_DELIVERY' : 'ONLINE',
                    detail: validationData.cartItems,
                    status: 'NEW',
                    products: {
                        connect: validationData.cartItems.map(item => ({ id: item.product_id }))
                    },
                    prices: {
                        connect: validationData.cartItems.map(item => ({ id: item.price_id }))
                    }
                }
            })
            response.send(order)
        } catch (error) {
            next(error)
        }
    }

    public static async userOrder(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.order.findMany({
                where: {
                    userId: request.body.auth_user.id
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}