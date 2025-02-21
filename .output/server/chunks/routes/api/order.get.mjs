import { d as defineEventHandler } from '../../runtime.mjs';
import { PrismaClient } from '@prisma/client';
import { a as authCheck } from '../../_/authCheck.mjs';
import { g as getServerSession } from '../../_/nuxtAuthHandler.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';
import 'next-auth/core';

const prisma = new PrismaClient();
const order_get = defineEventHandler({
  onRequest: [authCheck],
  handler: async (event) => {
    const { user } = await getServerSession(event);
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
    });
    return orders;
  }
});

export { order_get as default };
//# sourceMappingURL=order.get.mjs.map
