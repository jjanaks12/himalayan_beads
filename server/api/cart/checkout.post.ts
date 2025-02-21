import { PrismaClient } from '@prisma/client'
import { type H3Event } from 'h3'
import { getServerSession } from '#auth'

import authCheck from '~/lib/middleware/authCheck'
import { CartItem, ProductWithRate } from '~/himalayan_beads'

const prisma = new PrismaClient()
export default defineEventHandler({
  onRequest: [authCheck],
  handler: async (event: H3Event) => {
    // @ts-expect-error
    const { user } = await getServerSession(event)
    const body = await readBody(event)
    const orderDetail = body.cart.map((cartItem: CartItem<ProductWithRate>) => ({
      product_id: cartItem.product.id,
      rate_id: cartItem.product.rate.id,
      quantity: cartItem.quantity
    }))

    const billingAddress = await prisma.address.create({
      data: {
        address: body.billing_address,
        city: body.billing_city,
        state: body.billing_state,
        street: body.billing_street,
        type: 'BILLING',
        zipCode: body.billing_zipcode,
        countryId: body.billing_country
      }
    })

    const shippingAddress = await prisma.address.create({
      data: {
        address: body.shipping_address,
        city: body.shipping_city,
        state: body.shipping_state,
        street: body.shipping_street,
        type: 'SHIPPING',
        zipCode: body.shipping_zipcode,
        countryId: body.shipping_country
      }
    })

    const order = await prisma.order.create({
      data: {
        status: 'NEW',
        detail: orderDetail,
        type: 'CASH_ON_DELIVERY',
        billingAddressId: billingAddress.id,
        shippingAddressId: shippingAddress.id,
        userId: user.id,
      }
    })

    return order
  }
})
