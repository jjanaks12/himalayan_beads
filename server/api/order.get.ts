import { PrismaClient } from '@prisma/client'
import { type H3Event } from 'h3'
import { getServerSession } from '#auth'

import authCheck from '~/lib/middleware/authCheck'

const prisma = new PrismaClient()
export default defineEventHandler({
  onRequest: [authCheck],
  handler: async (event: H3Event) => {
    // @ts-expect-error
    const { user } = await getServerSession(event)

    const orders = await prisma.order.findMany({
      where: {
        userId: user.id
      },
      include: {
        shippingAddress: {
          include: {
            country: true
          }
        }
      }
    })
    return orders
  }
})
