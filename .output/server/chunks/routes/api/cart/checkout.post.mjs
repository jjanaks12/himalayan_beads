import { d as defineEventHandler, r as readBody } from '../../../runtime.mjs';
import { PrismaClient } from '@prisma/client';
import { a as authCheck } from '../../../_/authCheck.mjs';
import { g as getServerSession } from '../../../_/nuxtAuthHandler.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';
import 'next-auth/core';

const prisma = new PrismaClient();
const checkout_post = defineEventHandler({
  onRequest: [authCheck],
  handler: async (event) => {
    const { user } = await getServerSession(event);
    const body = await readBody(event);
    const orderDetail = body.cart.map((cartItem) => ({
      product_id: cartItem.product.id,
      rate_id: cartItem.product.rate.id,
      quantity: cartItem.quantity
    }));
    const billingAddress = await prisma.address.create({
      data: {
        address: body.billing_address,
        city: body.billing_city,
        state: body.billing_state,
        street: body.billing_street,
        type: "BILLING",
        zipCode: body.billing_zipcode,
        countryId: body.billing_country
      }
    });
    const shippingAddress = await prisma.address.create({
      data: {
        address: body.shipping_address,
        city: body.shipping_city,
        state: body.shipping_state,
        street: body.shipping_street,
        type: "SHIPPING",
        zipCode: body.shipping_zipcode,
        countryId: body.shipping_country
      }
    });
    const order = await prisma.order.create({
      data: {
        status: "NEW",
        detail: orderDetail,
        type: "CASH_ON_DELIVERY",
        billingAddressId: billingAddress.id,
        shippingAddressId: shippingAddress.id,
        userId: user.id
      }
    });
    return order;
  }
});

export { checkout_post as default };
//# sourceMappingURL=checkout.post.mjs.map
